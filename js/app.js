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

  $routeProvider.when('/confirma', {
    templateUrl: 'tpls/confirma.html',
    controller: 'ConfirmaController'
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

  $scope.hayMasAsistentes = function () {
    $scope.respuesta.asistentes = range($scope.respuesta.otrosAsistentes).map(function () {
      return Asistente();
    });
  };

  $scope.enviar = function () {
    $scope.enviando = true;
    $http.post('http://bodaguille.herokuapp.com/respuesta/', $scope.respuesta).then(success, error);
  };
});

app.run(function ($rootScope) {
  $rootScope.range = range;
});