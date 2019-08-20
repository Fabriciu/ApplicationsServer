  
var app = angular.module('app', []);

function mainController($scope, $http) {
  app.controller('mainController', function($scope, $http) {

    $scope.listUsers = function() {

      $http({
        method: "GET",
        url: "http://localhost:3000/authorization"
      }).then(function success(response){
        $http({
          method: "GET",
          url: "http://localhost:8080/users/mostFollowed",
          params: {count: 5},
          headers: {
            'Authorization': 'Bearer 43f9deb68fbd46c0b76c5387ee930595|632995c35c074d8db971b3ad49d6edf0'
          }
        }).then(function success(response_){
          $scope.usersList = response_.data.users;
        }, function error(response_){
          console.log(response_)
        });
      }, function error(response_){
        console.log(response_)
      });
    };

    $scope.resetUsers = function() {

      $scope.usersList = "";
      
    };

    $scope.listTweetsPerHour = function() {

      $http({
        method: "GET",
        url: "http://localhost:3000/authorization"
      }).then(function success(response){
        $http({
          method: "GET",
          url: "http://localhost:8080/tweets/count",
          params: {filter: 'perHour'},
          headers: {
            'Authorization': 'Bearer ' + response.data
          }
        }).then(function success(response_){
          $scope.tweetsPerHourList = response_.data.tweets;
        }, function error(response){
          console.log(response_)
        });
      }, function error(response){
        console.log(response_)
      });
    };

    $scope.resetTweetsPerHour = function() {

      $scope.tweetsPerHourList = "";
      
    };

    $scope.listTweetsPerHashtag = function() {

      $http({
        method: "GET",
        url: "http://localhost:3000/authorization"
      }).then(function success(response){
        $http({
          method: "GET",
          url: "http://localhost:8080/tweets/count",
          params: {filter: 'perHashtagLangAndLocation'},
          headers: {
            'Authorization': 'Bearer ' + response.data
          }
        }).then(function success(response_){
          $scope.tweetsPerHashtagList = response_.data.tweets;
        }, function error(response){
          console.log(response_)
        });
      }, function error(response){
        console.log(response_)
      });
    };

    $scope.resetTweetsPerHashtag = function() {

      $scope.tweetsPerHashtagList = "";
      
    };
  });
}