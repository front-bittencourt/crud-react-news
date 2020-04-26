import  React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({component: Component, ...rest}) {

    const tokenRedux = useSelector(state => state.token);

    function isAuth() {
        const token = localStorage.getItem('token');
          
        if(token === tokenRedux) return true;

        return false;
    };

    return(
        <Route 
            {...rest}
            render={props =>
            isAuth() ? (
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