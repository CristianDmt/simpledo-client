import TodoApi from "../api/TodoApi";
import {Todo} from "../entities/Todo";

export default class TodoService {
    static listAll = (token: string, isCompleted: number | null = null) => {
        const filterQuery = isCompleted !== null ? `?completed=${+isCompleted}` : ``;

        return TodoApi.get<{ todos: Todo[] }>(
            `/todos${filterQuery}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    };

    static create = (token: string, title: string) => {
        return TodoApi.post<Todo>(
            '/todos', {
                title: title
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    };

    static patch = (token: string, id: number, status: string) => {
        return TodoApi.patch<Todo>(
            `/todos/${id}/${status}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    };

    static delete = (token: string, id: number) => {
        return TodoApi.delete<void>(
            `/todos/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    };
}