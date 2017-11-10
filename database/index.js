const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,//mongoose.Schema.Types.ObjectId,//This or number works
  name: String,
  full_name: String,
  owner: String,
  updated_at: String,
  html_url: String
  //And like 30 more potentially
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  //Save will take in an array of objects that correspond to github repos
  //We should then take those repos and create Repo models with them, and save them
  let newRepo;
  repos.forEach((repo) => {
    newRepo = new Repo({
     id: repo.id,
     name: repo.name,
     full_name:repo.full_name,
     owner: repo.owner.login,
     updated_at: repo.updated_at,
     html_url: repo.html_url
    });//Repo will be an object with all the correct key values
    newRepo.save((err,data)=>{
      if(err) {return console.log(err);}
    }); //Save the new repo model to the mongo db
  });
}

//Function to take the latest 25 repos and return them
let find = () => {
  return new Promise((resolve, reject) => {
    // console.log('in the find promise')
    resolve(Repo.find().sort({updated_at:1}).limit(25));
  })
};

let checkForUser = (user) => {
  return new Promise((resolve,reject) => {
    resolve(Repo.find({owner:{'$regex':user}}));
  });
  // if (Repo.find()
}
module.exports.save = save;
module.exports.find = find;
module.exports.checkForUser = checkForUser;
