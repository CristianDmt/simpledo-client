import React, {ChangeEvent} from 'react';
import Logo from "../resources/assets/logo.png";
import {Todo} from "../data/entities/Todo";

interface Props {
    title: string;
    todos: Todo[];
    onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onCreateTodo: Function;
    onDeleteTodo: Function;
    onMarkTodo: Function;
    onFilterChange: Function;
    logout: Function;
}

const TodosComponent = (props: Props) => {
    const checkSubmit = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            props.onCreateTodo();
        }
    };

    return (
        <div className="container vh-100">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="mx-auto">
                    <div className="card card-login p-3 shadow-sm">
                        <div className="card-body">
                            <div>
                                <img className="login-logo mb-3" src={Logo} alt="Simpledo"/>
                                <h3 className="login-title">To Do List</h3>
                            </div>
                            <div className="row my-3">
                                <div className="form-label-group editable-input-focused">
                                    <input type="text"
                                           name="title"
                                           value={props.title}
                                           onChange={props.onTitleChange}
                                           onKeyDown={checkSubmit}
                                           className="form-control"
                                           placeholder="Add a new todo"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                {
                                    props.todos.map((todo, index) => {
                                        return (
                                            <div className="row" key={index}>
                                                <div className="col-1">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={todo.completed}
                                                        onChange={() => props.onMarkTodo(todo.id, !todo.completed)}
                                                    />
                                                </div>
                                                <div className="col-9">
                                                    <span>{todo.title}</span>
                                                </div>
                                                <div className="col-1">
                                                    <button
                                                        className="btn btn-link"
                                                        onClick={() => props.onDeleteTodo(todo.id)}
                                                    >Delete</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="row">
                                <div className="col-12 text-center">
                                    <span>Show:</span>
                                    <button className="btn btn-link" onClick={() => props.onFilterChange(null)}>All</button>
                                    <button className="btn btn-link" onClick={() => props.onFilterChange(1)}>Completed</button>
                                    <button className="btn btn-link" onClick={() => props.onFilterChange(0)}>Pending</button>
                                </div>
                            </div>
                            <div className="row text-center">
                                <button className="btn btm-secondary" onClick={() => props.logout()}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodosComponent;