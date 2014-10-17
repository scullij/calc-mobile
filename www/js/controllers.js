angular.module('starter.controllers', [])

.controller('HistoryCtrl', function($scope, $localstorage) {
  $scope.bookings = $localstorage.getArray('bookings');
  $scope.bookings = _.sortBy($scope.bookings, function(book){ return -book.time; });
  console.log($scope.bookings);
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('BookingCtrl', function($scope, $state, $stateParams, $ionicPopup, $localstorage, SiteData, Booking, Popup) {

  $scope.book = { type : "create" };

  if( $stateParams.id ){
    $scope.book = Booking.find($stateParams.id);
    console.log(JSON.stringify($scope.book) + "!!!");
  }

  SiteData.load().success(function(data){
    $scope.companies = data.Zonas[0].Empresas;
    /*$scope.book.company = $scope.companies[0];
    $scope.book.branch = $scope.companies[0].Recorridos[0];
    $scope.book.way = "Ida";
    $scope.book.day = "Hoy";
    $scope.book.stop = $scope.book.branch[$scope.book.way].Paradas[0][2];
    $scope.book.hour = $scope.book.branch[$scope.book.way].Horarios[0];*/
  }).
  error(function(data, status, headers, config) {
    console.log("ERROR: " + data);
  });

  $scope.create = function(){
    $scope.book.id = new Date().getTime();
    Booking.book( $scope.book ).success(function(data, status, headers, config) {
      Booking.storage($scope.book);
      Popup.booking();
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
