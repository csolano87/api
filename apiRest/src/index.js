const express = require('express');

const app = express();
var morgan = require('morgan');


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
// Routes
app.use(require('../routes/index'));

app.listen(3000);
console.log('Server on port', 3000);