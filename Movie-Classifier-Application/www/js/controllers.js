angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal) {})

  .controller('HomeCtrl', function ($scope, $ionicModal, $http,$state, $stateParams) {
    $scope.errorResult="";
    $scope.searchtext = "";
    $scope.searchlist="";
    $scope.hideorshow="ng-show";
    $scope.searchMovie = function () {
        if(this.searchtext!=""){
        var SearchUrl="https://www.omdbapi.com/?Type=Movie&page=1&apikey=BanMePlz&s="+this.searchtext;
        $http.get(SearchUrl)
        .then(function (response) {
          $scope.searchlist = response.data;
          console.log($scope.searchlist);
          $scope.Result=$scope.searchlist["Search"];
          $scope.hideorshow="ng-hide";
          if($scope.searchlist["Response"]=="False"){
            $scope.errorResult=$scope.searchlist["Error"];
          }
        });
    }
    else{
        $scope.Result="";
        $scope.hideorshow="ng-show";
    }
    }
    $scope.isEmpx=function(){
      if(this.searchtext==""){
        $scope.Result="";
        $scope.hideorshow="ng-show";
        $scope.errorResult="";
    }
    }

  })

  .controller('FavoriteCtrl', function ($scope, $ionicModal) {})

  .controller('ProfileCtrl', function ($scope, $ionicModal) {})

  .controller('ShowmovieCtrl', function ($scope, $ionicModal,$state, $stateParams, $http) {
    $scope.seeText="see more";
    var idmovie=$stateParams.Id;
    var SearchUrl="https://www.omdbapi.com/?Type=Movie&page=1&apikey=BanMePlz&plot=full&i="+idmovie;
        $http.get(SearchUrl)
        .then(function (response) {
          $scope.moviedetail = response.data;
          console.log($scope.moviedetail);
          $scope.minplot=$scope.moviedetail["Plot"];
          if($scope.minplot.length>100){
            $scope.minplot=$scope.minplot.substr(0,200);
          }
          else{
            $scope.seeText="";
            $scope.minplot="No plot"
          }
          
        });
    $scope.seemore=function(){
      if($scope.seeText=="see more"){
      $scope.minplot=$scope.moviedetail["Plot"];
      $scope.seeText="see less";
      }
      else if($scope.seeText=="see less"){
        $scope.minplot=$scope.minplot.substr(0,200);
        $scope.seeText="see more";
      }
    }
  })

  .controller('BoxofficeCtrl', function ($scope, $ionicModal) {})
