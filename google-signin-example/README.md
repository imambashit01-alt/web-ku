# Sign in with Google Example

This is a complete, copy-pasteable example implementing "Sign in with Google" using Google Identity Services.

## Files

- `index.html`: Static frontend with Google Sign-in button and One-Tap prompt.
- `server.js`: Node.js Express backend that verifies Google ID tokens.

## Setup

1. **Google Cloud Console Setup**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/).
   - Create or select a project.
   - Enable the Google Identity API.
   - Create OAuth 2.0 credentials (Web application type).
   - Add `http://localhost:3000` to Authorized JavaScript origins.
   - The client ID is already set in the code: `231323965497-be3oicog6388ghobtl758odck8h1jlu5.apps.googleusercontent.com`.

2. **Run the Backend**:
   ```bash
   cd google-signin-example
   npm init -y
   npm install express body-parser google-auth-library
   node server.js
   ```

3. **Access the App**:
   - Open `http://localhost:3000` in your browser.
   - Click the "Sign in with Google" button or use One-Tap.

## Security Notes

- Never put `client_secret` in the frontend.
- Always POST ID tokens to the backend over HTTPS.
- Verify tokens server-side and create a server-side session.
- In production, use HTTPS, proper session management, and set cookie flags (Secure, HttpOnly, SameSite).

## References

- [Google Identity Services JS Reference](https://developers.google.com/identity/gsi/web/reference/js-reference)
- [Verifying Google ID Tokens](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token)
- [Backend Auth Guidance](https://developers.google.com/identity/sign-in/web/backend-auth)
