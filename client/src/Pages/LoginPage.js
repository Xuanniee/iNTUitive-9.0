import { Link, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            //withCredentials --> add cookies
            const {data} = await axios.post('/login', {email, password});
            setUser(data);
            alert('Login Successful');
            setRedirect(true);
        } catch(err) {
            alert('Login Failed');
            console.log(err);
        }
    }

    //if login successful -> redirect user to home page
    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        /*mt adds spacing, grow lets div expand to whole screen */

        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32"> 
                <h1 className="text-4xl text-center mb-4"> Login </h1>
                {/* mx-auto horizontally centers*/}
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                    <input type="email" 
                            placeholder="your@email.com" 
                            value={email} 
                            onChange={ev=> setEmail(ev.target.value)}/>
                    <input type="password" 
                        placeholder="password"
                        value={password} 
                        onChange={ev=> setPassword(ev.target.value)}/>
                    <button className="primary"> Login </button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register Now</Link> 
                    </div>
                </form>
            </div>
        </div>
    )
}














