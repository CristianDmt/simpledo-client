import React, { useState, useEffect, useContext } from "react";
import UserService from "../data/services/UserService";
import LocalStorageService from "../data/services/LocalStorageService";
import { AxiosResponse, AxiosError } from "axios";
import { ToastContext } from "./ToastContext";
import { AuthResponse } from "../data/entities/AuthResponse";

interface UserContextData {
    authVerified: boolean;
    isAuthenticated: boolean;
    userData: AuthResponse | null;
    authenticate: (username: string, password: string) => void;
    logout: () => void;
}

interface Props {
    children: JSX.Element
}

export const UserContext = React.createContext<UserContextData>({
    authVerified: false,
    isAuthenticated: false,
    userData: null,
    authenticate: () => { },
    logout: () => { }
});

const LOCAL_STORAGE_USER_TOKEN = 'token';
const UserProvider = (props: Props) => {
    const toastContext = useContext(ToastContext);

    const [authVerified, setAuthVerified] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userData, setUserData] = useState<AuthResponse | null>(null);

    useEffect(() => {
        const auth = LocalStorageService.loadFromLocalStorage(LOCAL_STORAGE_USER_TOKEN);

        if (auth) {
            setAuthVerified(true);
            setIsAuthenticated(true);
            setUserData({ token: auth });
        } else {
            setAuthVerified(true);
            setIsAuthenticated(false);
        }
    }, []);

    const authenticate = (username: string, password: string): void => {
        if (!isAuthenticated && authVerified) {
            UserService.authenticateUser(
                username,
                password
            ).then((response: AxiosResponse) => {
                const userData = Object.assign({}, response.data);
                setAuthVerified(true);
                setIsAuthenticated(true);
                setUserData(userData);

                LocalStorageService.saveToLocalStorage(LOCAL_STORAGE_USER_TOKEN, userData.token);
            }).catch((error: AxiosError<{ message: string }>) => {
                toastContext.toast('login failed');
            });
        }
    };

    const logout = (): void => {
        setIsAuthenticated(false);
        setUserData(null);

        LocalStorageService.saveToLocalStorage(LOCAL_STORAGE_USER_TOKEN, '');
    };

    return (
        <UserContext.Provider value={{
            authVerified: authVerified,
            isAuthenticated: isAuthenticated,
            userData: userData,
            authenticate: authenticate,
            logout: logout
        }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;