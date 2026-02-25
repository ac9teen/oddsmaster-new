import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const code = new URL(request.url).searchParams.get('code');
    const clientId = process.env.GITHUB_ID?.trim();
    const clientSecret = process.env.GITHUB_SECRET?.trim();

    if (!code || !clientId || !clientSecret) {
        return NextResponse.json({ error: 'Missing code or environment variables' }, { status: 400 });
    }

    try {
        const response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code: code
            })
        });

        const data = await response.json();

        if (data.error) {
            return NextResponse.json({ error: data.error_description }, { status: 400 });
        }

        const token = data.access_token;
        const provider = 'github';

        const html = `
            <!DOCTYPE html>
            <html>
            <body>
                <script>
                    (function() {
                        function receiveMessage(e) {
                            if (e.data !== "authorizing:${provider}") return; // Wait for CMS to reply
                            window.opener.postMessage(
                                'authorization:${provider}:success:{"token":"${token}","provider":"${provider}"}',
                                e.origin
                            );
                            window.removeEventListener("message", receiveMessage);
                            window.close();
                        }
                        
                        // Listen for origin confirmation from the CMS window
                        window.addEventListener("message", receiveMessage, false);
                        
                        // Step 1: Tell the CMS we are ready and authorizing
                        window.opener.postMessage("authorizing:${provider}", "*");
                        
                        // Step 2 (Fallback): In case the CMS doesn't reply for some reason, just send the token
                        setTimeout(function() {
                            window.opener.postMessage(
                                'authorization:${provider}:success:{"token":"${token}","provider":"${provider}"}',
                                "*"
                            );
                            window.close();
                        }, 1500);
                    })();
                </script>
            </body>
            </html>
        `;

        return new NextResponse(html, {
            headers: { 'Content-Type': 'text/html' }
        });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
