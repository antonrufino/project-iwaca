(() => {
    angular.module('app')
    .factory('parser', () => {
        function arithmetic(lexemeTable, symbolTable, i) {
            let expr = [];

            while (true) {
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
                    expr.push(lexemeTable[i].token);
                } else {
                    // TODO: error
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

                    console.log(op1 % op2);
                    stack.push(op1 % op2);
                } else if (typeof e === 'number') {
                    stack.push(e);
                } else {
                    // TODO: error
                }
            }

            if (stack.length !== 1) {
                // TODO: error
            } else {
                symbolTable['IT'] = {value: stack.pop(), dataType: 'kek'};
            }

            return i;
        }

        function gimmeh(symbolTable) {

        }

        function assign(symbolTable) {

        }

        function smoosh(symbolTable) {

        }

        return (lexemeTable, symbolTable) => {
            let i = 0;
            while (i < lexemeTable.length) {
                if (lexemeTable[i].tokenType === 'ARITHMETIC_OPERATOR') {
                    i = arithmetic(lexemeTable, symbolTable, i);
                }

                i += 1;
            }
        }
    });
})();
