import { NextResponse } from 'next/server';

const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_KEY;
const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID;
const KLAVIYO_BASE = 'https://a.klaviyo.com/api';
const KLAVIYO_REVISION = '2024-10-15';

export async function POST(request: Request) {
    if (!KLAVIYO_API_KEY || !KLAVIYO_LIST_ID) {
        console.error('Missing Klaviyo environment variables:', {
            hasKey: !!KLAVIYO_API_KEY,
            hasListId: !!KLAVIYO_LIST_ID
        });
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

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

    try {
        const subscribeRes = await fetch(`${KLAVIYO_BASE}/profile-subscription-bulk-create-jobs/`, {
            method: 'POST',
            signal: controller.signal,
            headers: {
                'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
                'Content-Type': 'application/json',
                'revision': KLAVIYO_REVISION,
            },
            body: JSON.stringify({
                data: {
                    type: 'profile-subscription-bulk-create-job',
                    attributes: {
                        profiles: {
                            data: [{
                                type: 'profile',
                                attributes: {
                                    email,
                                    first_name: firstName,
                                    properties: {
                                        betting_experience: bettingExperience,
                                        source: 'OddsMaster Newsletter Form',
                                    },
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
            })
        });

        clearTimeout(timeout);

        // 202 Accepted = async job queued (success), 200 = ok
        if (subscribeRes.status === 202 || subscribeRes.status === 200) {
            return NextResponse.json({ success: true }, { status: 200 });
        }

        const errBody = await subscribeRes.text().catch(() => 'No body');
        console.error('Klaviyo error:', subscribeRes.status, errBody);
        return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });

    } catch (err: unknown) {
        clearTimeout(timeout);
        const isTimeout = err instanceof Error && err.name === 'AbortError';
        console.error('Klaviyo fetch error:', isTimeout ? 'Timed out' : err);
        return NextResponse.json(
            { error: isTimeout ? 'Request timed out' : 'Unexpected error' },
            { status: 500 }
        );
    }
}
