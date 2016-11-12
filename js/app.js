'use strict';

(() => {
    let app = angular.module('app', []);

    app.controller('LexerController', ['$scope', ($scope) => {
        $scope.lexemes = [];
        $scope.sourceCode = '"hello", "world"';
        $scope.analyze = () => {
            for (let pattern of lexerData) {
                let re = pattern.tokenRegEx;
                let match;

                while (match = re.exec($scope.sourceCode)) {
                    if (match.length > 1) {
                        for (let i = 1; i < match.length; ++i) {
                            $scope.lexemes.push({
                                tokenType: match[i],
                                classification: pattern.classification[i]
                            });
                        }
                    } else {
                        $scope.lexemes.push({
                            tokenType: match[0],
                            classification: pattern.classification
                        });
                    }
                }
            }

            console.log($scope.lexemes);
        }
    }]);
})();
