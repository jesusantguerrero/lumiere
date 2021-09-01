export default {
    appName: 'Lumiere',
    home: 'dashboard',
    loginRoutes: ['login', 'register'],
    FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_APP_KEY,
    FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
    FIREBASE_SENDER_ID: import.meta.env.VITE_FIREBASE_SENDER_ID,
    PUSH_PK: import.meta.env.VITE_PUSH_PK,
    MEASUREMENT_ID: import.meta.env.VITE_MEASUREMENT_ID,
    supabaseURL: import.meta.env.VITE_SUPABASE_URL,
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
}