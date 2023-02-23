const Express = require('express');
const app = Express();
const port = 3000;

app.get('/', (request, response) => {
    response.send("Testing");
})

app.listen(port, () => {
    console.log("Server started on Port ${port}");
})


