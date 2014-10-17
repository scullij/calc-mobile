SERVICES_PATH = "http://localhost:3000";

angular.module('starter.services', [])

.factory('SiteData', function($http){

  return {

    load: function(){
      return $http({method: 'GET', url: SERVICES_PATH + '/sitio.data'});
    }
  }

})

.factory('Booking', function($http, $localstorage, User){

  return {

    book: function( book ){

      var user = User.get();

      var data = {
        id : book.id,
        type: book.type,
        empresa: book.company.NombreParam,
        ramal: book.branch.Descripcion,
        recorrido: book.way,
        parada: book.stop,
        dia: book.day,
        horario: book.hour,
        nombre: user.name,
        email: user.email,
        telefono: user.telephone
      };

      return $http.post(SERVICES_PATH + '/' + data.empresa + "/reservar", data);
    },

    find : function(id){
      return $localstorage.find("bookings", id);
    },

    storage : function( book ){
      book.company = book.company.NombreParam;
      book.branch = book.branch.Descripcion;
      $localstorage.push('bookings', angular.copy(book) );
    }

  }

})

.factory('User', function($localstorage){

  return {

    get : function(){
      return $localstorage.getObject("user");
    },

    validate: function(){
      var user = this.get();
      return user && user.name && user.email && user.telephone;
    }
  }

});
