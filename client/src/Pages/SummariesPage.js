import { useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";

export default function SummariesPage() {

    //get the summaries through axios post 
    const [summaries, setSummaries] = useState("");

    //get all summaries of the users --> return the summaries with the title 
    axios.get('/summaries').then(({data}) => {
        setSummaries(data);
    });

    return (
        <div className="">
            <AccountNav />
            <div>
                <h2> Summaries Page !! </h2>
                {
                    summaries.length > 0 && summaries.map(summary => (
                        <div className="bg-gray-200 rounded-2xl mt-4">
                            <h2> {summary.title} </h2>
                            <p> {summary.summary} </p>
                        </div>
                    )
                )}
            </div>
            
        </div>
    )

}