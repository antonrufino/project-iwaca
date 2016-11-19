(() => {
    angular.module('app')
    .factory('parser', () => {
        function arithmetic(lexemeTable, symbolTable, i) {
            let expr = [];

            while (i < lexemeTable.length) {
                console.log(i);
                console.log(lexemeTable[i]);
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

                    if (descriptor !== undefined) expr.push(descriptor.value);
                    else {
                        //TODO: error;
                        return -1;
                    }

                    if (i + 1 >= lexemeTable.length ||
                        lexemeTable[i + 1].tokenType !== 'AN') break;
                } else {
                    // TODO: error
                    return -1;
                }

                i += 1
            }

            console.log(expr);
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
                    console.log(e);
                    return -1;
                }
            }

            if (stack.length !== 1) {
                // TODO: error
                return -1;
            } else {
                symbolTable['IT'] = {value: stack.pop(), dataType: 'kek'};
            }

            return i;
        }

        function gimmeh(symbolTable) {

        }

        function assign(symbolTable) {

        }

        function initialize(lexemeTable, symbolTable, index) {
            if(lexemeTable[index+1].tokenType==='IDENTIFIER'){
                if(lexemeTable[index+2].tokenType==='ITZ'){
                    if(lexemeTable[index+3].tokenType==='INTEGER_LITERAL'){
                        symbolTable[lexemeTable[index+1].token] = { value: parseInt(lexemeTable[index+3].token), dataType: lexemeTable[index+3].tokenType};
                    } else if (lexemeTable[index+3].tokenType==='FLOATING_POINT_LITERAL') {
                        symbolTable[lexemeTable[index+1].token] = { value: parseFloat(lexemeTable[index+3].token), dataType: lexemeTable[index+3].tokenType};
                    } else if(lexemeTable[index+3].tokenType==='STRING_LITERAL'){
                        symbolTable[lexemeTable[index+1].token] = { value: lexemeTable[index+3].token + lexemeTable[index+4].token + lexemeTable[index+3].token, dataType: lexemeTable[index+4].tokenType};
                    } else if (lexemeTable[index+3].tokenType==='WIN' || lexemeTable[index+3].tokenType==='FAIL') {
                        symbolTable[lexemeTable[index+1].token] = { value: lexemeTable[index+3].token, dataType: lexemeTable[index+3].tokenType};
                    } else if(lexemeTable[index+3].tokenType==='IDENTIFIER'){
                        if(symbolTable[lexemeTable[index+3].token] !== undefined){
                            symbolTable[lexemeTable[index+1].token] = { value: symbolTable[lexemeTable[index+3].token].value, dataType: symbolTable[lexemeTable[index+3].dataType]};
                        }
                    }
                }
                else {
                    symbolTable[lexemeTable[index+1].token] =  { value: 'NULL', dataType: 'NOOB'};
                }
            }
        }

        function smoosh(symbolTable) {

        }

        return (lexemeTable, symbolTable) => {
            let i = 0;
            while (i < lexemeTable.length) {
                if (lexemeTable[i].tokenType === 'ARITHMETIC_OPERATOR') {
                    i = arithmetic(lexemeTable, symbolTable, i);
                    console.log(i);
                    if (i < 0) break;
                } else if (lexemeTable[i].tokenType === 'I_HAS_A') {
                    initialize(lexemeTable, symbolTable, i);
                }

                i += 1;
            }
        }
    });
})();
