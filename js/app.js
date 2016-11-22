'use strict';

(() => {
    angular.module('app', [])
    .controller('InterpreterController', ['$scope', 'lexer', 'parser',
        ($scope, lexer, parser) => {
            $scope.lexemeTable = [];
            $scope.symbolTable = {};
            $scope.sourceCode = '';
            $scope.terminal = '';
            $scope.input = '';
            $scope.index = 0;
            $scope.pendingVar = '';

            $scope.init = () => {
                $scope.lexemeTable = [];
                $scope.symbolTable = {};
                $scope.input = '';
                $scope.index = 0;
                $scope.pendingVar = '';

                lexer($scope.sourceCode, $scope.lexemeTable);
                $scope.interpret();
            }

            $scope.interpret = () => {
                let result = parser($scope.lexemeTable, $scope.symbolTable,
                    $scope.index, $scope);

                if (result !== null) {
                    $scope.pendingVar = result.pendingVar;
                    $scope.index = result.index;
                }
            }

            $scope.getInput = () => {
                $scope.symbolTable[$scope.pendingVar] = {value: $scope.input, dataType: 'YARN'};
                $scope.input = '';

                $('#input').attr('disabled', true);
                $('#enter').attr('disabled', true);

                $scope.interpret()
            }
        }
    ]);
})();
