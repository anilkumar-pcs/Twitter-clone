var mongoose = require("mongoose");

module.exports = function(app){

	var postModel = require("../models/postModel.js")();

	var auth = authorized;

	app.post("/api/post", auth, createPost);
	app.put("/api/post/:id", auth, updatePost);
	app.delete("/api/post/:id", auth, deletePost);
	app.get("/api/post", auth, findAllPosts);
	app.get("/api/post/:username", auth, findPostsByUser);

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

}