angular.module('starter.controllers', [])

.controller('HistoryCtrl', function($scope, $localstorage) {
  $scope.bookings = $localstorage.getArray('bookings');
  console.log($scope.bookings);
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('BookingCtrl', function($scope, $state, $ionicPopup, $localstorage, SiteData, Booking) {

  SiteData.load().success(function(data){
    $scope.companies = data.Zonas[0].Empresas;
    $scope.book.company = $scope.companies[0];
    $scope.book.branch = $scope.companies[0].Recorridos[0];
    $scope.book.way = "Ida";
    $scope.book.day = "Hoy";
    $scope.book.stop = $scope.book.branch[$scope.book.way].Paradas[0][2];
    $scope.book.hour = $scope.book.branch[$scope.book.way].Horarios[0];
  }).
  error(function(data, status, headers, config) {
    console.log("ERROR: " + data);
  });

  $scope.book = { type : "create" };

  $scope.create = function(){
    Booking.book( $scope.book ).success(function(data, status, headers, config) {
      $localstorage.push('bookings', angular.copy($scope.book) );
      $ionicPopup.alert({
        title: 'Reserva Generada!',
        template: 'Podes seguir el estado de tus reserva en la pestaña historial!'
      }).then(function(res) {
        $state.go('tab.history');
      });
    }).error(function(data, status, headers, config){
      console.log("ERROR! " + data + " ----- " + status + JSON.stringify(config) );
    });
  };

})

.controller('AccountCtrl', function($scope, $localstorage) {

  $scope.user = $localstorage.getObject("user");

  $scope.save = function(){

    $localstorage.setObject("user", $scope.user);

  };

});
