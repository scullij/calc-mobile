angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    push : function(key, value){
      var val = JSON.parse($window.localStorage[key] || '[]');
      if( val ) val.push( JSON.stringify(value) )
      else val = [ JSON.stringify(value) ];
      $window.localStorage[key] = JSON.stringify(val);
    },
    getArray : function(key){
      var val = JSON.parse($window.localStorage[key] || '[]');
      var arr = [];
      for( i in val ){
        arr.push( JSON.parse( val[i] ) );
      }
      return arr;
    }
  }
}]);
