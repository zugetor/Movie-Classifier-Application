angular.module('starter.controllers', [])

	.controller('AppCtrl', function ($scope, $ionicModal) {
	})

	.controller('HomeCtrl', function ($scope, $http) {
		$scope.errorResult = "";
		$scope.hideorshow2 = "ng-hide";
		$scope.searchtext = "";
		$scope.searchlist = "";
		$scope.hideorshow = "ng-show";
		$scope.searchMovie = function () {
			if (this.searchtext != "") {
				var SearchUrl = "https://www.omdbapi.com/?Type=Movie&page=1&apikey=32b0c1e3&s=" + this.searchtext;
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
			$scope.startUpload(document.getElementById('warp').files);
			document.getElementById('warp').file = "";
		}
		$scope.startUpload = function (files) {
			var data = files[0];
			/*$.each(files, function(key, value)
			{
				data.append("files", value);
			});*/
			var config = {
					headers : {
						'Content-Type': 'application/octet-stream',
						'Prediction-Key': 'a34fc7be84d24fbab8c63ef773b3534f'
						}
					}

			$http.post('https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/9adc16ef-c1ed-4f38-b9ff-0eb8ca20649d/image', data, config)
			.success(function (data, status, headers, config) {
				$scope.hideorshow = "ng-hide";
				$scope.hideorshow2 = "ng-show";
				$scope.picresult=data["predictions"][0]["tagName"];
				if($scope.picresult=="Terminator"){
					$scope.resultMovie="img/termi.jpg";
				}
				else if($scope.picresult=="Back2TheFuture"){
					$scope.resultMovie="img/back2.jpg";
				}
				else if($scope.picresult=="JurassicPark"){
					$scope.resultMovie="img/juras.jpg";
				}
			});
		}

		$scope.closeresult=function(){
			$scope.hideorshow2 = "ng-hide";
			$scope.Result = "";
			$scope.hideorshow = "ng-show";
			$scope.errorResult = "";
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

	.controller('ShowmovieCtrl', function ($scope, $ionicModal, $state, $stateParams, $http) {
		$scope.seeText = "see more";
		var idmovie = $stateParams.Id;
		var SearchUrl = "https://www.omdbapi.com/?Type=Movie&page=1&apikey=32b0c1e3&plot=full&i=" + idmovie;
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

	.controller('BoxofficeCtrl', function ($scope, $ionicModal) {
		$scope.Day = "SEE ALL"
		$scope.cD = 0;
		$scope.hideD = "";
		$scope.showD = "ng-hide";
		$scope.DD = function () {
			if (this.cD == 0) {
				$scope.cD = 1;
				$scope.Day = "HIDE"
				$scope.hideD = "ng-hide";
				$scope.showD = "";
			} else {
				$scope.cD = 0;
				$scope.Day = "SEE ALL"
				$scope.hideD = "";
				$scope.showD = "ng-hide";
			}
		}
		$scope.Week = "SEE ALL"
		$scope.cW = 0;
		$scope.hideW = "";
		$scope.showW = "ng-hide";
		$scope.WW = function () {
			if (this.cW == 0) {
				$scope.cW = 1;
				$scope.Week = "HIDE"
				$scope.hideW = "ng-hide";
				$scope.showW = "";
			} else {
				$scope.cW = 0;
				$scope.Week = "SEE ALL"
				$scope.hideW = "";
				$scope.showW = "ng-hide";
			}
		}
		$scope.Month = "SEE ALL"
		$scope.cM = 0;
		$scope.hideM = "";
		$scope.showM = "ng-hide";
		$scope.MM = function () {
			if (this.cM == 0) {
				$scope.cM = 1;
				$scope.Month = "HIDE"
				$scope.hideM = "ng-hide";
				$scope.showM = "";
			} else {
				$scope.cD = 0;
				$scope.Month = "SEE ALL"
				$scope.hideM = "";
				$scope.showM = "ng-hide";
			}
		}
	})