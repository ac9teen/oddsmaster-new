import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const clientId = process.env.GITHUB_ID?.trim();

    if (!clientId) {
        return NextResponse.json({ error: 'GITHUB_ID environment variable not set' }, { status: 500 });
    }

    const redirectUri = new URL('/api/callback', request.url).toString();
    const state = Math.random().toString(36).substring(7);

    // Redirect to GitHub OAuth
    const params = new URLSearchParams({
        client_id: clientId,
        scope: 'repo user', // repo access needed for CMS
        redirect_uri: redirectUri,
        state: state
    });

    return NextResponse.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
}
