const oauthService = require("./auth.service");


// Controller code which orchestrates the overall process
// It calls the service functions where the business logic is present
function oauthProcessor(code, done) {
  oauthService.getGithubAccessToken(code, (err, token) => {
    if (err) {
      done(err)
    } else {
      done(null, token)
    }
  })
  /**
   * 
   * Get the access token for the logged in user
   * 
   */

}

module.exports = {
  oauthProcessor
};