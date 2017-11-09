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
  // console.log('req.body line 21', req.body);
  // console.log(helper.getReposByUsername(req.body.username));
  // console.log('req.body.username', req.body.username)
  helper.getReposByUsername(req.body.username).then((response) => {
    //console.log('In the then ');
    // console.log('response in the helper promise : ', response);//403 right now, as I don't have api token set up, now have token and still broke D:
    
    res.status(200);
    // console.log('res.statusCode line 31:',res.statusCode);
    db.save(JSON.parse(response));
  }).then((response) =>{
    
    res.send('Hello World');
    res.end(); 
  })
 
    
    
  // })
  
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('in the get yo');
  res.status(200).send(db.find());
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

