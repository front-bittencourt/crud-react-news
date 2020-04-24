import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Navbar() {

    const dispatch = useDispatch();

    return(
        <>
            <nav className="navbar">
                <ul>
                    <li><Link to="/">Nóticias</Link></li>

                    {
                    useSelector(state => state.usuarioLogado > 0) 
                        ?
                            <>
                                <li><Link to="/publish-news">Publicar Nóticias</Link></li>
                                <li><Link to="#" onClick={() => dispatch({type: 'LOG_OUT'})}>Logout</Link></li> 
                            </>
                        :
                            <>
                                <li><Link to="/login">Login</Link></li>
                            </>
                    }
                </ul>
            </nav>
        </>
    )
};

export default Navbar;