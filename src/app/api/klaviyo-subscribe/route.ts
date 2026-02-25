import { NextResponse } from 'next/server';

const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_KEY;
const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID;
const KLAVIYO_BASE = 'https://a.klaviyo.com/api';
const KLAVIYO_REVISION = '2024-10-15';

async function klaviyoFetch(url: string, body: object): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
        const res = await fetch(url, {
            method: 'POST',
            signal: controller.signal,
            headers: {
                'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
                'Content-Type': 'application/json',
                'revision': KLAVIYO_REVISION,
            },
            body: JSON.stringify(body),
        });
        clearTimeout(timeout);
        return res;
    } catch (e) {
        clearTimeout(timeout);
        throw e;
    }
}

export async function POST(request: Request) {
    if (!KLAVIYO_API_KEY || !KLAVIYO_LIST_ID) {
        console.error('Missing Klaviyo env vars');
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

    try {
        // Step 1: Subscribe email to the list 
        // The bulk-subscribe job only accepts email + subscriptions — no name/properties
        const subscribeRes = await klaviyoFetch(
            `${KLAVIYO_BASE}/profile-subscription-bulk-create-jobs/`,
            {
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
            }
        );

        if (subscribeRes.status !== 202 && subscribeRes.status !== 200) {
            const errBody = await subscribeRes.text().catch(() => 'No body');
            console.error('Klaviyo subscribe error:', subscribeRes.status, errBody);
            return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
        }

        // Step 2: Upsert profile with name + betting_experience property (separate call)
        if (firstName || bettingExperience) {
            const profileRes = await klaviyoFetch(`${KLAVIYO_BASE}/profiles/`, {
                data: {
                    type: 'profile',
                    attributes: {
                        email,
                        first_name: firstName,
                        properties: {
                            betting_experience: bettingExperience,
                        }
                    }
                }
            });
            // 409 = already exists, that's fine — Klaviyo will still merge properties
            if (!profileRes.ok && profileRes.status !== 409) {
                console.warn('Profile upsert warning:', profileRes.status);
            }
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (err: unknown) {
        const isTimeout = err instanceof Error && err.name === 'AbortError';
        console.error('Klaviyo error:', isTimeout ? 'Timed out' : err);
        return NextResponse.json(
            { error: isTimeout ? 'Request timed out' : 'Unexpected error' },
            { status: 500 }
        );
    }
}
