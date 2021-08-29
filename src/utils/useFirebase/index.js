import { reactive } from "vue";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";

import CONFIG from "../../config";

// firebase state
export const firebaseState = reactive({
    user: null,
    uid: null,
    settings: {},
    onLoaded: () => {},
})

export const setLoaded = (loadedCallback) => {
    firebaseState.onLoaded = loadedCallback   
}

// setup firebase
const firebaseConfig = {
    apiKey: CONFIG.FIREBASE_API_KEY,
    authDomain: `${CONFIG.FIREBASE_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${CONFIG.FIREBASE_PROJECT_ID}.firebaseio.com`,
    projectId: CONFIG.FIREBASE_PROJECT_ID,
    storageBucket: `${CONFIG.FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: CONFIG.FIREBASE_SENDER_ID,
    measurementId: CONFIG.MEASUREMENT_ID,
    appId: CONFIG.FIREBASE_APP_ID,
}
const firebaseApp = initializeApp(firebaseConfig);

// setup firebase auth
const auth = getAuth(firebaseApp);

export const register = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).catch(reason => {
        throw new Error(reason.message);
    })
}

export const login = async (email, password) => {
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


export const loginWithProvider = async(providerName) => {
    signInWithPopup(auth, getProvider(providerName)).then(() => {
        location.reload()
    });
}

export const logout = () => {
    return signOut(auth)
}

// listen to auth state changes
const initFirebase = new Promise(resolve => {
    onAuthStateChanged(auth, async (user) => {
        firebaseState.settings = {};
        firebaseState.user = user;
        firebaseState.onLoaded()
        resolve(user || firebaseState.user);
    });
    resolve(firebaseState.user);
})

export const isAuthenticated = async () => {
    await initFirebase;
    return firebaseState.user;
}