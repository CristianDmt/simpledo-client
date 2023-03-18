import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import TodosComponent from "../components/Todos";
import {UserContext} from "../context/UserContext";
import TodoService from "../data/services/TodoService";
import {ToastContext} from "../context/ToastContext";
import {Todo} from "../data/entities/Todo";
import {AxiosResponse} from "axios";

const Todos = () => {
    const userContext = useContext(UserContext);
    const toastContext = useContext(ToastContext);

    const [title, setTitle] = useState<string>('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<number | null>(null);

    useEffect(() => {
        loadTodos()
    }, [filter]);

    const loadTodos = () => {
        if (userContext.userData?.token) {
            TodoService.listAll(userContext.userData.token, filter).then((response: AxiosResponse<{ todos: Todo[] }>) => {
                if (response.data?.todos) {
                    setTodos(response.data.todos);
                }
            }).catch((error) => {
                toastContext.toast('could not load todos');
            });
        }
    }

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
         setTitle(e.target.value);
    }

    const onCreateTodo = () => {
        if (userContext.userData?.token) {
            TodoService.create(userContext.userData?.token, title).then((response: AxiosResponse<Todo>) => {
                if (response.data && response.status === 201) {
                    toastContext.toast('Item created!');
                    setTitle('');
                    loadTodos();
                }
            }).catch((error) => {
                toastContext.toast('could not create todo');
            });
        }
    }

    const onMarkTodo = (id: number, status: boolean) => {
        if (userContext.userData?.token) {
            TodoService.patch(
                userContext.userData?.token,
                id,
                status ? 'complete' : 'pending'
            ).then((response: AxiosResponse) => {
                if (response.status === 200) {
                    toastContext.toast('Item updated!');
                    loadTodos();
                }
            }).catch((error) => {
                toastContext.toast('could not update todo');
            });
        }
    }

    const onDeleteTodo = (id: number) => {
        if (userContext.userData?.token) {
            TodoService.delete(userContext.userData?.token, id).then((response: AxiosResponse) => {
                if (response.status === 204) {
                    toastContext.toast('Item deleted!');
                    loadTodos();
                }
            }).catch((error) => {
                toastContext.toast('could not delete todo');
            });
        }
    }

    return (
        <TodosComponent
            onTitleChange={onTitleChange}
            onCreateTodo={onCreateTodo}
            onDeleteTodo={onDeleteTodo}
            onMarkTodo={onMarkTodo}
            onFilterChange={setFilter}
            title={title}
            todos={todos}
            logout={userContext.logout}
        />
    );
}

export default Todos;