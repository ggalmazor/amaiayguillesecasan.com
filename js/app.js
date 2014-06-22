function range(total) {
  var items = [];
  for (var n = 0; n < total; n++)
    items.push(n);
  return items;
}

function Asistente(principal) {
  var asistente = {
    nombre: '',
    comida: {
      celiaco: false,
      vegetariano: false,
      alergico: false,
      alergias: ''
    }
  };

  if (principal) {
    asistente.autobus = 0;
    asistente.observaciones = '';
    asistente.email = '';
    asistente.telefono = '';
    asistente.otrosAsistentes = 0;
    asistente.asistentes = [];
  }
  return asistente;
}

var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'tpls/home.html'
  });

  $routeProvider.when('/confirma-tu-asistencia', {
    templateUrl: 'tpls/confirma.html',
    controller: 'ConfirmaController'
  });

  $routeProvider.when('/como-llegar', {
    templateUrl: 'tpls/como-llegar.html'
  });

  $routeProvider.when('/moda/:quien', {
    templateUrl: 'tpls/moda.html',
    controller: 'ModaController'
  });

  $routeProvider.when('/moda', {
    templateUrl: 'tpls/moda.html',
    controller: 'ModaController'
  });
  
  $routeProvider.when('/originales', {
    templateUrl: 'tpls/originales.html'
  });

  $routeProvider.otherwise({
    redirectTo: '/'
  });
});

app.controller('ConfirmaController', function ($scope, $http) {
  function success() {
    $scope.enviando = false;
    $scope.success = true;
  };

  function error(err) {
    $scope.enviando = false;
    $scope.error = err;
  };

  $scope.enviando = false;
  $scope.success = false;
  $scope.error = false;
  $scope.respuesta = Asistente(true);

  $scope.haMetidoAlergias = function (persona) {
    persona = persona || $scope.respuesta;
    persona.comida.alergico = persona.comida.alergias !== '';
  };
  
  $scope.setOtrosAsistentes = function(cantidad) {
    $scope.respuesta.otrosAsistentes = cantidad;
    $scope.respuesta.asistentes = range($scope.respuesta.otrosAsistentes).map(function() {
      return Asistente();
    });
  };
  
  $scope.hayOtrosAsistentes = function(cantidad) {
    return $scope.respuesta.otrosAsistentes == cantidad;
  };
  
  $scope.enAutobus = function(cantidad) {
    return $scope.respuesta.autobus == cantidad;
  };
  
  $scope.setEnAutobus = function(cantidad) {
    $scope.respuesta.autobus = cantidad;
  };
  
  $scope.numeros = ['Ninguna', 'Uno', 'Dos', 'Tres', 'Cuatro'];

  $scope.enviar = function () {
    $scope.enviando = true;
    $http.post('http://bodaguille.herokuapp.com/respuesta/', $scope.respuesta).then(success, error);
  };
});

app.controller('ModaController', function ($scope, $routeParams) {
  var max = {
    ellas: 171,
    ellos: 107,
    peques: 58
  };
  $scope.max = max;
  $scope.quien = $routeParams.quien || 'ellas';
  $scope.current = 1;
  $scope.hayMas = function () {
    return $scope.current < max[$scope.quien];
  };
  $scope.hayMenos = function () {
    return $scope.current > 1;
  };
  $scope.siguiente = function () {
    $scope.current++;
  };
  $scope.anterior = function () {
    $scope.current--;
  };
});

app.run(function ($rootScope) {
  $rootScope.range = range;
});