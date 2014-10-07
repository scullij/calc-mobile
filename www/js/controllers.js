angular.module('starter.controllers', [])

.controller('BookingCtrl', function($scope, SiteData) {

  SiteData.load().success(function(data){
      $scope.companies = data.Zonas[0].Empresas;
  });

  $scope.book = function(){
    //Bookings.create();
  };

})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope, $localstorage) {

  $scope.user = $localstorage.getObject("user");

  $scope.save = function(){

    $localstorage.setObject("user", $scope.user);

  };

});
