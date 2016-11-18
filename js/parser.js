(() => {
    angular.module('app')
    .factory('parser', () => {
        function arithmetic(symbolTable) {

        }

        function gimmeh(symbolTable) {

        }

        function assign(symbolTable) {

        }

        function initialize(lexemeTable, symbolTable, index) {
            if(lexemeTable[index+1].tokenType==='IDENTIFIER'){
                if(lexemeTable[index+2].tokenType==='ITZ'){
                    if(lexemeTable[index+3].tokenType==='INTEGER_LITERAL' || lexemeTable[index+3].tokenType==='FLOATING_POINT_LITERAL' || lexemeTable[index+3].tokenType==='WIN' || lexemeTable[index+3].tokenType==='FAIL'){
                         symbolTable[lexemeTable[index+1].token] = { value: lexemeTable[index+3].token, dataType: lexemeTable[index+3].tokenType};
                    }
                    if(lexemeTable[index+3].tokenType==='STRING_LITERAL'){
                        symbolTable[lexemeTable[index+1].token] = { value: lexemeTable[index+3].token + lexemeTable[index+4].token + lexemeTable[index+3].token, dataType: lexemeTable[index+4].tokenType};
                    }
                    if(lexemeTable[index+3].tokenType==='IDENTIFIER'){
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
             symbolTable.length=0;
             for(let i=0;i<lexemeTable.length;i++){
                if (lexemeTable[i].tokenType === 'I_HAS_A') initialize(lexemeTable, symbolTable, i);                
            }
        }
    });
})();
