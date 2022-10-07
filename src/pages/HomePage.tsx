import { getAuth, signOut } from "firebase/auth";
import React from "react"

interface HomePageProps {
    
}
 
const HomePage: React.FunctionComponent<HomePageProps> = () => {
    const auth = getAuth();

    return (
    <>
        <p>Homepage</p>
        <button onClick={()=> signOut(auth)}>sign out</button>
    </>
    );
}
 
export default HomePage;