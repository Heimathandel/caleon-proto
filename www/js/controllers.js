angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $ionicLoading) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    ionic.Platform.ready(function () {
    });
    /*PUBLIC VARIABLES*/
    // Form data for the login modal
    $scope.loginData = {};
    //Testcredentials Napto
    $scope.loginData.mail = "test@test.de";
    $scope.loginData.password = "11111111";
    $scope.loginData.sensorID = "0";
    //
    $scope.currentTemperature = 25;
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };
    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);
      $ionicLoading.show({
        template: '<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner>'
      });
      // will execute when device is ready, or immediately if the device is already ready.
      // Start Nabto and login as guest
      nabto.startup(function () {
        // Make a Nabto request to a device
        var url = 'nabto://demo.nabto.net/house_temperature.json?sensor_id=' + $scope.loginData.sensorID;

        //try access napto plugin (Android, iOS)
        try {
          nabto.fetchUrl(url, function (status, result) {
            // Print out the response
            if (!status && result.response) {
              $scope.currentTemperature = result.response.temperature;
            }
            $ionicLoading.hide();
            $scope.closeLogin();
          });
        } catch(e){
          $ionicLoading.hide();
          $scope.closeLogin();
        }
      });
    };
  })
  .controller('RemoteCtrl', function ($scope) {
    var minTemp = 18, maxTemp = 28;
    //public variables
    $scope.isHeating = true;
    $scope.isHoliday = false;
    $scope.targetTemperature = 23.5;

    $scope.switchHoliday = function () {
      $scope.isHoliday = !$scope.isHoliday;
    };
    $scope.switchHeating = function () {
      $scope.isHeating = !$scope.isHeating;
    };

    $scope.decreaseTemperature = function () {
      $scope.targetTemperature > minTemp ? $scope.targetTemperature -= 0.5 : null;
    };
    $scope.increaseTemperature = function () {
      $scope.targetTemperature < maxTemp ? $scope.targetTemperature += 0.5 : null;
    };
  });
