(function () {

  function MainService($resource) {


    var self = this;

    return self;
  }

  angular.module('eliApp')
    .service('MainService', ['$resource',MainService])
}());