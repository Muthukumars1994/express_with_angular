//here angular controller is going to take part
angular.module('todoController', ['todoservice'])
.controller('maincontroller', function($scope, $http, user, $state){
   //declaring the data in the empty hash
       console.log("calling the services inside Main controller", user);
           $scope.formdata = {};
              user.get().success(function(data){
                //shows the how many number of users present in the db
                  $scope.user = data;
                //count the number of users
                 $scope.count = data.length;
      });
      //error hander is used but called the get service
      user.get().error(function(data){
          console.log("error occured in get method");
      });
   //this is the just normal available group display
      user.display_group().success(function(data){
              console.log("group details", data);
          $scope.group = data;
      });
      user.active_users().success(function(data){
              console.log(data);
        $scope.active_users = data;
        $scope.active_users_count = data.length;
      });

$scope.registerUser = function(){
           //create todo check whether the formdata is recieved or not
      if($scope.formdata.name && $scope.formdata.password && $scope.formdata.mobile && $scope.formdata.email !== undefined){
        user.create($scope.formdata).
            success(function (data) {
              console.log("data==> from angular create function", data);
                       $scope.formdata = {};//clear the todo list
                       $scope.userDetails = data;//new todos
                  });
              }
    };
$scope.loginUser = function(){
  console.log($scope.formdata);
    user.login($scope.formdata).success(function(data){
     console.log("just an formdata from the login",$scope.formdata);
       $scope.formdata = {};
           $scope.user = data;
        //checking the json response with error flag with communicating api
                    if(!$scope.user.error){
                         console.log($scope.user);
                           $state.go("users");
                           $scope.formdata = {};
                              console.log("loggged in");
                             }
                       else{alert("not an valid credential");}
            //empty the form data after click event passed
      });
    };
    $scope.test = function(group){
          console.log("test function", group);
    };
    $scope.userDetails_scope = function(getvals){
        //this is just used to navigate to different state
        $state.go("list",{'getval': getvals});
    };
})
.controller('subcontroller', function($scope, $stateParams){
          console.log($stateParams);
    $scope.datagot= $stateParams.getval;
}).controller('group_Ctrl', function($scope, $http, $stateParams){
   console.log("group controller",$stateParams);
    console.log($stateParams.id);
    //101 is the participant id
        $http.post('/api/group/show/participants/'+$stateParams.id).success(function(data){
          console.log("group_Ctrl", data);
           $scope.group_participants = data[0].users_doc[0];
      });
});
