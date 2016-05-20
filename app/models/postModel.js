var mongoose = require("mongoose");

module.exports = function(){

	var postSchema = new mongoose.Schema(
		{
			created_by : String,
			created_at  : {type: Date, default: Date.now},
			text : String
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
		updatePost : updatePost
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

}