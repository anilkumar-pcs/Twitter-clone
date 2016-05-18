module.exports = function(app) {

    var userService = require("./services/userService.js")(app);
    var postService = require("./services/postService.js")(app);

}