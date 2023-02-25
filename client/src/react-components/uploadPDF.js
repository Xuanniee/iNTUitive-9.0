import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    console.log("IT WORKED");
    event.preventDefault();
    const formData = new FormData();
    formData.append('pdfFile', selectedFile);
    console.log(Object.fromEntries(formData.entries()));
    await axios.post('http://localhost:3000/upload-article', formData, {
      headers: {'Content-Type': 'application/pdf'},
    })    
      .then(response => console.log(response.data))
      .then(data => console.log(data))
      .catch(error => console.error(error));
    // fetch('/upload-article', {
    //   method: 'POST',
    //   body: formData,
    // // })
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => console.error(error));
    
  };

  return (
    <form action="/upload-article" method="POST" onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileInputChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default FileUpload;
