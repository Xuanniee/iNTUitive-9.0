import { useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";

export default function SummariesPage() {

    //get the summaries through axios post 
    const [summaries, setSummaries] = useState([]);

    

    
    //get all summaries of the users
    axios.get('/summaries');

    return (
        <div className="">
            <AccountNav />
            <h2> Summaries Page !! </h2>
        </div>
    )

}