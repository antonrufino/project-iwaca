'use strict';

(() => {
    let app = angular.module('app', []);

    app.controller('LexerController', ['$scope', ($scope) => {
        $scope.lexemes = [];
        $scope.sourceCode = '';
        $scope.openFile = () => {
            console.log("tezr")

            let f = document.getElementById('file').files[0],
            r = new FileReader();
            r.onloadend = function(e){
                $scope.sourceCode = e.target.result;
            }
            r.readAsBinaryString(f);
        }
        $scope.analyze = () => {
            $scope.lexemes = [];
            console.log($scope.sourceCode)

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
