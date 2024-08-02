import { createContext, useState } from "react";
import { loginUser } from '../restApi/authenticationAPI';

const TOKEN_EXPIRATION = 3600000; // Example expiration time (1 hour)
const AuthCtx = createContext();

const useAuthHook = () => {
    // Retrieve data from localStorage
    let defaultState = localStorage.getItem("userAuthData");

    if (defaultState) {
        defaultState = JSON.parse(defaultState);
        if (defaultState.accessTokenExpiry && defaultState.accessTokenExpiry < Date.now()) {
            clearCache();
            defaultState = null;
        }
    }

    // Define state
    const [currentUser, setCurrentUser] = useState(defaultState?.currentUser || null);
    const [currentUserId, setCurrentUserId] = useState(defaultState?.currentUserId || null);
    const [roles, setRoles] = useState(defaultState?.roles || null);
    const [accessToken, setAccessToken] = useState(defaultState?.accessToken || null);
    const [accessTokenExpiry, setAccessTokenExpiry] = useState(defaultState?.accessTokenExpiry || null);
    const [loginError, setLoginError] = useState(null);

    // Persist data in localStorage
    const persistInCache = (json) => {
        const { userName, accessToken, roles, userId } = json;
        const expiryTime = Date.now() + TOKEN_EXPIRATION; // Set the expiration time

        const data = {
            currentUser: userName,
            currentUserId: userId,
            roles: roles,
            accessToken: accessToken,
            accessTokenExpiry: expiryTime,
        };

        localStorage.setItem("userAuthData", JSON.stringify(data));
    };

    // Clear data from localStorage
    const clearCache = () => {
        const defaultState = {
            currentUser: null,
            currentUserId: null,
            roles: null,
            accessToken: null,
            accessTokenExpiry: null,
        };
        localStorage.setItem("userAuthData", JSON.stringify(defaultState));
    };

    // Login function
    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            loginUser(email, password)
                .then(json => {
                    const { userName, accessToken, roles, userId } = json;

                    setCurrentUser(userName);
                    setCurrentUserId(userId);
                    setRoles(roles);
                    setAccessToken(accessToken);
                    setAccessTokenExpiry(Date.now() + TOKEN_EXPIRATION);
                    setLoginError(null);

                    persistInCache(json);
                    resolve(json);
                })
                .catch(error => {
                    setCurrentUser(null);
                    setCurrentUserId(null);
                    setRoles(null);
                    setAccessToken(null);
                    setAccessTokenExpiry(null);
                    setLoginError(error.reason);

                    reject(error);
                });
        });
    };

    // Logout function
    const logout = () => {
        setCurrentUser(null);
        setCurrentUserId(null);
        setRoles(null);
        setAccessToken(null);
        setAccessTokenExpiry(null);
        setLoginError(null);
        clearCache();
        return Promise.resolve();
    };

    // Check role
    const hasRole = (roleArray) => {
        if (!roleArray) {
            return true;
        }
        return roles?.some(role => roleArray.includes(role)) || false;
    };

    // Check token validity
    const isAccessTokenValid = () => {
        return accessTokenExpiry && accessTokenExpiry >= Date.now();
    };

    return {
        AuthCtx,
        AuthProvider: ({ children }) => (
            <AuthCtx.Provider value={{ loginError, currentUser, currentUserId, accessToken, accessTokenExpiry, roles, login, logout, hasRole, isAccessTokenValid }}>
                {children}
            </AuthCtx.Provider>
        )
    };
};

export default useAuthHook;
