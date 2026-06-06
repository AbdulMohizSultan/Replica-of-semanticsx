# SemanticsX Homepage Replica

Responsive React/Vite implementation of the SemanticsX landing page with:

- Firebase email/password registration and login
- Google sign-in
- Password reset
- Protected dashboard and logout
- Responsive homepage sections, pricing, and mobile navigation

## Firebase setup

1. Create a Firebase project.
2. Enable **Email/Password** and **Google** in Authentication > Sign-in method.
3. Copy `.env.example` to `.env`.
4. Add the Firebase web app configuration values.
5. Add your local and production domains to Firebase Authentication > Settings > Authorized domains.

## Run

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
```
