import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summaryText, setSummaryText] = useState("");
  const [ready, setReady] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('pdfFile', selectedFile);
    //console.log(Object.fromEntries(formData.entries()));
    await axios.post('/upload-article', formData, {
      headers: {'Content-Type': 'application/pdf'},
    })    
      .then(response => {

          //console.log(("response:" + response));
          //console.log(("response data:" + response.data));
          /*response.data['summarisedText'].map(data => {
              array += data;
          })
          //console.log(array);*/
          console.log("Response:" + JSON.stringify(response.data.summarisedText));
          let summary = JSON.stringify(response.data.summarisedText);
          summary.replace(/"/g, '');
          summary.replace(/\n/g, '');
          console.log("Updated summary:" + summary);
          setSummaryText(summary);
        })
      // .then(data => console.log(data))
      .catch(error => console.error(error));
    
  };

  return (
    <div>
        {
        summaryText && (
          <div className='flex-auto'>
            <br></br>
            <p>
              {summaryText}
            </p>

            {/*<button className="bg-gray-200 r-0 rounded-2xl py-2 px-2 object-none object-right-bottom" type="button">Click to Expand the Text</button>*/}
          </div>
        )
        }
        <form action="/upload-article" method="POST" onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileInputChange} />
          <button className="bg-gray-200 rounded-2xl py-2 px-2" type="submit">Submit</button>
        </form>
    </div>
  );
}

export default FileUpload;
