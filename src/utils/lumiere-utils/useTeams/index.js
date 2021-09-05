import { reactive } from "vue";

// firebase state
export const TeamState = reactive({
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

    const initAuth = (authenticatedCallback) => {
      
        AuthState.provider?.onAuthStateChanged((user, session) => {
            const authenticatedUser = session?.user || user;
            AuthState.settings = {};
            AuthState.user = typeof authenticatedUser !== 'string' ? authenticatedUser : {};
            AuthState.onLoaded()
            authenticatedCallback && authenticatedCallback(authenticatedUser || AuthState.user);
        });
        
        if (AuthState.provider?.getUser) {
            AuthState.user = AuthState.provider.getUser();
            authenticatedCallback && authenticatedCallback(AuthState.user);
        }
    };
    
    const isAuthenticated = async () => {
        await new Promise(resolve => initAuth(resolve));
        return AuthState.user?.email;
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
