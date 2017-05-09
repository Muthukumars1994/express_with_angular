//service which is going to be communicate between api from express
console.log("angular service");
//services are the first to get form the routes
angular.module('todoservice', [])

  .factory('user', ['$http', function($http){
   //service for getting http service can be called in the controller using method
 return{
          get: function() {
                console.log("inside service get function");
              return $http.get('/api/todos');
          },
        //very essential to pass a data in the function overloading
          create: function(data){
               console.log("data is passing==>", data);
               //just adding the over loaded data to the route postmethod
                return $http.post('/api/todos', data);
          },
          login: function(data){
            console.log("login service");
            return $http.post('/api/login', data);
          }
        }
  }]);