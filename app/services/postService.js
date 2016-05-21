var mongoose = require("mongoose");

module.exports = function(app){

	var postModel = require("../models/postModel.js")();

	var auth = authorized;

	app.post("/api/post", auth, createPost);
	app.put("/api/post/:id", auth, updatePost);
	app.delete("/api/post/:id", auth, deletePost);
	app.get("/api/post", auth, findAllPosts);
	app.get("/api/post/:username", auth, findPostsByUser);

    //for favorite and unfavorite of posts
    app.get("/api/post/favorite/:id", auth, findFavoritedUsers);
    app.post("/api/post/favorite/:id", auth, MarkFavorite);
    app.post("/api/post/unfavorite/:id", auth, MarkUnFavorite);

	function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function createPost(req,res){
    	
    	var newPost = req.body;

    	postModel.createPost(newPost)
    	.then(
    		function(){
    			return postModel.findAllPosts();
    		},
            function(err){
                res.status(400).send(err);
            }
    	)
    	.then(
            function(posts){
                res.json(posts);
            },
            function(){
                res.status(400).send(err);
            }
        )
    }

    function updatePost(req,res){

    	var newPost = req.body;

    	postModel.updatePost(req.params.id, newPost)
    	.then(
            function(post){
                return postModel.findAllPosts();
            },
            function(err){
                res.status(400).send(err);
            }
        )
        .then(
            function(posts){
                res.json(posts);
            },
            function(err){
                res.status(400).send(err);
            }
        );
    }

    function deletePost(req,res){

    	postModel.deletePost(req.params.id)
    	.then(
            function(post){
                return postModel.findAllPosts();
            },
            function(err){
                res.status(400).send(err);
            }
        )
        .then(
            function(posts){
                res.json(posts);
            },
            function(err){
                res.status(400).send(err);
            }
        );

    }

    function findAllPosts(req,res){

    	postModel.findAllPosts()
    	.then(
            function(posts){
                res.json(posts);
            },
            function(err){
                res.status(400).send(err);
            }
        );

    }

    function findPostsByUser(req,res){

    	var username = req.params.username;

    	postModel.findPostsByUser(username)
    	.then(
            function(posts){
                res.json(posts);
            },
            function(err){
                res.status(400).send(err);
            }
        );

    }

    function findFavoritedUsers(req,res){
        var postId = req.params.id;
        postModel.findFavoritedUsers(postId)
        .then(
            function(users){
                res.json(users);
            },
            function(err){
                res.status(400).send(err);
            }
        );
    }

    function MarkFavorite(req,res){
        var postId = req.params.id;
        var user = req.user;
        //console.log("postId : "+postId+" user : "+user.username);
        postModel.MarkFavorite(postId,user)
        .then(
            function(){
                res.status(200).send("OK");
            },
            function(err){
                res.status(400).send(err);
            }
        );
    }

    function MarkUnFavorite(req,res){
        var postId = req.params.id;
        var user = req.user;
        //console.log("postId : "+postId+" user : "+user);
        //console.log("postId : "+postId+" username : "+user.username);
        postModel.MarkUnFavorite(postId,user)
        .then(
            function(){
                res.status(200).send("OK");
            },
            function(err){
                res.status(400).send(err);
            }
        );
    }

}