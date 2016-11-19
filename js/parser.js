(() => {
    angular.module('app')
    .factory('parser', () => {
        function arithmetic(symbolTable) {

        }

        function gimmeh(symbolTable) {

        }

        function assign(symbolTable) {

        }

        function initialize(lexemeTable, symbolTable, i) {
            if(lexemeTable[i+1].tokenType==='IDENTIFIER'){
                if(lexemeTable[i+2].tokenType==='ITZ'){
                    if(lexemeTable[i+3].tokenType==='INTEGER_LITERAL' || 
                       lexemeTable[i+3].tokenType==='FLOATING_POINT_LITERAL' || 
                       lexemeTable[i+3].tokenType==='WIN' || lexemeTable[i+3].tokenType==='FAIL'){
                         symbolTable[lexemeTable[i+1].token] = { value: lexemeTable[i+3].token, dataType: lexemeTable[i+3].tokenType};
                    }
                    if(lexemeTable[i+3].tokenType==='STRING_LITERAL'){
                        symbolTable[lexemeTable[i+1].token] = { value: lexemeTable[i+4].token, dataType: lexemeTable[i+4].tokenType};
                    }
                    if(lexemeTable[i+3].tokenType==='IDENTIFIER'){
                        if(symbolTable[lexemeTable[i+3].token] !== undefined){
                            symbolTable[lexemeTable[i+1].token] = { value: symbolTable[lexemeTable[i+3].token].value, dataType: symbolTable[lexemeTable[i+3].dataType]};
                        }
                    }
                }
                else {
                    symbolTable[lexemeTable[i+1].token] =  { value: null, dataType: 'NOOB'};
                }
            }
        }

        function smoosh(lexemeTable, symbolTable, i) {
            let str= "";

            i+=1;
            while(i<lexemeTable.length){
                if (lexemeTable[i].tokenType === 'MKAY'){
                    symbolTable['IT'] = { value: str, dataType: 'STRING_LITERAL' };
                    break;
                }
                else if (lexemeTable[i].tokenType === 'AN'){
                    i+=1;
                }
                else if (lexemeTable[i].tokenType === 'STRING_LITERAL'){
                    str = str + lexemeTable[i+1].token;
                    i+=3;
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
                    break;
                }
            }
        }

        return (lexemeTable, symbolTable) => {
             symbolTable.length=0;
             for(let i=0;i<lexemeTable.length;i++){
                if (lexemeTable[i].tokenType === 'I_HAS_A') initialize(lexemeTable, symbolTable, i);    
                if (lexemeTable[i].tokenType === 'SMOOSH') smoosh(lexemeTable, symbolTable, i);         
            }
        }
    });
})();
