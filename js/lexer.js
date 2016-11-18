'use strict';

(() => {
    angular.module('app')
    .factory('lexer', () => {
        return (sourceCode, lexemeTable) => {
            while (sourceCode != '') {
                for (let pattern of lexerData) {
                    let re = pattern.tokenRegEx;
                    let match = re.exec(sourceCode);

                    if (match === null) continue;

                    if (match.length > 1) {
                        for (let i = 1; i < match.length; ++i) {
                            lexemeTable.push({
                                tokenType: pattern.tokenType,
                                token: match[i],
                                classification: pattern.classification[i]
                            });
                        }
                    } else {
                        lexemeTable.push({
                            tokenType: pattern.tokenType,
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
    });
})();
