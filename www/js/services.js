SERVICES_PATH = "http://localhost:3000";

angular.module('starter.services', [])

.factory('SiteData', function($http){

  return {

    load: function(){
      return $http({method: 'GET', url: SERVICES_PATH + '/sitio.data'});
    }
  }

})

.factory('Booking', function($http, $localstorage){

  return {

    book: function( book ){

      //(req.body.type != "create" && req.body.type != "modify" && req.body.type != "cancel") ||
      var user = $localstorage.getObject("user");

      var data = {
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

      console.log(JSON.stringify(data));

      return $http.post(SERVICES_PATH + '/' + book.company.NombreParam + "/reservar", data);
    }
  }

});
