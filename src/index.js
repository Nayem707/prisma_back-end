const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//IMPORT ROUTER
const authRouter = require('./router/auth.router');

//USE PACKAGE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//MAIN PATH
app.use('/auth', authRouter);

const port = 8000;
app.listen(port, () => {
  console.log(`server on http://localhost:${port}`);
});
