import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

interface LoginPageProps {
    
}
 
const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
    const auth = getAuth();
    const nav = useNavigate();
    const [authing, setAuthing] = useState(false);


    const signInWithGoogle = async () => {
        setAuthing(true);
        signInWithPopup(auth, new GoogleAuthProvider()).then((response) => {
            console.log(response.user.uid);
            nav('/');
        })
        .catch((error) => {
            console.log(error);
            setAuthing(false);
        })
    }
    return (
    <>
        <p>Login</p>
        <button onClick={() => signInWithGoogle()} disabled={authing}>
            Login
        </button>
    </>
    );
}
 
export default LoginPage;