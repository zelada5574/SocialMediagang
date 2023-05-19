const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const routes = require('./routes');
const helpers = require('./utils');
const path = require('path');

const hbs = exphbs.create({
  helpers
});

const sequelize = require('./config/connection');

const app = express();

const PORT = process.env.PORT || 3001;

// setup express so that it knows we're using handlebars as our
// template engine


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'))

// setup express to use sessions
// it will create a cookie on the browser
// and cookies are automatically setup between client/server
// we do not need to do any other additional settings from the client/back-end to

//process the cookie
const sessionConfig = {
  secret: 'Super secret secret', // normally this should be an environmental variable
  resave: false,
  saveUninitialized: false,
  // maxAge: 1000 * 60 * 60 * 24
};

// /api/users/signup

app.use(fileUpload());
// Express middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json({limit: '80mb'}));
app.use(express.urlencoded({limit: '80mb'}));
// This will create a req.session object for every request that comes into our server
// Every route that we declare will have access to req.session
// This "req.session" object will persist data that we store on it
// until we destroy the session or the server shuts down
app.use(session(sessionConfig));



// /users/c75066b2-1082-4a98-8718-4e5536dbac5e

app.post('/upload', (req, res) => {
  // if (!req.files) return res.sendStatus(400).json({message: 'No image submitted'});
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

