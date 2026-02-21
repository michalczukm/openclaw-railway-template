const express = require('express');
const app = express();
const basicAuth = require('express-basic-auth');

// Middleware for UI Password Auth
function requireUIAuth(req, res, next) {
    const password = process.env.UI_PASSWORD;
    if (!password) {
        return res.status(500).send('UI_PASSWORD environment variable is not set.');
    }

    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(401).set('WWW-Authenticate', 'Basic').send('Authentication required.');
    }

    const base64Credentials = auth.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, passwordProvided] = credentials.split(':');

    if (username === 'admin' && passwordProvided === password) {
        return next();
    }

    return res.status(401).set('WWW-Authenticate', 'Basic').send('Unauthorized.');
}

// Protect /openclaw route with UI Password Auth
app.use('/openclaw', requireUIAuth);

// Existing routes and other middleware...

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
