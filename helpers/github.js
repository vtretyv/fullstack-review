const request = require('request');
const config = require('../config.js');
const Promise = require('bluebird');


let getReposByUsername = (user) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/' + user + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  
  return new Promise((resolve,reject) => {
              console.log('in the promise');
              request(options,(err,response,body)=>{
                resolve(body);
              });
            })

    
}

module.exports.getReposByUsername = getReposByUsername;