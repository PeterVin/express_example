const express = require('express');
const morgan = require('morgan');
const app = express();

const authenticationMiddleware = (req, res, next) => {
  console.log('Authentication');
  res.locals.user = { username: 'Woody' };
  next();
}; 

const loggerMiddleware = (req, res, next) => {
  console.log(req.method, req.path);
  next();
}; 

const getRootHandler = (req, res) => {
  console.log(req.path, req.method, req.query);
  res.sendStatus(418);
};

const getUserHandler = (req, res) => {
  console.log('params:', req.params);
  res.status(400).send(`Dear ${res.locals.user.username}! It was a bad request`); //Backtick!!!
};

const redirectExampleHandler = (req, res) => {
  res.redirect('/');
};

const createIssue = (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
};

//app.get('/', (req, res) => {
//  res.sendStatus(200);
//});
//
//app.post('/', (req, res) => {
//  res.status(201).send('TADAAAM');
//});
//
//app.post('/create', (req, res) => {
//  res.sendStatus(201);
//});
//
//app.get('/teapot', (req, res) => {
//  res.sendStatus(418);
//});

app.use(morgan('tiny'));
app.use(express.json());
app.use(loggerMiddleware);
app.use(authenticationMiddleware);
app.get('/', getRootHandler);
app.get('/user/:userId/b/:ize/a/:ize2', getUserHandler);
app.get('/redirect-example', redirectExampleHandler);
app.post('/issue', createIssue);

app.listen(3000);