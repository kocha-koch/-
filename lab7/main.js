const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const router = require('./router/router')
const hostname = "127.0.0.1";
const port = 3330;
const app = express();

app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));

app.use("/", router);

app.use((req, res) => {
    res.status(404).send('Page not found!');
});

app.listen(port, hostname, () =>{
    console.log(`Server running at http://${hostname}:${port}/`);
})