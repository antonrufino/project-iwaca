'use strict';

(() => {
    let app = angular.module('app', []);

    app.controller('LexerController', ['$scope', ($scope) => {
        $scope.lexemes = [];
        $scope.sourceCode = '"hello", "world"';
        $scope.analyze = () => {
            $scope.lexemes = [];

            for (let line of $scope.sourceCode.split("\n")) {
                for (let pattern of lexerData) {
                    let re = pattern.tokenRegEx;
                    let match;

                    while (match = re.exec(line)) {
                        if (match.length > 1) {
                            for (let i = 1; i < match.length; ++i) {
                                $scope.lexemes.push({
                                    token: match[i],
                                    classification: pattern.classification[i]
                                });
                            }
                        } else {
                            $scope.lexemes.push({
                                token: match[0],
                                classification: pattern.classification
                            });
                        }
                    }

                    line = line.replace(re, '');
                }
            }
        }
    }]);
})();
