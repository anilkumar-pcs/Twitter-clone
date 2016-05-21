var mongoose = require("mongoose");

module.exports = function(){

	var postSchema = new mongoose.Schema(
		{
			created_by : String,
			created_at  : {type: Date, default: Date.now},
			text : String,
			favorited_by : [{ type : mongoose.Schema.Types.ObjectId, ref: 'UserModel' }]
		},
		{
			collection : "post"
		}
	);

	var PostModel = mongoose.model("PostModel",postSchema);

	var api = {
		findAllPosts : findAllPosts,
		findPostsByUser : findPostsByUser,
		createPost : createPost,
		deletePost : deletePost,
		updatePost : updatePost,
		findFavoritedUsers : findFavoritedUsers,
		MarkFavorite : MarkFavorite,
		MarkUnFavorite : MarkUnFavorite
	};

	return api;

	function findAllPosts(){
		return PostModel.find();
	}

	function findPostsByUser(username){
		return PostModel.find({created_by:username});
	}

	function createPost(post){
		return PostModel.create(post);
	}

	function deletePost(postId){
		return PostModel.remove({_id:postId});
	}

	function updatePost(postId,post){
		return PostModel.update({_id:postId}, {$set:post});
	}
	function findFavoritedUsers(postId){
		return PostModel.find({_id:postId}).select('favorited_by');
	}
	function MarkFavorite(postId,user){
		//return PostModel.update({_id:postId},{$push : {favorited_by : user}},{upsert : true,new : true});
		return PostModel.update({_id:postId},{$addToSet : {favorited_by : user}});		
	}
	function MarkUnFavorite(postId,user){
		//console.log("user : "+user);
		return PostModel.update({_id:postId},{$pull : {favorited_by : user._id}});
	}

}