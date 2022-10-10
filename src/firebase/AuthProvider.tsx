import {FC, useEffect, useState} from "react";
import firebase from "firebase/auth";
import {auth} from "./firebase"
import {AuthContext} from "./AuthContext";

interface AuthProviderProps {
    children: any;
}


export const AuthProvider: React.FunctionComponent<AuthProviderProps> =(props) => {
    const [user, setUser] = useState<firebase.User | null>(null);
    const { children } = props;

    useEffect(() => {
        return auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
        });
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};