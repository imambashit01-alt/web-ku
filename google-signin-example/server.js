/*
Node.js + Express backend that verifies Google ID token using google-auth-library.
Run:
  npm init -y
  npm install express body-parser google-auth-library
  node server.js
*/
const express = require('express');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = '231323965497-be3oicog6388ghobtl758odck8h1jlu5.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const app = express();
app.use(bodyParser.json());

// Serve the static frontend
app.use(express.static('.'));

app.post('/verify-token', async (req, res) => {
  const idToken = req.body && req.body.id_token;
  if (!idToken) return res.status(400).json({ error: 'Missing id_token' });

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    // payload contains: sub, email, email_verified, name, picture, given_name, family_name, locale
    // Create or fetch a server-side session here for the user.
    return res.json({
      sub: payload.sub,
      email: payload.email,
      email_verified: payload.email_verified,
      name: payload.name,
      picture: payload.picture
    });
  } catch (err) {
    console.error('Token verification error', err);
    return res.status(401).json({ error: 'Invalid ID token' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
