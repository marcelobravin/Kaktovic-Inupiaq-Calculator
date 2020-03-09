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
 , 'a': ""
 , 'b': ""
 , 'c': ""
 , 'd': ""
 , 'e': ""
 , 'f': ""
 , 'g': ""
 , 'h': ""
 , 'i': ""
 , 'j': ""
};

function ki_encode(dec_number)
{
    var vig_number = toVigesimal( Math.abs(dec_number) );

    // In case the vigesimal result have multiple characters
    var array = vig_number.split('');
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
    return getKeyByValue(simbolos, simbolo)
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

// function toDecimal(vigesimal)
// {
//     return parseFloat(vigesimal, 20).toString(10);
// }

function toDecimal(decimal)
{
    var vigesimal = decimal.toString(20);
    return parseFloat(vigesimal, 20);
}

function toVigesimal(decimal)
{
    return decimal.toString(20).toString(10);
}

function getKeyByValue(object, value)
{
    return Object.keys(object).find(
        key => object[key] === value
    );
}