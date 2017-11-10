const express = require('express');
let app = express();
const db = require('../database/index.js'); //If we're going to save to the db, we need to import the save function
const helper = require('../helpers/github.js');
const bp = require('body-parser');
const Promise = require('bluebird')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bp.json());
app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  
  //POST request from search goes here
  //req should hold the username in the body;
    //take req.body and then feed that into a get request to the github API
      //github api will then send a response with the user's repos. This should be an array of objects like in data.json
        //Take the array from the response body and then save it to the database,
  //Start a get using express
  //Create a new promise to deal with app.get async
  
  db.checkForUser(req.body.username).then((userData) =>{

    if(userData.length === 0) {

      helper.getReposByUsername(req.body.username).then((response) => {
      res.status(200);
      db.save(JSON.parse(response));
      res.end();
      }).catch((error) =>{
        res.end();
      })
      // res.end();
      return;
    }
    res.status(200);
    res.end();
  // })
  });


  
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.find().then((results) => {
    res.status(200);
    res.send(JSON.stringify(results));
    res.end();
  });
});


let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

