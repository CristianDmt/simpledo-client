import React, {ChangeEvent, useState, useContext} from 'react';
import { UserContext } from "../context/UserContext";
import LoginComponent from "../components/Login";

interface State {
    username: string;
    password: string;
}

const Login = () => {
    const userContext = useContext(UserContext);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onCredentialsChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.name === 'username') {
            setUsername(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    }

    const onAuthenticate = async () => {
        userContext.authenticate(username, password);
    }

    return (
        userContext.authVerified && !userContext.isAuthenticated ?
            <LoginComponent
                username={username}
                password={password}
                onCredentialsChange={onCredentialsChange}
                onAuthenticate={onAuthenticate}
            /> : null
    );
}

export default Login;