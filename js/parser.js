(() => {
    angular.module('app')
    .factory('parser', () => {
        function arithmetic(lexemeTable, symbolTable, i) {
            let expr = [];

            while (i < lexemeTable.length) {
                if (lexemeTable[i].tokenType === 'INTEGER_LITERAL') {
                    expr.push(parseInt(lexemeTable[i].token));
                    if (i + 1 >= lexemeTable.length ||
                        lexemeTable[i + 1].tokenType !== 'AN') break;
                } else if (lexemeTable[i].tokenType === 'FLOATING_POINT_LITERAL') {
                    expr.push(parseFloat(lexemeTable[i].token))
                    if (i + 1 >= lexemeTable.length ||
                        lexemeTable[i + 1].tokenType !== 'AN') break;
                } else if (lexemeTable[i].tokenType === 'ARITHMETIC_OPERATOR') {
                    expr.push(lexemeTable[i].token);
                } else if (lexemeTable[i].tokenType === 'AN') {
                    i += 1;
                    continue;
                } else if (lexemeTable[i].tokenType === 'IDENTIFIER') {
                    let descriptor = symbolTable[lexemeTable[i].token];

                    if (descriptor !== undefined) {
                        if (typeof descriptor.value === 'string') {
                            let result = parseInt(descriptor.value);
                            if (result === NaN) {
                                result = parseFloat(descriptor.value);
                                if (result === NaN) {
                                    return {value: null, index: -1};
                                } else {
                                    expr.push(result);
                                }
                            } else {
                                expr.push(result);
                            }
                        } else {
                            expr.push(descriptor.value);
                        }
                    }
                    else {
                        //TODO: error;
                        return {value: null, index: -1};
                    }

                    if (i + 1 >= lexemeTable.length ||
                        lexemeTable[i + 1].tokenType !== 'AN') break;
                } else if (lexemeTable[i].tokenType === 'STRING_DELIMITER' &&
                    lexemeTable[i+1].tokenType === 'STRING_LITERAL' ) {
                    i += 1;

                    let result = parseInt(lexemeTable[i].token);
                    if (result === NaN) {
                        result = parseFloat(lexemeTable[i].token);
                        if (result === NaN) {
                            return {value: null, index: -1};
                        } else {
                            expr.push(result);
                        }
                    } else {
                        expr.push(result);
                    }

                    i += 1;
                } else {
                    // TODO: error
                    console.log("Invalid token");
                    return {value: null, index: -1};
                }

                i += 1
            }

            expr.reverse();

            let stack = [];
            for (e of expr) {
                if (e === 'SUM OF') {
                    let op1 = stack.pop();
                    let op2 = stack.pop();

                    stack.push(op1 + op2);
                } else if (e === 'DIFF OF') {
                    let op1 = stack.pop();
                    let op2 = stack.pop();

                    stack.push(op1 - op2);
                } else if (e === 'PRODUKT OF') {
                    let op1 = stack.pop();
                    let op2 = stack.pop();

                    stack.push(op1 * op2);
                } else if (e === 'QUOSHUNT OF') {
                    let op1 = stack.pop();
                    let op2 = stack.pop();

                    stack.push(op1 / op2);
                } else if (e === 'MOD OF') {
                    let op1 = stack.pop();
                    let op2 = stack.pop();

                    stack.push(op1 % op2);
                } else if (typeof e === 'number') {
                    stack.push(e);
                } else {
                    // TODO: error
                    console.log("Inappropriate operand");
                    return {value: null, index: -1};
                }
            }

            if (stack.length !== 1) {
                // TODO: error
                console.log("Not enough operands");
                return {value: null, index: -1};
            }

            return {value: stack.pop(), index: i};
        }

        function initialize(lexemeTable, symbolTable, index) {
            if(lexemeTable[index+1].tokenType==='IDENTIFIER'){
                if(lexemeTable[index+2].tokenType==='ITZ'){
                    if(lexemeTable[index+3].tokenType==='INTEGER_LITERAL'){
                        symbolTable[lexemeTable[index+1].token] = { value: parseInt(lexemeTable[index+3].token), dataType: lexemeTable[index+3].tokenType};
                    } else if (lexemeTable[index+3].tokenType==='FLOATING_POINT_LITERAL') {
                        symbolTable[lexemeTable[index+1].token] = { value: parseFloat(lexemeTable[index+3].token), dataType: lexemeTable[index+3].tokenType};
                    } else if(lexemeTable[index+3].tokenType==='STRING_DELIMITER'){
                        symbolTable[lexemeTable[index+1].token] = { value: lexemeTable[index+4].token, dataType: lexemeTable[index+4].tokenType};
                    } else if (lexemeTable[index+3].tokenType==='WIN' || lexemeTable[index+3].tokenType==='FAIL') {
                        symbolTable[lexemeTable[index+1].token] = { value: lexemeTable[index+3].token, dataType: lexemeTable[index+3].tokenType};
                    } else if(lexemeTable[index+3].tokenType==='IDENTIFIER'){
                        if(symbolTable[lexemeTable[index+3].token] !== undefined){
                            symbolTable[lexemeTable[index+1].token] = { value: symbolTable[lexemeTable[index+3].token].value, dataType: symbolTable[lexemeTable[index+3].dataType]};
                        }
                    } else if (lexemeTable[index+3].tokenType==='ARITHMETIC_OPERATOR') {
                        let result = arithmetic(lexemeTable, symbolTable, index+3);
                        let newIndex = result.index;
                        if (newIndex!==-1) {
                            symbolTable[lexemeTable[index+1].token] = { value: result.value, dataType: symbolTable[lexemeTable[index+3].dataType]};
                            return newIndex;
                        } else {
                            // TODO: error
                            return -1;
                        }
                    } else if (lexemeTable[index+3].tokenType==='SMOOSH') {
                        let result = smoosh(lexemeTable, symbolTable, index+3);
                        let newIndex = result.index;
                        if (newIndex!==-1) {
                            symbolTable[lexemeTable[index+1].token] = { value: result.value, dataType: symbolTable[lexemeTable[index+3].dataType]};
                            return newIndex;
                        } else {
                            // TODO: error
                            return -1;
                        }
                    }
                }
                else {
                    symbolTable[lexemeTable[index+1].token] =  { value: null, dataType: 'NOOB'};
                }
            }

            return index;
        }

        function smoosh(lexemeTable, symbolTable, i) {
            let str= "";

            i+=1;
            while(i<lexemeTable.length){
                if (lexemeTable[i].tokenType === 'MKAY'){
                    return {value: str, index: i};
                }
                else if (lexemeTable[i].tokenType === 'AN'){
                    i+=1;
                }
                else if (lexemeTable[i].tokenType === 'STRING_LITERAL'){
                    str = str + lexemeTable[i].token;
                    i+=1;
                }
                else if (lexemeTable[i].tokenType === 'STRING_DELIMITER') {
                    i+=1;
                }
                else if (lexemeTable[i].tokenType === 'INTEGER_LITERAL' || lexemeTable[i].tokenType === 'FLOATING_POINT_LITERAL' ||
                         lexemeTable[i].tokenType === 'WIN' || lexemeTable[i].tokenType === 'FAIL'){
                    str = str + lexemeTable[i].token;
                    i+=1;
                }
                else if (lexemeTable[i].tokenType === 'IDENTIFIER'){
                    if(symbolTable[lexemeTable[i].token] !== undefined){
                        if(symbolTable[lexemeTable[i].token].value === null){
                            break;
                        }
                        else {
                            str = str + symbolTable[lexemeTable[i].token].value;
                            i+=1;
                        }
                    }
                }
                else {
                    return -1;
                }
            }
        }

        // Sobra kulang pa nito. Identifier lang prinaprocess.
        function visible(lexemeTable, symbolTable, $scope, index) {
            if(lexemeTable[index+1].tokenType==='IDENTIFIER'){
                $scope.terminal = $scope.terminal + symbolTable[lexemeTable[index+1].token].value + '\n';
            }
            else if (lexemeTable[index+1].tokenType==='INTEGER_LITERAL') {
                $scope.terminal = $scope.terminal + lexemeTable[index+1].token + '\n';
            }
            else if (lexemeTable[index+1].tokenType==='FLOATING_POINT_LITERAL') {
                $scope.terminal = $scope.terminal + lexemeTable[index+1].token + '\n';
            }
            else if (lexemeTable[index+2].tokenType==='STRING_LITERAL') {
                $scope.terminal = $scope.terminal + lexemeTable[index+2].token + '\n';
            }
            else if (lexemeTable[index+1].tokenType==='WIN' || lexemeTable[index+1].tokenType==='FAIL' ) {
                $scope.terminal = $scope.terminal + lexemeTable[index+1].token + '\n';
            } else if (lexemeTable[index+1].tokenType==='ARITHMETIC_OPERATOR') {
                let result =  arithmetic(lexemeTable, symbolTable, index+1);
                index = result.index;
                $scope.terminal = $scope.terminal + result.value + '\n';
                return index;
            } else if (lexemeTable[index+1].tokenType==='SMOOSH') {
                let result = smoosh(lexemeTable, symbolTable, index+1);
                index = result.index;
                $scope.terminal = $scope.terminal + result.value + '\n';
                return index;
            }

            return index + 1
        }

        function assign(lexemeTable, symbolTable, index) {
             if(lexemeTable[index-1].tokenType==='IDENTIFIER'){
                if(lexemeTable[index+1].tokenType==='INTEGER_LITERAL'){
                    symbolTable[lexemeTable[index-1].token] = { value: parseInt(lexemeTable[index+1].token), dataType: lexemeTable[index+1].tokenType};
                } else if (lexemeTable[index+1].tokenType==='FLOATING_POINT_LITERAL') {
                    symbolTable[lexemeTable[index-1].token] = { value: parseFloat(lexemeTable[index+1].token), dataType: lexemeTable[index+1].tokenType};
                } else if(lexemeTable[index+2].tokenType==='STRING_LITERAL'){
                    symbolTable[lexemeTable[index-1].token] = { value: lexemeTable[index+2].token, dataType: lexemeTable[index+2].tokenType};
                } else if (lexemeTable[index+1].tokenType==='WIN' || lexemeTable[index+1].tokenType==='FAIL') {
                    symbolTable[lexemeTable[index-1].token] = { value: lexemeTable[index+1].token, dataType: lexemeTable[index+1].tokenType};
                } else if (lexemeTable[index+1].tokenType==='IDENTIFIER') {
                    symbolTable[lexemeTable[index-1].token] = { value: symbolTable[lexemeTable[index+1].token].value, dataType: symbolTable[lexemeTable[index+1].token].dataType};
                } else if (lexemeTable[index+1].tokenType==='ARITHMETIC_OPERATOR') {
                    let result = arithmetic(lexemeTable, symbolTable, index+1);
                    symbolTable[lexemeTable[index-1].token] = { value: result.value, dataType: 'NUMBR'};
                    return result.index;
                } else if (lexemeTable[index+1].tokenType==='SMOOSH') {
                    let result = smoosh(lexemeTable, symbolTable, index+1);
                    symbolTable[lexemeTable[index-1].token] = { value: result.value, dataType: 'YARN'};
                    return result.index;
                }
            }
            return index;
        }

        function gimmeh(lexemeTable, symbolTable, index) {
            if (lexemeTable[index].tokenType==="GIMMEH" && lexemeTable[index+1].tokenType==="IDENTIFIER") {
                if (symbolTable[lexemeTable[index+1].token] !== undefined) {
                    return {pendingVar: lexemeTable[index+1].token, index: index+2};
                } else {
                    // TODO: error
                    return {pendingVar: null, index: -1};
                }
            }

            // TODO: error
            return {pendingVar: null, index: -1};
        }

        function wtf(lexemeTable, symbolTable, i, $scope) {
            i += 1;
            while (i < lexemeTable.length) {
                if (lexemeTable[i].tokenType === 'OMG') {
                    let caseValue;
                    let start;

                    if (lexemeTable[i+1].tokenType === 'INTEGER_LITERAL') {
                        caseValue = parseInt(lexemeTable[i+1].token);
                        start = i+1;
                    } else if (lexemeTable[i+1].tokenType === 'FLOATING_POINT_LITERAL') {
                        caseValue = parseFloat(lexemeTable[i+1].token);
                        start = i+1;
                    } else if (lexemeTable[i+2].tokenType === 'STRING_LITERAL') {
                        caseValue = lexemeTable[i+2].token;
                        start = i+3;
                    } else if (lexemeTable[i+1].tokenType === 'WIN') {
                        caseValue = lexemeTable[i+1].token;
                        start = i+1;
                    } else if (lexemeTable[i+1].tokenType === 'FAIL') {
                        caseValue = lexemeTable[i+1].token;
                        start = i+1;
                    }

                    if (symbolTable['IT'].value === caseValue) {
                        console.log(symbolTable['IT'].value);
                        console.log(caseValue);
                        return start;
                    } else {
                        i += 1;
                    }
                } else if (lexemeTable[i].tokenType === 'OMGWTF') {
                    return i;
                } else if (lexemeTable[i].tokenType === 'OIC') {
                    return i;
                } else {
                    i += 1;
                }
            }
        }

        function parse(lexemeTable, symbolTable, start, $scope) {
            for (let i = start; i < lexemeTable.length; i++) {
                if (lexemeTable[i].tokenType === 'I_HAS_A') {
                    i = initialize(lexemeTable, symbolTable, i);
                }
                else if (lexemeTable[i].tokenType === 'SMOOSH') {
                    let result = smoosh(lexemeTable, symbolTable, i);

                    if (result.index !== -1)
                        symbolTable['IT'] = {value: result.value, dataType: "YARN"};

                    i = result.index;
                }
                else if (lexemeTable[i].tokenType === 'ARITHMETIC_OPERATOR') {
                    let result = arithmetic(lexemeTable, symbolTable, i);

                    if (result.index !== -1)
                        symbolTable['IT'] = {value: result.value, dataType: "temp"};

                    i = result.index;
                }
                else if (lexemeTable[i].tokenType === 'VISIBLE') {
                    i = visible(lexemeTable, symbolTable, $scope, i);
                }
                else if (lexemeTable[i].tokenType === 'R') {
                    i = assign(lexemeTable, symbolTable, i);
                }
                else if (lexemeTable[i].tokenType === 'GIMMEH') {
                    let result = gimmeh(lexemeTable, symbolTable, i);

                    if (result.index !== -1) {
                        $('#input').attr('disabled', false);
                        $('#enter').attr('disabled', false);
                        return result;
                    }
                } else if (lexemeTable[i].tokenType === 'WTF?') {
                    i = wtf(lexemeTable, symbolTable, i, $scope);
                } else if (lexemeTable[i].tokenType === 'GTFO') {
                    for (; i < lexemeTable.length; ++i) {
                        if (lexemeTable[i].tokenType === 'OIC') break
                    }
                } else if (lexemeTable[i].tokenType === 'OIC') {
                    continue;
                }

                if (i === -1) {
                    console.log('ERROR!');
                    break;
                }

                console.log("kkek");
            }

            return null;
        }

        return parse;
    });
})();
