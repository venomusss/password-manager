import { getAuth, User } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { IPassword } from '../types'
import Password from './Password';

type Props = {
    deletePasswordFunc: (id: string) => void;
    passwords: IPassword[];
    setShowFunc: (password:IPassword) => void;
    loader: boolean;
}

function ItemsList({deletePasswordFunc, passwords, setShowFunc, loader}: Props) {
    const auth = getAuth();
    const [user, setUser] = useState<User | null>(auth.currentUser);
    useEffect(()=> {
        auth.onAuthStateChanged((user) => setUser(user));
    },[user?.uid, passwords?.length, auth])
    return (
        <>
        {loader ? (<img className='loader' src='https://i.pinimg.com/originals/07/24/88/0724884440e8ddd0896ff557b75a222a.gif' alt='loader'/>)  : (
        <div className='list'>
        {passwords?.length > 0 ? (<>
            {passwords?.map((password:IPassword, index) => (
                <Password setShowFunc={setShowFunc} key={index} deletePasswordFunc={deletePasswordFunc} id={password.id} uid={user?.uid} password={password.password} label={password.label}/>
            ))}
        </>) : (<div className='empty-list'>Your password list is empty :-(</div>)}
        </div>)}
        </>
    )
}

export default ItemsList