export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    console.log('Incoming body from frontend:', req.body);

    try {
        const response = await fetch('http://localhost:3000/api/auth/client-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        console.log('Status from external API:', response.status);

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
