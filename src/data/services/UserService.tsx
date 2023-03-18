import TodoApi from "../api/TodoApi";
import {AuthResponse} from "../entities/AuthResponse";

export default class UserService {
    static authenticateUser = (email: string, password: string) => {
        return TodoApi.post<AuthResponse>(
            '/user/auth', {
                email: email,
                password: password
            }
        );
    };
}