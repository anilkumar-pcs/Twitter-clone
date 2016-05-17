var mongoose = require("mongoose");

module.exports = function(){

	var userSchema = new mongoose.Schema(
		{
			username : String,
			password  : String,
			firstName: String,
            lastName: String,
            email: String,
            roles: [String]
		},
		{
			collection : "user"
		}
	);

	var UserModel = mongoose.model("UserModel",userSchema);

	var api = {
		findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser: createUser,
        removeUser: removeUser,
        updateUser: updateUser,
        // findUserByGoogleId: findUserByGoogleId,
        // findUserByFacebookId: findUserByFacebookId,
        getMongooseModel: getMongooseModel
	};

	return api;

	function findUserByCredentials(credentials) {
        return UserModel.findOne(
            {
                username: credentials.username,
                password: credentials.password
            }
        );
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findAllUsers() {
        return UserModel.find();
    }

    function createUser(user) {
        return UserModel.create(user);
    }

    function removeUser(userId) {
        return UserModel.remove({_id: userId});
    }

    function updateUser(userId, user) {
        return UserModel.update({_id: userId}, {$set: user});
    }

    function getMongooseModel() {
        return UserModel;
    }

};