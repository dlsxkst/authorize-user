const axios = require('axios');
const config = require("../config");

// function to get the access token
function getGithubAccessToken(code, done) {
  const body = {
    client_id: config.CLIENT_ID,
    client_secret: config.CLIENT_SECRET,
    code,
  }

  const opts = {
    headers: {
      accept: 'application/json'
    }
  }

  axios.post('https://github.com/login/oauth/access_token', body, opts)
    .then((response) => response.data.access_token)
    .then((token) => {
      done(null, token)
    })
    .catch((err) => {
      done({
        err: err.message
      })
    })
}


// Function to get the user profile for the token provided
// function getAccessTokenOfUser(token, done) {
//   // Github APIs are authenticated and we have to share the token in headers
//   // The token is same as what we recieved in the previous step
// }

// Function to get the user profile for the token provided
function getAccessTokenOfUser(token, done) {
  // Github APIs are authenticated and we have to share the token in headers
  // The token is same as what we recieved in the previous step

  // Create an options object with the headers and the URL
  var options = {
    headers: {
      'Authorization': 'token ' + token,
      'User-Agent': 'Your app name'
    },
    url: 'https://api.github.com/user'
  };

  // Use axios to make a GET request with the options
  axios.get(options.url, options.headers)
    .then((response) => {
      // Get the access token from the response data
      var accessToken = response.data.access_token;
      // Call the callback function with the access token
      done(null, accessToken);
    })
    .catch((error) => {
      // Call the callback function with an error
      done(error);
    });
}


module.exports = {
  getGithubAccessToken,
  getAccessTokenOfUser
}