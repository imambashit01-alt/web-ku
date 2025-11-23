# Authentication System Migration: Firebase → Custom Backend

## Backend Implementation
- [ ] Update backend/package.json with auth dependencies
- [ ] Create backend/models/User.js (MongoDB schema)
- [ ] Create backend/middleware/auth.js (JWT middleware)
- [ ] Create backend/routes/auth.js (auth endpoints)
- [ ] Update backend/server.js (add auth routes, middleware, MongoDB connection)
- [ ] Create backend/controllers/authController.js (auth logic)

## Frontend Implementation
- [ ] Update src/utils/auth.js (token management)
- [ ] Rewrite src/contexts/AuthContext.jsx (API-based auth)
- [ ] Enhance src/store/useLoginPopupStore.js (additional states)
- [ ] Update src/components/LoginPopup.jsx (dual auth flow)
- [ ] Update src/firebase.js (remove or keep for reference)

## Testing & Configuration
- [ ] Set up environment variables (.env files)
- [ ] Test manual login flow
- [ ] Test Google OAuth + internal password flow
- [ ] Update frontend environment variables
- [ ] Test complete authentication system
