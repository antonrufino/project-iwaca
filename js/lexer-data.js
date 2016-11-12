'use strict';

export const lexerData = [
    {token: "HAI", tokenRegEx: /HAI/, classification: 'Code delimiter'},
    {token: "KTHXBYE", tokenRegEx: /KTHXBYE/, classification: 'Code delimiter'},
    {token: "NEW_LINE", tokenRegEx: /\n/, classification: 'Statement delimiter'},
    {token: "I_HAS_A", tokenRegEx: /I HAS A/, classification: 'Variable declaration delimiter'},
    {token: "ITZ", tokenRegEx: /ITZ/, classification: 'Variable initialization'},
    {token: "R", tokenRegEx: /R/, classification: 'Variable assignment'},
    {token: "BTW", tokenRegEx: /BTW/, classification: 'Comment delimiter'},
    {token: "OBTW", tokenRegEx: /OBTW/, classification: 'Comment delimiter'},
    {token: "TLDR", tokenRegEx: /TLDR/, classification: 'Comment delimiter'},
    {token: "VISIBLE", tokenRegEx: /VISIBLE/, classification: 'Output keyword'},
    {token: "GIMMEH", tokenRegEx: /GIMMEH/, classification: 'Input keyword'},
    {token: "WIN", tokenRegEx: /WIN/, classification: 'TROOF literal'},
    {token: "FAIL", tokenRegEx: /FAIL/, classification: 'TROOF literal'},
    {token: "BOTH_OF", tokenRegEx: /BOTH OF/, classification: 'Binary logical AND operator'},
    {token: "EITHER_OF", tokenRegEx: /EITHER OF/, classification: 'Binary logical OR operator'},
    {token: "WON_OF", tokenRegEx: /WON OF/, classification: 'Binary logical XOR operator'},
    {token: "ALL_OF", tokenRegEx: /ALL OF/, classification: 'Infinite arity AND'},
    {token: "ANY_OF", tokenRegEx: /ANY OF/, classification: 'Infinite arity OR'},
    {token: "SMOOSH", tokenRegEx: /SMOOSH/, classification: 'String concatenation operator'},
    {token: "MKAY", tokenRegEx: /MKAY/, classification: 'Operation delimiter'},
    {token: "FAIL", tokenRegEx: /FAIL/, classification: 'Logical NOT operator'},
    {token: "O_RLY?", tokenRegEx: /O RLY\?/, classification: 'if-then statement delimiter'},
    {token: "OIC", tokenRegEx: /OIC/, classification: 'Flow control delimiter'},
    {token: "YA_RLY", tokenRegEx: /YA RLY/, classification: 'Code block delimiter'},
    {token: "NO_WAI", tokenRegEx: /NO WAI/, classification: 'Code block delimiter'},
    {token: "WTF?", tokenRegEx: /WTF\?/, classification: 'switch-case statement delimiter'},
    {token: "OMG", tokenRegEx: /OMG/, classification: 'Code block delimiter'},
    {token: "OMGWTF", tokenRegEx: /OMGWTF/, classification: 'Code block delimiter'},
    {token: "GTFO", tokenRegEx: /GTFO/, classification: 'Code block delimiter'},
    {token: "YARN", tokenRegEx: /YARN/, classification: 'String variable type'},
    {token: "NUMBR", tokenRegEx: /NUMBR/, classification: 'Integer variable type'},
    {token: "NUMBAR", tokenRegEx: /NUMBAR/, classification: 'Float variable type'},
    {token: "TROOF", tokenRegEx: /TROOF/, classification: 'Boolean variable type'},
    {token: "NOOB", tokenRegEx: /NOOB/, classification: 'Untyped variable type'},
    {token: "SUM_OF", tokenRegEx: /SUM OF/, classification: 'Addition operator'},
    {token: "DIFF_OF", tokenRegEx: /DIFF OF/, classification: 'Subtraction operator'},
    {token: "PRODUKT_OF", tokenRegEx: /PRODUKT OF/, classification: 'Multiplication operator'},
    {token: "QUOSHUNT_OF", tokenRegEx: /QUOSHUNT OF/, classification: 'Division operator'},
    {token: "MOD_OF", tokenRegEx: /MOD OF/, classification: 'Modulo operator'},
    {token: "BIGGR_OF", tokenRegEx: /BIGGR OF/, classification: 'Maximum operator'},
    {token: "SMALLR_OF", tokenRegEx: /SMALLR OF/, classification: 'Minimum operator'},
    {token: "STRING_LITERAL", tokenRegEx: /(")(.)(")/, classification: ['', 'String delimiter', 'String literal', 'String delimiter']},
    {token: "INTEGER_LITERAL", tokenRegEx: /(-?\d+)\s/, classification: ['', 'Integer literal']},
    {token: "AN", tokenRegEx: /(-?(?:\d*)?\.\d+)\s/, classification: ['', 'Floating point literal']},
]
