import React from "react";
import { toast } from 'react-toastify';

interface ToastContextData {
    toast: typeof toast;
}

interface Props {
    children: JSX.Element
}

export const ToastContext = React.createContext<ToastContextData>({
    toast: toast
});

const ToastProvider = (props: Props) => {
    return (
        <ToastContext.Provider value={{
            toast: toast
        }}>
            {props.children}
        </ToastContext.Provider>
    );
};

export default ToastProvider;