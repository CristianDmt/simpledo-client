import React, {Component, ChangeEvent} from 'react';
import Logo from '../resources/assets/logo.png';
interface Props {
    username: string;
    password: string;
    onAuthenticate: Function;
    onCredentialsChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LoginComponent = (props: Props) => {
    return (
        <div className="container vh-100">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="mx-auto">
                    <div className="card card-login p-3 shadow-sm">
                        <div className="card-body">
                            <div>
                                <img className="login-logo mb-3" src={Logo} alt="Simpledo"/>
                                <h3 className="login-title">Welcome!</h3>
                                <p>Signup to start using Simpledo today!</p>
                            </div>

                            <div className="form-label-group mt-3">
                                <input type="text" name="username" onChange={props.onCredentialsChange}
                                       className="form-control" placeholder="Username"/>
                            </div>

                            <div className="form-label-group mt-3">
                                <input type="password" name="password" onChange={props.onCredentialsChange}
                                       className="form-control" placeholder="Password"/>
                            </div>

                            <div className="text-center mt-4 w-100">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => props.onAuthenticate()}
                                >
                                    Authenticate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;