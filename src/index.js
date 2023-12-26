const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//IMPORT ROUTER
const authRouter = require('./router/auth.router');

//USE PACKAGE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('home route!');
});

//MAIN PATH
app.use('/auth', authRouter);

//CHECKING CONNECTION
async function checkConnection() {
  try {
    await prisma.$connect();
    console.log('Prisma Client is connected!');
  } catch (error) {
    console.error('Unable to connect to Prisma Client:', error);
  }
}
checkConnection();

const port = 8000;
app.listen(port, () => {
  console.log(`server on http://localhost:${port}`);
});
