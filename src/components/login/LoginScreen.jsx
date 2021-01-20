import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const LoginScreen = ({history}) => {

    const lastPath = localStorage.getItem('lastPath') || '/';

    const { dispatch } = useContext(AuthContext);

    const handleLogin = () => {
        dispatch({
            type: types.login,
            payload: { name: 'Aldo'}
        });
        history.replace(lastPath);
    }

    return (
        <div className="container mt-5">
            <h1>Login Screen</h1>
            <hr/>

            <button
                className="btn btn-primary"
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    )
}
