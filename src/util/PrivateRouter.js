import  React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function PrivateRoute({component: Component, ...rest}) {

    const token = localStorage.getItem('token');
    const tokenRedux = useSelector(state => state.token);
    const [auth, setAuth] = useState(false);

    async function isAuth() {
        return await axios.get('http://localhost:3000/news', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if(response === 200) {
                setAuth(true);
            }
        })
    };

    useEffect(() => {
        isAuth()
    }, [])

    return(
        <Route 
            {...rest}
            render={props =>
            auth ? (
                <Component {...props} />
            
            ): (
                <Redirect 
                    to={{
                        pathname: '/login',
                        state: { message: "Usuário não autorizado"}
                    }}
                />
            )}
        />
    )
}

export default PrivateRoute;