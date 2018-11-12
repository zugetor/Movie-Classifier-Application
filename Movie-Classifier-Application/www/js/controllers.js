angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal) {})

  .controller('HomeCtrl', function ($scope, $ionicModal, $http) {
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
    }
    }

  })

  .controller('FavoriteCtrl', function ($scope, $ionicModal) {})

  .controller('ProfileCtrl', function ($scope, $ionicModal) {})

  .controller('ShowmovieCtrl', function ($scope, $ionicModal) {})

  .controller('BoxofficeCtrl', function ($scope, $ionicModal) {})
