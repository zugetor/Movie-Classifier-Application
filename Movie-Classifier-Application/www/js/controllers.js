angular
  .module("starter.controllers", [])

  .controller("AppCtrl", function($scope, $ionicModal) {})

  .controller("HomeCtrl", function($scope, $state, $http) {
    $scope.errorResult = "";
    $scope.hideorshow2 = "ng-hide";
    $scope.searchtext = "";
    $scope.searchlist = "";
    $scope.hideorshow = "ng-show";
    $scope.searchMovie = function() {
      if (this.searchtext != "") {
        var SearchUrl =
          "https://www.omdbapi.com/?Type=Movie&page=1&apikey=32b0c1e3&s=" +
          this.searchtext;
        $http.get(SearchUrl).then(function(response) {
          $scope.searchlist = response.data;
          console.log($scope.searchlist);
          $scope.Result = $scope.searchlist["Search"];
          $scope.hideorshow = "ng-hide";
          if ($scope.searchlist["Response"] == "False") {
            $scope.errorResult = $scope.searchlist["Error"];
          }
        });
      } else {
        $scope.Result = "";
        $scope.hideorshow = "ng-show";
      }
    };
    $scope.isEmpx = function() {
      if (this.searchtext == "") {
        $scope.Result = "";
        $scope.hideorshow = "ng-show";
        $scope.errorResult = "";
      }
    };
    var uploadForm = document.getElementById("Warp");
    $scope.insertPic = function() {
      document.getElementById("warp").click();
    };

    $scope.findWarp = function() {
      $scope.startUpload(document.getElementById("warp").files);
      document.getElementById("warp").file = "";
    };
    $scope.startUpload = function(files) {
      var data = files[0];
      /*$.each(files, function(key, value)
			{
				data.append("files", value);
			});*/
      var config = {
        headers: {
          "Content-Type": "application/octet-stream",
          "Prediction-Key": "a34fc7be84d24fbab8c63ef773b3534f"
        }
      };

      $http
        .post(
          "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/679fb075-7a66-41d7-9507-3f08ae6b47a2/image",
          data,
          config
        )
        .success(function(data, status, headers, config) {
          $scope.picresult = data["predictions"][0]["tagName"];
          if ($scope.picresult == "Holy Fucking Shit Its a Dinosaur") {
				$state.go('app.showmovie', {Id: "tt0107290"});
          } else if ($scope.picresult == "Stand by Me Doraemon") {
				$state.go('app.showmovie', {Id: "tt3331846"});
          } else if ($scope.picresult == "Doraemon Nobita no Takarajima") {
				$state.go('app.showmovie', {Id: "tt8098546"});
          } else if ($scope.picresult == "Ralph Breaks the Internet") {
				$state.go('app.showmovie', {Id: "tt5848272"});
          } else if ($scope.picresult == "Back To The Future") {
				$state.go('app.showmovie', {Id: "tt0088763"});
          } else if ($scope.picresult == "The Terminator") {
				$state.go('app.showmovie', {Id: "tt0088247"});
          } else if ($scope.picresult == "Fantastic Beasts The Crimes of Grindelwald") {
				$state.go('app.showmovie', {Id: "tt4123430"});
          } else if ($scope.picresult == "Purple Sweet Potato") {
				$state.go('app.showmovie', {Id: "tt4154756"});
          } else if ($scope.picresult == "Ready Player One") {
				$state.go('app.showmovie', {Id: "tt1677720"});
          }
        });
    };

    $scope.closeresult = function() {
      $scope.hideorshow2 = "ng-hide";
      $scope.Result = "";
      $scope.hideorshow = "ng-show";
      $scope.errorResult = "";
    };
  })

  .controller("FavoriteCtrl", function($scope, $ionicModal) {
    var fav = {
      Search: [
        {
          Title: "Star Wars: The Last Jedi",
          Year: "2017",
          imdbID: "tt2527336",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg"
        },
        {
          Title: "Star Trek: Beyond",
          Year: "2016",
          imdbID: "tt2660888",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BZDRiOGE5ZTctOWIxOS00MWQwLThlMDYtNWIwMDQwNzBjZDY1XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
        },
        {
          Title: "Solo: A Star Wars Story",
          Year: "2018",
          imdbID: "tt3778644",
          Type: "movie",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BOTM2NTI3NTc3Nl5BMl5BanBnXkFtZTgwNzM1OTQyNTM@._V1_SX300.jpg"
        },
        {
          Poster:
            "https://m.media-amazon.com/images/M/MV5BMjMxOTM1OTI4MV5BMl5BanBnXkFtZTgwODE5OTYxMDI@._V1_SX300.jpg",
          Title: "Fantastic Beasts and Where to Find Them",
          Type: "movie",
          Year: "2016",
          imdbID: "tt3183660"
        }
      ]
    };
    $scope.favlist = fav["Search"];
    $scope.delfav = function(item) {
      $scope.favlist.splice(item, 1);
    };
  })

  .controller("ShowmovieCtrl", function(
    $scope,
    $ionicModal,
    $state,
    $stateParams,
    $http
  ) {
    $scope.seeText = "see more";
    var idmovie = $stateParams.Id;
    var SearchUrl =
      "https://www.omdbapi.com/?Type=Movie&page=1&apikey=32b0c1e3&plot=full&i=" +
      idmovie;
    $http.get(SearchUrl).then(function(response) {
      $scope.moviedetail = response.data;
      console.log($scope.moviedetail);
      $scope.minplot = $scope.moviedetail["Plot"];
      if ($scope.minplot.length > 120) {
        $scope.minplot = $scope.minplot.substr(0, 200);
      } else if ($scope.minplot.length < 5) {
        $scope.seeText = "";
        $scope.minplot = "No plot";
      }
    });
    $scope.seemore = function() {
      if ($scope.seeText == "see more") {
        $scope.minplot = $scope.moviedetail["Plot"];
        $scope.seeText = "see less";
      } else if ($scope.seeText == "see less") {
        $scope.minplot = $scope.minplot.substr(0, 200);
        $scope.seeText = "see more";
      }
    };
  })

  .controller("BoxofficeCtrl", function($scope, $ionicModal) {
    $scope.Day = "SEE ALL";
    $scope.cD = 0;
    $scope.hideD = "";
    $scope.showD = "ng-hide";
    $scope.DD = function() {
      if (this.cD == 0) {
        $scope.cD = 1;
        $scope.Day = "HIDE";
        $scope.hideD = "ng-hide";
        $scope.showD = "";
      } else {
        $scope.cD = 0;
        $scope.Day = "SEE ALL";
        $scope.hideD = "";
        $scope.showD = "ng-hide";
      }
    };
    $scope.Week = "SEE ALL";
    $scope.cW = 0;
    $scope.hideW = "";
    $scope.showW = "ng-hide";
    $scope.WW = function() {
      if (this.cW == 0) {
        $scope.cW = 1;
        $scope.Week = "HIDE";
        $scope.hideW = "ng-hide";
        $scope.showW = "";
      } else {
        $scope.cW = 0;
        $scope.Week = "SEE ALL";
        $scope.hideW = "";
        $scope.showW = "ng-hide";
      }
    };
    $scope.Month = "SEE ALL";
    $scope.cM = 0;
    $scope.hideM = "";
    $scope.showM = "ng-hide";
    $scope.MM = function() {
      if (this.cM == 0) {
        $scope.cM = 1;
        $scope.Month = "HIDE";
        $scope.hideM = "ng-hide";
        $scope.showM = "";
      } else {
        $scope.cD = 0;
        $scope.Month = "SEE ALL";
        $scope.hideM = "";
        $scope.showM = "ng-hide";
      }
    };

    var box = {
      Daily: [
        {
          Title: "Ralph Breaks the Internet",
          imdbID: "tt5848272",
          Gross: "$4,842,000",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BMTYyNzEyNDAzOV5BMl5BanBnXkFtZTgwNTk3NDczNjM@._V1_UX182_CR0,0,182,268_AL_.jpg"
        },
        {
          Title: "The Grinch (2018)",
          imdbID: "tt2709692",
          Gross: "$4,745,000",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BYmE5Yjg0MzktYzgzMi00YTFiLWJjYTItY2M5MmI1ODI4MDY3XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg"
        },
        {
          Title: "Creed II",
          imdbID: "tt6343314",
          Gross: "$2,807,044",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BMTcxMjUwNjQ5N15BMl5BanBnXkFtZTgwNjk4MzI4NjM@._V1_UX182_CR0,0,182,268_AL_.jpg"
        },
        {
          Title: "Fantastic Beasts: The Crimes of Grindelwald",
          imdbID: "tt4123430",
          Gross: "$1,885,000",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BZjFiMGUzMTAtNDAwMC00ZjRhLTk0OTUtMmJiMzM5ZmVjODQxXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UX182_CR0,0,182,268_AL_.jpg"
        }
      ],
      Weekly: [
        {
          Title: "Ralph Breaks the Internet",
          imdbID: "tt5848272",
          Gross: "$31,179,652",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BMTYyNzEyNDAzOV5BMl5BanBnXkFtZTgwNTk3NDczNjM@._V1_UX182_CR0,0,182,268_AL_.jpg"
        },
        {
          Title: "The Grinch (2018)",
          imdbID: "tt2709692",
          Gross: "$22,505,980",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BYmE5Yjg0MzktYzgzMi00YTFiLWJjYTItY2M5MmI1ODI4MDY3XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg"
        },
        {
          Title: "Creed II",
          imdbID: "tt6343314",
          Gross: "$21,813,113",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BMTcxMjUwNjQ5N15BMl5BanBnXkFtZTgwNjk4MzI4NjM@._V1_UX182_CR0,0,182,268_AL_.jpg"
        },
        {
          Title: "Fantastic Beasts: The Crimes of Grindelwald",
          imdbID: "tt4123430",
          Gross: "$15,261,118",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BZjFiMGUzMTAtNDAwMC00ZjRhLTk0OTUtMmJiMzM5ZmVjODQxXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UX182_CR0,0,182,268_AL_.jpg"
        }
      ],
      Monthly: [
        {
          Title: "The Grinch (2018)",
          imdbID: "tt2709692",
          Gross: "$189,701,630",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BYmE5Yjg0MzktYzgzMi00YTFiLWJjYTItY2M5MmI1ODI4MDY3XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg"
        },
        {
          Title: "Bohemian Rhapsody",
          imdbID: "tt1727824",
          Gross: "$158,596,078",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BNDg2NjIxMDUyNF5BMl5BanBnXkFtZTgwMzEzNTE1NTM@._V1_UX182_CR0,0,182,268_AL_.jpg"
        },
        {
          Title: "Fantastic Beasts: The Crimes of Grindelwald",
          imdbID: "tt4123430",
          Gross: "$126,218,738",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BZjFiMGUzMTAtNDAwMC00ZjRhLTk0OTUtMmJiMzM5ZmVjODQxXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UX182_CR0,0,182,268_AL_.jpg"
        },
        {
          Title: "Ralph Breaks the Internet",
          imdbID: "tt5848272",
          Gross: "$99,287,160",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BMTYyNzEyNDAzOV5BMl5BanBnXkFtZTgwNTk3NDczNjM@._V1_UX182_CR0,0,182,268_AL_.jpg"
        }
      ]
    };
    $scope.boxday = box["Daily"];
    $scope.boxweek = box["Weekly"];
    $scope.boxmonth = box["Monthly"];
  });
