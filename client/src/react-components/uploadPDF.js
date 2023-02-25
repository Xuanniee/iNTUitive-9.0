import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summaryText, setSummaryText] = useState("");
  var array = "";

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('pdfFile', selectedFile);
    console.log(Object.fromEntries(formData.entries()));
    await axios.post('http://localhost:3000/upload-article', formData, {
      headers: {'Content-Type': 'application/pdf'},
    })    
      .then(response => {
          console.log((response.data));
          console.log(response.length);
          for(let i = 0; i < response.length; i += 1){
              array += response.data[i];
          }
          console.log(array);
          setSummaryText(array);
        })
      // .then(data => console.log(data))
      .catch(error => console.error(error));
    
  };

  return (
    <div>
        {
        summaryText && (
          <div>
            <p>
              ${summaryText}
            </p>
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
