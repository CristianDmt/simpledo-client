import {useContext} from 'react';
import {ToastContainer, Zoom, toast} from 'react-toastify';
import {UserContext} from "../context/UserContext";
import Todos from "../containers/Todos";
import Login from "../containers/Login";

interface Props {
}

const Main = (props: Props) => {
    const userContext = useContext(UserContext);

    return (
        <>
            {userContext.authVerified && userContext.isAuthenticated ? <Todos /> : <Login />}

            <ToastContainer
                limit={3}
                transition={Zoom}
                autoClose={1500}
                position={toast.POSITION.BOTTOM_RIGHT}
            />
        </>
    );
}

export default Main;