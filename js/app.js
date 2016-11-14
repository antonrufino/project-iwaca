'use strict';

(() => {
    let app = angular.module('app', []);

    app.controller('LexerController', ['$scope', ($scope) => {
        $scope.lexemes = [];
        $scope.sourceCode = '';
        $scope.analyze = () => {
            $scope.lexemes = [];

            let sourceCode = $scope.sourceCode
            while (sourceCode != '') {
                for (let pattern of lexerData) {
                    let re = pattern.tokenRegEx;
                    let match = re.exec(sourceCode);

                    if (match === null) continue;

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

                    sourceCode = sourceCode.replace(re, '');
                    sourceCode = sourceCode.trim();

                    break;
                }
            }
        }
    }]);
})();
