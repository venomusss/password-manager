import { getAuth, User } from "firebase/auth";
import React, { useEffect, useState } from "react"
import AddPasswordForm from "../components/AddPasswordForm";
import EditForm from "../components/EditForm";
import ItemsList from "../components/ItemsList";
import { editPassword, getPasswords } from "../firebase/firebase";
import { IPassword } from "../types";

interface HomePageProps {
    
}
 
const HomePage: React.FunctionComponent<HomePageProps> = () => {
    const [passwords, setPasswords] = useState<IPassword[]>([]);
    const auth = getAuth();
    const [user, setUser] = useState<User | null>(auth.currentUser);
    const [showEditForm, setShowEditForm] = useState(false)
    const [password, setPassword] = useState<IPassword>({id: '', label: '', password: ''});
    const [isLoader, setIsLoader] = useState<boolean>(false);
    useEffect(()=> {
        setIsLoader(true);
        auth.onAuthStateChanged((user) => setUser(user));
        getPasswords(user?.uid).then((passwords) => {setPasswords(passwords); setIsLoader(false)})

    },[auth, user?.uid])
    const  addPassword = (label: string, password: string, id: string): void => {
        const passwordItem:IPassword = {
            label: label,
            password: password,
            id: id,
        }
        setPasswords([...passwords, passwordItem])
    }
    const deletePassword = (id: string): void => {
        const filteredPasswords = passwords.filter(item => item.id !== id);
        setPasswords(filteredPasswords);
    }
    const editPasswordFunc = (password: IPassword):void => {
        editPassword(user?.uid, password);
        const newPasswords = passwords.map((item) => {return item.id === password.id ? password : item});
        setPasswords(newPasswords);
        setShowEditForm(!showEditForm)
    }
    const setShowEditFunc = (password: IPassword) => {
        setPassword(password);
        setShowEditForm(!showEditForm);
    }
    const closePopUp = () => {
        setShowEditForm(false);
    }
    return (
    <div className="wrapper">
        <AddPasswordForm addPasswordFunc={addPassword}/>
        <ItemsList setShowFunc={setShowEditFunc} loader={isLoader} deletePasswordFunc={deletePassword} passwords={passwords}/>
        {showEditForm && (<EditForm closePopUp={closePopUp} password={password} editPasswordFunc={editPasswordFunc}/>)}
    </div>
    );
}
 
export default HomePage;