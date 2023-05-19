const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const routes = require('./routes');
const helpers = require('./utils');
const path = require('path');
require('dotenv').config();

const hbs = exphbs.create({
  helpers
});

const sequelize = require('./config/connection');

const app = express();

const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'))

app.use('/favicon.ico', express.static('/images/favicon.ico'));

const sessionConfig = {
  secret: process.env.DB_SECRET, // normally this should be an environmental variable
  resave: false,
  saveUninitialized: false,
};

app.use(fileUpload());
app.use(express.static(__dirname + '/public'));
app.use(express.json({limit: '80mb'}));
app.use(express.urlencoded({limit: '80mb'}));
app.use(session(sessionConfig));

app.post('/upload', (req, res) => {
  console.log(req.files);
  const file = req.files.file;
  const fileName = file.name;
  file.mv("./public/images/" + fileName, (err) => {
    if (err) {
        console.log(err);
        res.send("error occured");
    } else {
        res.status(200).json({name: fileName, path: `/images/${fileName}`});
    }
});
});


app.use(routes);


sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});

