// ----------------------------------------------
//  SERVICES =
// ----------------------------------------------
const simbolos = {
    0 : ""
 ,  1 : ""
 ,  2 : ""
 ,  3 : ""
 ,  4 : ""
 ,  5 : ""
 ,  6 : ""
 ,  7 : ""
 ,  8 : ""
 ,  9 : ""
 , 'a': "" // 10
 , 'b': "" // 11
 , 'c': "" // 12
 , 'd': "" // 13
 , 'e': "" // 14
 , 'f': "" // 15
 , 'g': "" // 16
 , 'h': "" // 17
 , 'i': "" // 18
 , 'j': "" // 19
};

function ki_encode(dec_number)
{
    var vig_number = toVigesimal( Math.abs(dec_number) );

    // In case the vigesimal result have multiple digits
    var array = vig_number.toString().split('');
    var x = '';
    for (let i=0; i<array.length; i++) {
        if ( array[i] == '.' ) {
            x += '.';
        } else {
            x += simbolos[ array[i] ];
        }
    }

    return x;
}

function ki_decode(simbolo)
{
    var valorVigesimal = getKeyByValue(simbolos, simbolo);
    return toDecimal(valorVigesimal);
}

// ----------------------------------------------
//  HELPERS =
// ----------------------------------------------

/**
 * validate is_Int
 * @param num
 * @returns {boolean}
 */
function is_Int(num) 
{
    num = parseInt(num);
    if (typeof num !== 'number') {
        console.log(num + "typeof num !== 'number'");
        return false;
    }

    return !isNaN(num) && parseInt(Number(num)) === num && !isNaN(parseInt(num, 10));
 }

/**
 * is Negative
 * @param st_term
 * @returns {string}
 */
function isNegative(st_term)
{
    if ( parseFloat(st_term) < 0 ) {
        return "-";
    }
    return "";
}

function toDecimal(decimal) // 'aa' = 210
{
    var v = decimal.split('.');
    var result = parseInt(v[0], 20);

    if (v.length > 1) {
        result += ".";
        if ( v[1] != '' ) {
            result += parseInt(v[1], 20);
        }
    }

    return result;
}

function toVigesimal(decimal) // 'aa' = 210
{
    var v = decimal.toString().split('.');
    
    // before coma
    var result = toVigesimalHelper( v[0] );

    // after coma
    if (v.length > 1) {
        result += ".";
        
        if ( v[1] != '' ) {
            result += toVigesimalHelper( v[1] );
        }
    }

    return result;
}

function toVigesimalHelper(decimal) // 'aa' = 210
{
    var result = parseInt(decimal, 10);
    result = result.toString(20);

    return result;
}

function toVigesimalORIG(decimal)
{
    return decimal.toString(20).toString(10);
}

function getKeyByValue(object, value)
{
    return Object.keys(object).find(
        key => object[key] === value
    );
}

function corrigeSimbolo(decimal_expression)
{
    var newString = decimal_expression.replace(/÷/g, '/'); // corrects division symbol
    newString     = newString.replace(/×/g, '*'); // corrects multiplication symbol
    return newString;
}

function existePontos(str)
{
    var f = ".";
    var r = str.split(f).length - 1; 

    return r;
}

function getLastTerm(valor) {
    var lastOperatorValue = ultimoOperador(valor);
    var ultimoValorVigesimal = valor.substring(lastOperatorValue+1, valor.length);
    return ultimoValorVigesimal;
}
