import { NextResponse } from 'next/server';

const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_KEY;
const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID;
const KLAVIYO_BASE = 'https://a.klaviyo.com/api';
const KLAVIYO_REVISION = '2024-10-15';

export async function POST(request: Request) {
    if (!KLAVIYO_API_KEY || !KLAVIYO_LIST_ID) {
        console.error('Missing Klaviyo environment variables');
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    try {
        const { email, firstName, bettingExperience } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const headers = {
            'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
            'Content-Type': 'application/json',
            'revision': KLAVIYO_REVISION,
        };

        // Step 1: Subscribe to list using the confirmed working format
        const subscribeRes = await fetch(`${KLAVIYO_BASE}/profile-subscription-bulk-create-jobs/`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                data: {
                    type: 'profile-subscription-bulk-create-job',
                    attributes: {
                        profiles: {
                            data: [{
                                type: 'profile',
                                attributes: {
                                    email,
                                    first_name: firstName || '',
                                    properties: {
                                        betting_experience: bettingExperience || 'unknown',
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

        // 202 Accepted = success (async job queued), 200 = also ok
        if (!subscribeRes.ok && subscribeRes.status !== 202) {
            const errBody = await subscribeRes.text();
            console.error('Klaviyo subscribe error:', subscribeRes.status, errBody);
            return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (err) {
        console.error('Klaviyo subscribe unhandled error:', err);
        return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
    }
}
