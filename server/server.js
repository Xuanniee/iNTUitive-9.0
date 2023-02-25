require('dotenv').config({path: '../.env'});    
const Express = require('express');
const multer = require('multer');
const path = require('path');
const { PythonShell } = require('python-shell');
const spawn = require("child_process").spawn;

const mongoose = require('mongoose');
const User = require('./models/User');
const SummaryModel = require('./models/Summary');
var cors = require('cors');
const CookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Environment Variables
const port = process.env.PORT;


const nlpApp = Express();

var cors = require('cors')
nlpApp.use(cors());

// Multer Middleware to handle File Uploads
// Set up multer instance
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
const upload = multer({ storage: storage });

const summarisePyFile = path.join(__dirname, 'nlp-gensim', 'summarise.py');
// const summarisePyFile = 'summarise.py';

/**
 * File Upload via POST
 */
nlpApp.post('/upload-article', upload.single('pdfFile'), (request, response) => {
    console.log('Received file upload request');
    const uploadedArticle = request.file;
    //console.log('Uploaded file:', uploadedArticle);

    // Process the PDF file and send a response indicating success or failure
    if (uploadedArticle) {
        console.log(`Uploaded file: ${uploadedArticle.filename}`);
        response.status(200).send('File uploaded successfully.');
    } else {
        response.status(400).send('No file uploaded.');
    }

    // Call the Summary Function in Python
    // const pythonProcess = spawn('python3.9', [summarisePyFile, uploadedArticle.path]);
    const pythonProcess = spawn('python3.9', [summarisePyFile, uploadedArticle]);

    // pythonProcess.stdout.on('data', (data) => {
    //     // Do something with the data returned from python script
    //     console.log(data);
    //     pythonProcess.stdout.removeListener('data', onData);
    // });

    // function onData(data) {
    //     // Do something with the data returned from python script
    //     console.log(data);
    // }

    var options = {
        mode: 'text',
        pythonPath: "/opt/homebrew/bin/python3.9",
        pythonOptions: ['-u'],
        // make sure you use an absolute path for scriptPath
        scriptPath: "/Users/ngxua/WebDevelopmentProjects/iNTUitive-9.0/server/nlp-gensim",
        args: [uploadedArticle.filename]
    };
    
    // console.log("Before Python");
    // // create a new PythonShell instance
    // const pythonShell = new PythonShell(summarisePyFile, options);

    // // Send data to the Python script
    // pythonShell.send(uploadedArticle.filename);

    // // Handle the output from the script
    // pythonShell.on('message', (message) => {
    //     const summary = message.join(' '); // join the list of sentences into a single string
    //     response.status(200).json({
    //         uploadSuccess: true,
    //         title: uploadedArticle.filename,
    //         summary: summary // send the summary as a property in the response JSON object
    //     });
    // });

    // // Handle errors from the script
    // pythonShell.on('error', (err) => {
    //     console.log(err);
    //     response.status(500).send("Error 500: Server Error");
    // });

    // // End the PythonShell instance explicitly
    // pythonShell.end();

    PythonShell.run("", options, (err, result) => {
        console.log("Python was here");
        if (err) {
            console.log(err);
            response.status(500).send("Error 500: Server Error");
        }
        else {
            console.log(result);
            const summary = result.join(' '); // join the list of sentences into a single string
            response.status(200).json({
                uploadSuccess: true,
                title: uploadedArticle.filename,
                summary: summary // send the summary as a property in the response JSON object
            });
        }

        // end the PythonShell instance explicitly
        // pythonShell.end(function (err) {
        //     if (err) {
        //         console.log(err);
        //     }
        // });
    })

    
    
})


nlpApp.get('/', (request, response) => {
    response.send("Testing");
})

nlpApp.listen(port, () => {
    console.log(`Server started on Port ${port}`);
})


