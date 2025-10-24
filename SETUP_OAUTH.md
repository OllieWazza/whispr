# OAuth Setup Guide for WHISPR

This guide will help you configure Google and Apple OAuth authentication for your Supabase project.

## Prerequisites

- Supabase project: `ptrpavczxoutgxxyqcew`
- Access to Supabase Dashboard
- Google Cloud Console account (for Google OAuth)
- Apple Developer account (for Apple OAuth)

---

## 1. Google OAuth Setup

### Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Select **Web application**
6. Configure:
   - **Name**: WHISPR Production
   - **Authorized JavaScript origins**:
     - `http://localhost:5173` (for development)
     - Your production domain
   - **Authorized redirect URIs**:
     - `https://ptrpavczxoutgxxyqcew.supabase.co/auth/v1/callback`
     - `http://localhost:5173/auth/callback` (for development)
7. Click **Create** and copy your **Client ID** and **Client Secret**

### Step 2: Configure in Supabase

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard/project/ptrpavczxoutgxxyqcew)
2. Navigate to **Authentication** > **Providers**
3. Find **Google** and enable it
4. Paste your **Client ID** and **Client Secret** from Google
5. Click **Save**

---

## 2. Apple OAuth Setup

### Step 1: Create Apple Service ID

1. Go to [Apple Developer](https://developer.apple.com/account/)
2. Navigate to **Certificates, Identifiers & Profiles**
3. Click **Identifiers** > **+** (Create new)
4. Select **Services IDs** and click **Continue**
5. Configure:
   - **Description**: WHISPR Authentication
   - **Identifier**: `com.whispr.auth` (or your bundle ID)
6. Click **Continue** then **Register**

### Step 2: Configure Sign in with Apple

1. Click on your newly created Service ID
2. Enable **Sign in with Apple**
3. Click **Configure** next to it
4. Set:
   - **Primary App ID**: Select your app's bundle identifier
   - **Domains and Subdomains**: 
     - `ptrpavczxoutgxxyqcew.supabase.co`
   - **Return URLs**:
     - `https://ptrpavczxoutgxxyqcew.supabase.co/auth/v1/callback`
5. Click **Save** then **Continue** then **Register**

### Step 3: Create Private Key

1. In **Certificates, Identifiers & Profiles**, click **Keys**
2. Click **+** to create a new key
3. Give it a name (e.g., "WHISPR Auth Key")
4. Enable **Sign in with Apple**
5. Click **Configure** and select your Primary App ID
6. Click **Save** then **Continue**
7. Click **Register** and download your `.p8` file
8. **IMPORTANT**: Save the **Key ID** shown on the download page

### Step 4: Configure in Supabase

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard/project/ptrpavczxoutgxxyqcew)
2. Navigate to **Authentication** > **Providers**
3. Find **Apple** and enable it
4. Configure:
   - **Services ID**: Your Service ID (e.g., `com.whispr.auth`)
   - **Team ID**: Your Apple Team ID (found in Apple Developer membership)
   - **Key ID**: The Key ID from Step 3
   - **Private Key**: Paste the contents of your `.p8` file
5. Click **Save**

---

## 3. Handling OAuth Callbacks

### Create Auth Callback Page

The OAuth providers will redirect users back to your app. We need to handle this:

1. The `AuthContext` is already configured to handle callbacks
2. Users will be automatically signed in after OAuth redirect
3. They'll be redirected to the appropriate dashboard based on their `user_type`

### Important Notes

- **First-time OAuth users**: When a user signs in with Google/Apple for the first time, they won't have a profile yet. You'll need to prompt them to choose their account type (buyer or creator) and create their profile.
- **Profile completion flow**: Consider adding a profile setup page that OAuth users are redirected to if they don't have a `user_type` set yet.

---

## 4. Testing OAuth

### Test Google OAuth:
1. Start your development server: `npm run dev`
2. Go to `/signup/buyer` or `/signup/creator`
3. Click **Continue with Google**
4. Complete the Google sign-in flow
5. You should be redirected back and signed in

### Test Apple OAuth:
1. Same process as Google, but click **Continue with Apple**
2. Note: Apple OAuth requires HTTPS in production

---

## 5. Environment Variables

Make sure you have these in your `.env.local` file:

```env
VITE_SUPABASE_URL=https://ptrpavczxoutgxxyqcew.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0cnBhdmN6eG91dGd4eHlxY2V3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExMjYwNTAsImV4cCI6MjA3NjcwMjA1MH0.oWm0OUkDZfj1EptU_91HwyeeruYXBtkfzK1x9MNUe3E
```

Copy from `.env.example` if needed:
```bash
cp .env.example .env.local
```

---

## 6. OAuth User Profile Creation

### Handling OAuth Sign-ups

Since OAuth users need to choose their account type, you may want to add a profile setup flow:

1. After OAuth callback, check if user has a profile
2. If not, redirect to a profile setup page
3. Ask them: "Are you a buyer or creator?"
4. Create their profile with the selected `user_type`

This is already partially handled in the `AuthContext`, but you may want to create a dedicated profile setup page for a better user experience.

---

## Troubleshooting

### Google OAuth Issues:
- **Redirect URI mismatch**: Make sure the redirect URI in Google Console matches exactly
- **localhost not working**: Make sure you added `http://localhost:5173` (with protocol)

### Apple OAuth Issues:
- **HTTPS required**: Apple OAuth requires HTTPS in production
- **Service ID not found**: Make sure you saved and registered your Service ID
- **Invalid token**: Check that your `.p8` key is correctly pasted (all content, including headers)

### General:
- Check browser console for errors
- Check Supabase logs in the Dashboard under **Authentication** > **Logs**
- Ensure your Supabase URL and anon key are correct

---

## Next Steps

1. Set up Google OAuth credentials
2. Set up Apple OAuth credentials  
3. Test both OAuth flows
4. (Optional) Create profile setup page for OAuth users
5. Update production redirect URIs when deploying

For any issues, check:
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Apple Sign In Documentation](https://developer.apple.com/sign-in-with-apple/)

