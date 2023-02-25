import FileUpload from "../react-components/uploadPDF"

export default function HomePage() {
    return (
        <div className="flex justify-center">
            <div className="mt-10 justify-center"> 
                <h2> Long-winded research articles? </h2>
                <p> Fret not! Simply summarise by clicking the button below! </p>
                <hr className="rounded"></hr>
                <br></br>
                <h2>Summary of Text</h2>

                <FileUpload/>
            </div>
        </div>
        
    )
}