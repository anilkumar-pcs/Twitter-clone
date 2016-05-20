(function()
{
    angular
        .module("PassportApp")
        .controller('OtherProfileCtrl', OtherProfileCtrl);
    
    function OtherProfileCtrl($scope, $routeParams, PostService)
    {
        //init
        $scope.otherUser = $routeParams.username;

        $scope.getUserPosts = function(){
            PostService.findPostsByUser($routeParams.username)
            .then(
                function(response){
                    $scope.posts = response.data;
                    $scope.count = response.data.length;
                },
                function(err){
                    $scope.error = err;
                }
            )
        }
    }
})();
