# Firebase Authentication Setup Guide

## ✅ What's Been Completed

1. **Firebase SDK installed** - Added `firebase` package to your project
2. **Firebase configuration file created** - `src/lib/firebase.ts`
3. **Authentication context created** - `src/context/AuthContext.tsx` with:
   - Sign up with email/password
   - Login with email/password
   - Logout functionality
   - User profile updates
   - Auth state management with persistence
4. **Login page updated** - Connected to Firebase authentication
5. **Register page updated** - Integrated with Firebase signup
6. **Protected routes added** - Routes now check authentication status
7. **Header component updated** - Uses Firebase auth instead of local state

## 🔐 Next Steps: Configure Firebase Credentials

### Step 1: Get Your Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** (gear icon → Project Settings)
4. Under "Your apps" section, find your web app
5. Copy the Firebase config object

You'll see something like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### Step 2: Update `.env.local` File

Edit the `.env.local` file in your project root and replace the placeholder values:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### Step 3: Enable Email/Password Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** provider
3. Click **Save**

### Step 4: (Optional) Add Google Sign-In

For the "Sign in with Google" button functionality:

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Google** provider
3. Select a support email for your app
4. Click **Save**

Then update your Login/Register pages to use:
```typescript
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const googleProvider = new GoogleAuthProvider();
const result = await signInWithPopup(auth, googleProvider);
```

## 🎯 Key Features Now Available

### Authentication Hooks
```typescript
import { useAuth } from '@/context/AuthContext';

const { currentUser, signup, login, logout, error, loading } = useAuth();
```

### Protected Routes
- `/login` - Only accessible when NOT logged in
- `/register` - Only accessible when NOT logged in
- `/profile` - Requires authentication
- `/admin` - Requires authentication
- `/favorites` - Requires authentication
- `/notifications` - Requires authentication

### User Object
```typescript
interface User {
  uid: string;           // Firebase UID
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role?: 'user' | 'admin';
}
```

## 📝 Usage Examples

### In Components
```typescript
import { useAuth } from '@/context/AuthContext';

const MyComponent = () => {
  const { currentUser, logout } = useAuth();
  
  return (
    <div>
      <p>Welcome, {currentUser?.displayName}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

### Sign Up
```typescript
const { signup } = useAuth();

try {
  await signup(email, password, displayName);
  // User created and logged in
} catch (error) {
  console.error(error.message);
}
```

### Sign In
```typescript
const { login } = useAuth();

try {
  await login(email, password);
  // User logged in
} catch (error) {
  console.error(error.message);
}
```

## ⚠️ Security Notes

1. **Never commit `.env.local`** - Add to `.gitignore` if not already there
2. **Firestore Security Rules** - Set up proper rules in Firebase Console for your data
3. **User roles** - Currently set to 'user' by default. Implement custom claims for admin roles:
   - Use Firebase Cloud Functions to set custom claims
   - Read claims from `auth.currentUser.getIdTokenResult()`

## 🐛 Troubleshooting

### "Firebase app not initialized"
- Make sure you've filled in `.env.local` with correct values
- Restart your dev server after updating `.env.local`

### Login/Register not working
- Check Firebase Console → Authentication → Sign-in method
- Verify Email/Password is enabled
- Check browser console for error messages

### Users not persisting after refresh
- Firebase should persist automatically (configured in `firebase.ts`)
- Check if localStorage is enabled in your browser

## 🔄 Next Features to Consider

1. **Email verification** - Add email verification on signup
2. **Password reset** - Add forgot password functionality
3. **Admin dashboard** - Create admin role management
4. **User profiles** - Store additional user data in Firestore
5. **Social login** - Add Google/GitHub/Facebook login

## 📚 Resources

- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [React + Firebase Guide](https://firebase.google.com/docs/auth/web)
- [Firebase Security Best Practices](https://firebase.google.com/docs/rules)
