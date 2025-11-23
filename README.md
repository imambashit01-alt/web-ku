# MAMZ React E-commerce with Firebase Authentication

A modern, production-ready React e-commerce application built with Vite, featuring a complete Firebase Authentication system with multiple sign-in methods.

## 🚀 Features

- **Complete Firebase Authentication System**
  - Email/Password authentication
  - Google OAuth sign-in
  - GitHub OAuth sign-in
  - Phone number authentication with SMS verification
  - Password reset functionality
  - User profile management with Firestore

- **Modern UI/UX**
  - Clean, Google-inspired login design
  - Mobile-responsive interface
  - Dark/Light theme support
  - Smooth animations with Framer Motion
  - Tailwind CSS styling

- **E-commerce Features**
  - Product catalog with categories
  - Shopping cart functionality
  - Product filtering and search
  - Responsive product cards

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Authentication**: Firebase Auth v9
- **Database**: Firestore
- **Routing**: React Router v6
- **Icons**: React Icons
- **Phone Input**: react-phone-input-2
- **Animations**: Framer Motion

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mamz-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Configuration**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing one
   - Enable Authentication and Firestore services
   - Copy your Firebase config to `src/firebase.js` (already configured)

4. **Firebase Console Setup**

   ### Authentication Settings
   - Go to **Authentication** → **Sign-in method**
   - Enable the following providers:
     - **Email/Password**: Enable
     - **Google**: Enable, paste your OAuth client ID
     - **GitHub**: Enable, create OAuth App and paste Client ID/Secret
     - **Phone**: Enable for SMS authentication

   ### Authorized Domains
   - Add your production domain (e.g., `mamz.vercel.app`)
   - Add `localhost` and `127.0.0.1` for local development

   ### Google OAuth Setup
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create/select project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs in Firebase Console

   ### GitHub OAuth Setup
   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Create new OAuth App
   - Set Authorization callback URL to your Firebase domain
   - Copy Client ID and Client Secret to Firebase Console

   ### Phone Authentication Setup
   - In Firebase Console → Authentication → Sign-in method → Phone
   - Configure reCAPTCHA (invisible)
   - Add authorized domains

5. **Environment Variables** (Optional)
   ```bash
   # If you want to use environment variables instead of hardcoded config
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   # ... etc
   ```

## 🚀 Running the Application

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## 📱 Authentication Flow

### Available Routes
- `/login` - Sign in page with multiple options
- `/register` - Registration with profile data collection
- `/forgot-password` - Password reset
- `/dashboard` - Protected user dashboard

### User Registration Process
1. User fills registration form with:
   - Full name
   - Email and password
   - Date of birth (age validation)
   - Phone number (with country selection)
2. Data is stored in Firebase Auth and Firestore
3. Automatic redirect to dashboard

### Authentication Methods
- **Email/Password**: Standard authentication
- **Google**: OAuth popup flow
- **GitHub**: OAuth popup flow
- **Phone**: SMS verification with reCAPTCHA

## 🏗 Project Structure

```
src/
├── components/
│   ├── PhoneInput.jsx          # Phone input with country flags
│   ├── ProtectedRoute.jsx      # Route protection component
│   └── ...                     # Other UI components
├── contexts/
│   └── AuthContext.jsx         # Authentication context & functions
├── pages/
│   ├── Login.jsx              # Login page
│   ├── Register.jsx           # Registration page
│   ├── ForgotPassword.jsx     # Password reset page
│   ├── Dashboard.jsx          # User dashboard
│   └── ...                    # Other pages
├── firebase.js                # Firebase configuration
├── App.jsx                    # Main app with routing
└── main.jsx                   # App entry point
```

## 🔧 Firebase Configuration Details

### Required Firebase Services
- **Authentication**: All sign-in methods enabled
- **Firestore**: User profile data storage
- **Hosting**: For production deployment (optional)

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🎨 UI Customization

### Themes
- Light/Dark mode toggle available in navbar
- Custom MAMZ color scheme
- Responsive design for all screen sizes

### Styling
- Tailwind CSS for utility classes
- Custom CSS variables for theming
- Component-based styling approach

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Configuration Error**
   - Verify your Firebase config in `src/firebase.js`
   - Check if all required APIs are enabled in Firebase Console

2. **Phone Authentication Not Working**
   - Ensure reCAPTCHA is properly configured
   - Check authorized domains in Firebase Console
   - Verify phone number format

3. **OAuth Redirect Issues**
   - Add all domains to authorized domains in Firebase Console
   - Check OAuth app settings in Google/GitHub consoles

4. **Build Errors**
   - Ensure all dependencies are installed: `npm install`
   - Check Node.js version compatibility

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Note**: This application includes reCAPTCHA for phone authentication. Make sure to configure it properly in your Firebase Console for production use.
