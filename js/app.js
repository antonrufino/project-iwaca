'use strict';

(() => {
    angular.module('app', [])
    .controller('LexerController', ['$scope', 'lexer', ($scope, lexer) => {
        $scope.lexemes = [];
        $scope.sourceCode = '';
        $scope.interpret = () => {
            lexer($scope.sourceCode, $scope.lexemes).analyze();
        }
    }]);
})();
