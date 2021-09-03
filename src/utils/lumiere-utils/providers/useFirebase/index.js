import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";


export const useFirebase = (AuthState, config) => {
    // setup firebase
    const firebaseConfig = {
        apiKey: config.FIREBASE_API_KEY,
        authDomain: `${config.FIREBASE_PROJECT_ID}.firebaseapp.com`,
        databaseURL: `https://${config.FIREBASE_PROJECT_ID}.firebaseio.com`,
        projectId: config.FIREBASE_PROJECT_ID,
        storageBucket: `${config.FIREBASE_PROJECT_ID}.appspot.com`,
        messagingSenderId: config.FIREBASE_SENDER_ID,
        measurementId: config.MEASUREMENT_ID,
        appId: config.FIREBASE_APP_ID,
    }
    const firebaseApp = initializeApp(firebaseConfig);
    
    // setup firebase auth
    const auth = getAuth(firebaseApp);

    const register = async (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password).catch(reason => {
            throw new Error(reason.message);
        })
    }

    const login = async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
        .catch((reason) => {
            throw new Error(reason.message);
        })
    }

    const getProvider = (providerName) => {
        const providers = {
            google: {
                method: new firebase.auth.GoogleAuthProvider,
                scopes: ['profile', 'email']
            }
        }
        const providerData = providers[providerName]
        if (providerData) {
            const provider = providerData.method;
            providerData.scopes.forEach(() => {
                provider.addScope('profile');
                provider.addScope('email');
            })
            return provider;
        }
    }

    const loginWithProvider = async(providerName) => {
        signInWithPopup(auth, getProvider(providerName)).then(() => {
            location.reload()
        });
    }

    const logout = () => {
        return signOut(auth)
    }

    const initAuth = async(authenticatedCallback) => {
        AuthState.provider?.onAuthStateChanged(async (user) => {
            AuthState.settings = {};
            AuthState.user = user;
            AuthState.onLoaded()
            authenticatedCallback && authenticatedCallback(user || AuthState.user);
        });
    };
    
    const isAuthenticated = async () => {
        await initAuth();
        return AuthState.user;
    }

    return {
        initAuth,
        isAuthenticated,
        register,
        login,
        loginWithProvider,
        logout,
        onAuthStateChanged: onAuthStateChanged.bind(null, auth),
        isAuthenticated,
    }
}