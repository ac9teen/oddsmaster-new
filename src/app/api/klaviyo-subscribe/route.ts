import { NextResponse } from 'next/server';

const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_KEY;
const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID;
const KLAVIYO_BASE = 'https://a.klaviyo.com/api';
const KLAVIYO_REVISION = '2024-10-15';

export async function POST(request: Request) {
    console.log('[klaviyo] KLAVIYO_LIST_ID:', KLAVIYO_LIST_ID);
    console.log('[klaviyo] KLAVIYO_PRIVATE_KEY set:', !!KLAVIYO_API_KEY);

    if (!KLAVIYO_API_KEY || !KLAVIYO_LIST_ID) {
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    let email = '', firstName = '', bettingExperience = '';
    try {
        const body = await request.json();
        email = body.email;
        firstName = body.firstName || '';
        bettingExperience = body.bettingExperience || 'unknown';
    } catch {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    console.log('[klaviyo] Subscribing:', email, 'to list:', KLAVIYO_LIST_ID);

    const headers: HeadersInit = {
        'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        'Content-Type': 'application/json',
        'revision': KLAVIYO_REVISION,
    };

    const payload = {
        data: {
            type: 'profile-subscription-bulk-create-job',
            attributes: {
                profiles: {
                    data: [{
                        type: 'profile',
                        attributes: {
                            email,
                            subscriptions: {
                                email: { marketing: { consent: 'SUBSCRIBED' } }
                            }
                        }
                    }]
                }
            },
            relationships: {
                list: { data: { type: 'list', id: KLAVIYO_LIST_ID } }
            }
        }
    };

    console.log('[klaviyo] Payload:', JSON.stringify(payload));

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);

        const subscribeRes = await fetch(
            `${KLAVIYO_BASE}/profile-subscription-bulk-create-jobs/`,
            {
                method: 'POST',
                signal: controller.signal,
                headers,
                body: JSON.stringify(payload),
            }
        );
        clearTimeout(timeout);

        console.log('[klaviyo] Response status:', subscribeRes.status);
        const responseText = await subscribeRes.text().catch(() => '');
        console.log('[klaviyo] Response body:', responseText);

        if (subscribeRes.status === 202 || subscribeRes.status === 200) {
            // Step 2: Upsert the profile separately to add name/properties
            if (firstName || bettingExperience !== 'unknown') {
                try {
                    const profileController = new AbortController();
                    const profileTimeout = setTimeout(() => profileController.abort(), 5000);
                    const profileRes = await fetch(`${KLAVIYO_BASE}/profiles/`, {
                        method: 'POST',
                        signal: profileController.signal,
                        headers,
                        body: JSON.stringify({
                            data: {
                                type: 'profile',
                                attributes: {
                                    email,
                                    first_name: firstName,
                                    properties: { betting_experience: bettingExperience }
                                }
                            }
                        })
                    });
                    clearTimeout(profileTimeout);
                    console.log('[klaviyo] Profile upsert status:', profileRes.status);
                } catch (pErr) {
                    console.warn('[klaviyo] Profile upsert error (non-fatal):', pErr);
                }
            }
            return NextResponse.json({ success: true }, { status: 200 });
        }

        return NextResponse.json({ error: 'Failed to subscribe', detail: responseText.slice(0, 200) }, { status: 500 });

    } catch (err: unknown) {
        const isTimeout = err instanceof Error && err.name === 'AbortError';
        console.error('[klaviyo] Fetch error:', isTimeout ? 'AbortError/Timeout' : String(err));
        return NextResponse.json(
            { error: isTimeout ? 'Request timed out' : 'Unexpected error', detail: String(err) },
            { status: 500 }
        );
    }
}
