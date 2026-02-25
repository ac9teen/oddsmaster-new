const token = '123';
const provider = 'github';
const html = `
            <!DOCTYPE html>
            <html>
            <body>
                <script>
                    const message = 'authorization:${provider}:success:${JSON.stringify({ token: token, provider: provider })}';
                    window.opener.postMessage(message, window.location.origin);
                    window.close();
                </script>
            </body>
            </html>
        `;
console.log(html);
