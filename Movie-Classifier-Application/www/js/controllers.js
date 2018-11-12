angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal) {})

  .controller('HomeCtrl', function ($scope, $http) {
    $scope.errorResult = "";
    $scope.searchtext = "";
    $scope.searchlist = "";
    $scope.hideorshow = "ng-show";
    $scope.searchMovie = function () {
      if (this.searchtext != "") {
        var SearchUrl = "https://www.omdbapi.com/?Type=Movie&page=1&apikey=BanMePlz&s="+this.searchtext;
        $http.get(SearchUrl)
          .then(function (response) {
            $scope.searchlist = response.data;
            console.log($scope.searchlist);
            $scope.Result = $scope.searchlist["Search"];
            $scope.hideorshow = "ng-hide";
            if ($scope.searchlist["Response"] == "False") {
              $scope.errorResult = $scope.searchlist["Error"];
            }
          });
      } 
      else {
        $scope.Result = "";
        $scope.hideorshow = "ng-show";
      }
    }
    $scope.isEmpx = function () {
      if (this.searchtext == "") {
        $scope.Result = "";
        $scope.hideorshow = "ng-show";
        $scope.errorResult = "";
      }
    }
    var uploadForm = document.getElementById("Warp");
    $scope.insertPic = function () {
      document.getElementById("warp").click();
    }

    $scope.findWarp = function () {
      startUpload(document.getElementById('warp').files);
      document.getElementById('warp').file = "";
    }
    var startUpload = function (files) {
      var data = files[0];
      /*$.each(files, function(key, value)
      {
        data.append("files", value);
      });*/
      $.ajax({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/9adc16ef-c1ed-4f38-b9ff-0eb8ca20649d/image',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false,
        beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
          xhrObj.setRequestHeader("Prediction-Key", "a34fc7be84d24fbab8c63ef773b3534f");
        },
        success: function (data) {
          alert(data["predictions"][0]["tagName"]);
        }
      });
    }

  })

  .controller('FavoriteCtrl', function ($scope, $ionicModal) {
    var fav = {
      "Search": [{
          "Title": "Star Wars: The Last Jedi",
          "Year": "2017",
          "imdbID": "tt2527336",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg"
        },
        {
          "Title": "Star Trek: Beyond",
          "Year": "2016",
          "imdbID": "tt2660888",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BZDRiOGE5ZTctOWIxOS00MWQwLThlMDYtNWIwMDQwNzBjZDY1XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
        },
        {
          "Title": "Solo: A Star Wars Story",
          "Year": "2018",
          "imdbID": "tt3778644",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BOTM2NTI3NTc3Nl5BMl5BanBnXkFtZTgwNzM1OTQyNTM@._V1_SX300.jpg"
        },
        {
          "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxOTM1OTI4MV5BMl5BanBnXkFtZTgwODE5OTYxMDI@._V1_SX300.jpg",
          "Title": "Fantastic Beasts and Where to Find Them",
          "Type": "movie",
          "Year": "2016",
          "imdbID": "tt3183660"
        }
      ]
    }
    $scope.favlist=fav["Search"];
    $scope.delfav=function(item){
  $scope.favlist.splice(item, 1);
    }
  })

  .controller('ProfileCtrl', function ($scope, $ionicModal) {})

  .controller('ShowmovieCtrl', function ($scope, $ionicModal, $state, $stateParams, $http) {
    $scope.seeText = "see more";
    var idmovie = $stateParams.Id;
    var SearchUrl = "https://www.omdbapi.com/?Type=Movie&page=1&apikey=BanMePlz&plot=full&i=" + idmovie;
    $http.get(SearchUrl)
      .then(function (response) {
        $scope.moviedetail = response.data;
        console.log($scope.moviedetail);
        $scope.minplot = $scope.moviedetail["Plot"];
        if ($scope.minplot.length > 120) {
          $scope.minplot = $scope.minplot.substr(0, 200);
        } else if ($scope.minplot.length < 5) {
          $scope.seeText = "";
          $scope.minplot = "No plot"
        }

      });
    $scope.seemore = function () {
      if ($scope.seeText == "see more") {
        $scope.minplot = $scope.moviedetail["Plot"];
        $scope.seeText = "see less";
      } else if ($scope.seeText == "see less") {
        $scope.minplot = $scope.minplot.substr(0, 200);
        $scope.seeText = "see more";
      }
    }
  })

  .controller('BoxofficeCtrl', function ($scope, $ionicModal) {})
