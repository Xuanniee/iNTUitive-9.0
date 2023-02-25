require('dotenv').config({path: '../.env'});    
const Express = require('express');
const multer = require('multer');
const path = require('path');

// Environment Variables
const port = process.env.PORT

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

/**
 * File Upload via POST
 */
nlpApp.post('/upload-article', upload.single('pdfFile'), (request, response) => {
    console.log('Received file upload request');
    const uploadedArticle = request.file;
    console.log('Uploaded file:', uploadedArticle);

    // Process the PDF file and send a response indicating success or failure
    if (uploadedArticle) {
        console.log(`Uploaded file: ${uploadedArticle.filename}`);
        // response.status(200).send('File uploaded successfully.');
    } else {
        response.status(400).send('No file uploaded.');
    }

    // Call the Summary Function in Python
    console.log("Before Python");

    var options = {
        mode: 'text',
        pythonPath: '/usr/bin/python', 
        pythonOptions: ['-u'],
        // make sure you use an absolute path for scriptPath
        scriptPath: '/home/username/Test_Project/Python_Script_dir',
        args: ['value1', 'value2', 'value3']
    };
    
    PythonShell.run(summarisePyFile, {args: [`uploads/${uploadedArticle.filename}`]}, (err, result) => {
        console.log("Python was here");
        if (err) {
            console.log(err);
            response.status(500).send("Error 500: Server Error");
        }
        else {
            console.log(result);
            response.send(`Result: ${result}`);
        }
    })

    response.json({
        success: true
    });
})


nlpApp.get('/', (request, response) => {
    response.send("Testing");
})

nlpApp.listen(port, () => {
    console.log(`Server started on Port ${port}`);
})


