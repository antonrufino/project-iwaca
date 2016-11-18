'use strict';

(() => {
    angular.module('app', [])
    .controller('InterpreterController', ['$scope', 'lexer', 'parser',
        ($scope, lexer, parser) => {
            $scope.lexemeTable = [];
            $scope.symbolTable = {}
            $scope.sourceCode = '';
            $scope.interpret = () => {
                lexer($scope.sourceCode, $scope.lexemeTable);
                parser($scope.lexemeTable, $scope.symbolTable);
            }
        }
    ]);
})();
