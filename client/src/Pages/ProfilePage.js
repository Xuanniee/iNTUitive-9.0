import {useContext, useState} from "react";
import { UserContext } from "../UserContext.js";
import {Navigate, useParams} from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav.js";

export default function ProfilePage() {
    const {user, ready, setUser} = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    
    let {subpage} = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout');
        //after logout --> go to homepage
        setRedirect('/');
        //after logout --> remove name
        setUser(null);
    }

    if (!ready) {
        return 'Loading...';
    }

    //if no user - havent log in --> go to login page
    //ready makes sure the user data is obtained --> if not direct to login page 
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    //bg-primary text-white rounded-full

    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="max-w-lg mx-auto">
                    Logged in as: <br/>
                    Name: {user.name} <br/>
                    Email: {user.email} <br />
                    <button onClick={logout} className="primary max-w-sm text-white mt-2"> Logout </button>
                </div>
            )}
        </div>
    )
}