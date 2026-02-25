import { NextResponse } from 'next/server';

const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_KEY;
const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID;
const KLAVIYO_BASE = 'https://a.klaviyo.com/api';
const KLAVIYO_REVISION = '2024-02-15';

export async function POST(request: Request) {
    if (!KLAVIYO_API_KEY || !KLAVIYO_LIST_ID) {
        console.error('Missing Klaviyo environment variables');
        return NextResponse.json(
            { error: 'Server configuration error' },
            { status: 500 }
        );
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

        // Step 1: Subscribe profile to the list (Klaviyo v3)
        // This upserts the profile and adds them to the list in one call
        const subscribeRes = await fetch(`${KLAVIYO_BASE}/profile-subscription-bulk-create-jobs/`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                data: {
                    type: 'profile-subscription-bulk-create-job',
                    attributes: {
                        list_id: KLAVIYO_LIST_ID,
                        subscriptions: [
                            {
                                channels: {
                                    email: ['MARKETING'],
                                },
                                email,
                                profile_id: null,
                            }
                        ],
                        custom_source: 'OddsMaster Newsletter Form',
                    },
                    relationships: {
                        list: {
                            data: {
                                type: 'list',
                                id: KLAVIYO_LIST_ID,
                            }
                        }
                    }
                }
            })
        });

        // 202 = accepted (async job), 200 = ok — both mean success
        if (!subscribeRes.ok && subscribeRes.status !== 202) {
            const errBody = await subscribeRes.text();
            console.error('Klaviyo bulk subscribe error:', subscribeRes.status, errBody);
            return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
        }

        // Step 2: Upsert profile with name + betting experience tag
        if (firstName || bettingExperience) {
            const profileRes = await fetch(`${KLAVIYO_BASE}/profiles/`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    data: {
                        type: 'profile',
                        attributes: {
                            email,
                            first_name: firstName || '',
                            properties: {
                                betting_experience: bettingExperience || 'unknown',
                                source: 'OddsMaster Newsletter Form',
                            },
                        }
                    }
                })
            });

            // 409 = profile already exists (that's fine, we just need the ID for tagging)
            const profileData = profileRes.status !== 409
                ? await profileRes.json().catch(() => null)
                : null;

            // If we have a profile ID and a betting_experience, apply the matching tag
            if (bettingExperience && profileData?.data?.id) {
                const tag = bettingExperience === 'experienced' ? 'Experienced Bettor' : 'New Bettor';
                await fetch(`${KLAVIYO_BASE}/profile-tags/`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        data: {
                            type: 'profile-tag',
                            attributes: { name: tag },
                            relationships: {
                                profile: {
                                    data: { type: 'profile', id: profileData.data.id }
                                }
                            }
                        }
                    })
                }).catch(() => { /* tagging failure is non-critical */ });
            }
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (err) {
        console.error('Klaviyo subscribe unhandled error:', err);
        return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
    }
}
