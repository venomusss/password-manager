import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth }  from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

interface AuthRouteProps {
    children: any;
}
 
const AuthRoute: React.FunctionComponent<AuthRouteProps> = (props) => {
    const { children } = props;
    const auth = getAuth();
    const nav = useNavigate();
    const [load, seetLoad] = useState(false);
    useEffect(() => {

    }, [auth])

    const checkAuth = onAuthStateChanged(auth, (user) => {
        if(user) {
            seetLoad(false);
        } 
        else{
            nav('/login');
        }
    })
    if (load) return <p>Loading...</p>

    return <>{children}</>;
}
 
export default AuthRoute;