import { reactive } from "vue";

// firebase state
export const AuthState = reactive({
    user: null,
    uid: null,
    settings: {},
    provider: null,
    onLoaded: () => {},
})


export const useAuth = (provider) => {
    if (provider) {
        AuthState.provider = provider
    }

    const setLoaded = (loadedCallback) => {
        AuthState.onLoaded = loadedCallback   
    }

    const initAuth = new Promise(resolve => {
        AuthState.provider?.onAuthStateChanged(async (user) => {
            AuthState.settings = {};
            AuthState.user = user;
            AuthState.onLoaded()
            resolve(user || AuthState.user);
        });
        resolve(AuthState.user);
    })
    
    const isAuthenticated = async () => {
        await initAuth;
        return AuthState.user;
    }
    
    return {
        isAuthenticated,
        initAuth,
        register: AuthState.provider?.register,
        login: AuthState.provider?.login,
        logout: AuthState.provider?.logout,
        loginWithProvider: AuthState.provider?.loginWithProvider,
    }
}
