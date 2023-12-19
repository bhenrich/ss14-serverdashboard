
const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 5033;

// Your SSL Certs here
const credentials = {
    key: fs.readFileSync('/etc/letsencrypt/live/yuniiworks.de/privkey.pem', 'utf8'),
    cert: fs.readFileSync('/etc/letsencrypt/live/yuniiworks.de/cert.pem', 'utf8'),
    ca: fs.readFileSync('/etc/letsencrypt/live/yuniiworks.de/chain.pem', 'utf8'),
};

// allow all and any cors requests
app.use(cors());

app.get('/servers', async (req, res) => {
    console.log('Requesting servers');

    const serverUrls = [
        'https://leviathan.spacestation14.com/server/status',
        'https://lizard.spacestation14.io/server/status',
        'https://lizard.spacestation14.io/salamander/status'
    ];

    try {
        const responses = await Promise.all(serverUrls.map(url => fetch(url)));

        const data = await Promise.all(responses.map(response => {
            if (response.ok) {
                return response.json(); // Only call .json() if the response is ok
            } else {
                throw new Error(`Error fetching ${response.url}: ${response.statusText}`);
            }
        }));

        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(port, () => {
    console.log(`Server running on https://yuniiworks.de:${port}`);
});
