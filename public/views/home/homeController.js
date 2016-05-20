(function()
{
    angular
        .module("PassportApp")
        .controller("HomeController", HomeController);
    
    function HomeController($scope,$rootScope,$location,PostService)
    {
    	//init() --- load all posts
    	$scope.getAllPosts = function(){
    		//if user logged in
    		if($rootScope.currentUser){
    			PostService.findAllPosts()
    			.then(
    				function(response){
    					$scope.posts = response.data;
    				},
    				function(err){
    					$scope.error = err;
    				}
    			)
    		}
    	}

    	//on post submit

    	var newPost = {created_by:'',text:'',created_at:''};

    	$scope.post = function(){    		
    		newPost.created_by = $rootScope.currentUser.username;
    		newPost.created_at = Date.now();
    		newPost.text = $scope.text;

    		if(!newPost.text || newPost.text === '')
    			return;

    		PostService.createPost(newPost)
    		.then(
    			function(post){
    				$scope.getAllPosts();
    			},
				function(err){
					$scope.error = err;
				}
    		);

    		$scope.text = '';
    	}

        //goTo user profile
        $scope.goTo = function(username){
            $location.url("/profile/"+username);
        }
    }
})();