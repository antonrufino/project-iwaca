export const lexemeRegEx = [
    {token: "HAI" tokenRegEx: /HAI/, classification: 'Code delimiter'},
    {token: "KTHXBYE" tokenRegEx: /KTHXBYE/, classification: 'Code delimiter'},
    {token: "NEW_LINE" tokenRegEx: /\n/, classification: 'Statement delimiter'},
    {token: "I_HAS_A" tokenRegEx: /I HAS A/, classification: 'Variable declaration delimiter'},
    {token: "ITZ" tokenRegEx: /ITZ/, classification: 'Variable initialization'},
    {token: "R" tokenRegEx: /R/, classification: 'Variable assignment'},
    {token: "BTW" tokenRegEx: /BTW/, classification: 'Comment delimiter'},
    {token: "VISIBLE" tokenRegEx: /VISIBLE/, classification: 'Output keyword'},
    {token: "GIMMEH" tokenRegEx: /GIMMEH/, classification: 'Input keyword'},
    {token: "WIN" tokenRegEx: /WIN/, classification: 'TROOF literal'},
    {token: "FAIL" tokenRegEx: /FAIL/, classification: 'TROOF literal'},
    {token: "BOTH_OF" tokenRegEx: /BOTH OF/, classification: 'Binary logical AND operator'},
    {token: "EITHER_OF" tokenRegEx: /EITHER OF/, classification: 'Binary logical OR operator'},
    {token: "WON_OF" tokenRegEx: /WON OF/, classification: 'Binary logical XOR operator'},
    {token: "ALL_OF" tokenRegEx: /ALL OF/, classification: 'Infinite arity AND'},
    {token: "ANY_OF" tokenRegEx: /ANY OF/, classification: 'Infinite arity OR'},
    {token: "FAIL" tokenRegEx: /FAIL/, classification: 'Logical NOT operator'},
]
