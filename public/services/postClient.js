(function(){
    angular
        .module("PassportApp")
        .factory("PostService", PostService);

    function PostService($http) {
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
            return $http.get("/api/post");
        }

        function findPostsByUser(username){
            return $http.get("/api/post/"+username);
        }

        function createPost(post){
            return $http.post("/api/post",post);
        }

        function deletePost(postId){
            return $http.delete("/api/post"+postId);
        }

        function updatePost(postId,post){
            return $http.put("/api/post"+postId,post);
        }
        function findFavoritedUsers(postId){
            return $http.get("/api/post/favorite/"+postId);
        }
        function MarkFavorite(postId,user){
            return $http.post("/api/post/favorite/"+postId,{user:user});
        }
        function MarkUnFavorite(postId,user){
            return $http.post("/api/post/unfavorite/"+postId,{user:user});
        }
    }
})();