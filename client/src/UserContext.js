import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const UserContext = createContext({});

//transfer usercontext over
export function UserContextProvider({children}) {

    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({data}) => {
                setUser(data);
                //after setUser
                setReady(true);
            });
        }
    }, [user]);

    return (
        <UserContext.Provider value={{user,setUser,ready}}>
            {children}
        </UserContext.Provider>
    );
}