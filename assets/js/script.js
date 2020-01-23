// ----------------------------------------------
//  VIEWS =
// ----------------------------------------------
$(document).ready(function(){

    $('[data-toggle="popover"]').popover();   

    /* Coloca os numeros e simbolos no palco */
    $("#calculadora .numeral").click(function() 
    {
        $("#termo").removeAttr('title');
        var simb = $(this).text();
        var x = $("#termo").val();
        var expression = x+""+simb; 
        var dec_termo = ki_to_decimal_expression(expression);
        $("#termo").val(expression);
        $("#termo").attr({ 'title': dec_termo.toString() });
    });

    /* Botao limpar */
    $("#limpar").click(function()
    {
        $("#termo, #resposta").val("");
        $("#termo, #resposta").removeAttr('title');
    });

    /* Adiciona simbolo da operacao */
    $(".operacao").click(function()
    {
        let isOP =  $("#termo").val().substr(-2,1);
        if (isOP === "+" || isOP === "-" || isOP === "*" || isOP === "/") {
            return false;
        }

        var operacaoSelecionada = $(this).text();
        let x = $("#termo").val();

        $("#termo").val( x+""+ operacaoSelecionada );
    });

    /* Calcula */
    $("#calcular").click(function()
    {
        $("#resposta").removeAttr('title');
        var ki_termo = $("#termo").val();
        var dec_termo = ki_to_decimal_expression(ki_termo);
        
        calcularController ( dec_termo );
    });
});

function imprime_termo()
{}

/**
 * Print Result
 * @param st_term
 */
function printResult(st_term)
{
    $("#resposta").attr({ 'title': st_term.toString() });
    $("#resposta").val( ki_encode( Math.abs(st_term).toString()) );
}


// ----------------------------------------------
//  CONTROLLER =
// ----------------------------------------------

/**
 * calcularController
 * @param st_term
 * @returns {boolean}
 */
function calcularController ( st_term )
{
    let v_term = st_term.split(' ');
    let k_operator = posicaoOperador(v_term);

    if(!k_operator)
    {
        printResult(st_term);
        return true;
    }

    var n1 = v_term[k_operator - 1];
    var n2 = v_term[k_operator + 1];
    var op = v_term[k_operator];

    /* Execute operations in algebric order */
    switch (op) {
        case "*":
            var result = multiply(n1, n2);
            break;

        case "/":
            var result = division(n1, n2);
            break;

        case "+":
            var result = add(n1, n2);
            break;

        case "-":
            var result = subtract(n1, n2);
            break;
    }

    var st_term2 = ajustaTermo(v_term, parseInt(k_operator), result );

    calcularController (st_term2)
}

// ----------------------------------------------
//  SERVICES =
// ----------------------------------------------

/**
 * Ordena posicao dos operadores
 * @param array
 * @returns index
 */
function posicaoOperador ( array )
{
    if( jQuery.inArray( "*", array ) > 0 ){
        return array.indexOf("*");
    }

    if( jQuery.inArray( "/", array ) > 0  ){
        return array.indexOf("/");
    }

    if( jQuery.inArray( "+", array ) > 0  ){
        return array.indexOf("+");
    }

    if( jQuery.inArray( "-", array ) > 0  ){
        return array.indexOf("-");
    }

    return false;
}

/**
 * ajustaTermo
 * @param v_term
 * @param k_operator
 * @param result
 * @returns {string}
 */
function ajustaTermo ( v_term, k_operator, result )
{
    var min = k_operator - 1;

    for (let i = 0; i < v_term.length; ++i) {

        // Adiciona o result no vetor
        if (i === min) {
            v_term[min] = result.toString();
        }

        // Remove o Operador e o N2
        if (i === k_operator) {
            v_term.splice(i, 2);
        }
    }

    return  v_term.join(' ');
}

/**
 * add
 * @param n1
 * @param n2
 * @returns {number}
 */
function add ( n1, n2 )
{
    return parseInt(n1) + parseInt(n2);
}

/**
 * subtract
 * @param n1
 * @param n2
 * @returns {number}
 */
function subtract ( n1, n2 )
{
    return parseInt(n1) - parseInt(n2);
}

/**
 * multiply
 * @param n1
 * @param n2
 * @returns {number}
 */
function multiply ( n1, n2 )
{
    return parseInt(n1) * parseInt(n2);
}

/**
 * division
 * @param n1
 * @param n2
 * @returns {number}
 */
function division ( n1, n2 )
{
    return parseInt(n1) / parseInt(n2);
}

// ----------------------------------------------
//  HELPERS =
// ----------------------------------------------
/**
 * ki_to_decimal_expression
 * @param ki_expressao
 * @returns {string}
 */
function ki_to_decimal_expression( ki_expressao )
{
    var v_term = ki_expressao.split(' ');

    for (let i = 0; i < v_term.length; i++) {

        let str = ki_decode(v_term[i]);

        if ( is_Int(str) ) {
             v_term[i] = str
        } else {
            v_term[i] = v_term[i]    
        }
    }

    return  v_term.join(' ');
}

/**
 * validate is_Int
 * @param num
 * @returns {boolean}
 */
function is_Int(num) 
{
    if (typeof num !== 'number') {
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
    if ( parseInt(st_term) < 0 ) { return "- "; }
    return "";
}

/**
 * ki_encode
 * @param dec_number
 * @returns {string}
 */
function ki_encode ( dec_number )
{
    var simbulos = {
           0 : "",   1 : "",   2 : "",   3 : "",   4 : "",   5 : "",   6 : "",   7 : "",   8 : "",   9 : ""
        , 10 : "",  11 : "",  12 : "",  13 : "",  14 : "",  15 : "",  16 : "",  17 : "",  18 : "",  19 : ""
    };

    var int_numbers = [];
    var float_numbers = [];

    var simbs = [];

    // caso negativo cria sinal
    var isNgt = isNegative ( parseInt(dec_number));

    // ajustar floats / numeros grandes
    var v_term = Math.abs(dec_number).toString().split('.');

    // Convert INT numbers
    function integer_Base10toBase20 ( dec_num )
    {
        let res = parseInt(dec_num) / 20;
        let mod = parseInt(dec_num) % 20;

        if (res <= 0) {
            return true;
        }

        int_numbers.push(mod.toString());

        integer_Base10toBase20(res)
    }

    // Convert Float numbers
    function float_Base10toBase20 ( dec_num )
    {
        let res = parseInt(dec_num) / 20;
        let mod = parseInt(dec_num) % 20;

        if (res <= 0) {
            return true;
        }

        float_numbers.push(mod.toString());

        float_Base10toBase20(res)
    }

    /* Se tiver mais de uma posicao e um float (porque foi quebrado por ponto) */
    if ( v_term.length > 1) {
        integer_Base10toBase20(v_term[0]);
        float_Base10toBase20(v_term[1]);

        for (let i = 0; i < float_numbers.length; i++) {
            simbs.push(simbulos[Math.abs(float_numbers[i])]);
        }
        simbs.push(".");
        for (let i = 0; i < int_numbers.length; i++) {
            simbs.push(simbulos[Math.abs(int_numbers[i])]);
        }
        console.log(simbs);

        return isNgt+simbs.reverse().join('');
    }

    integer_Base10toBase20(v_term[0]);

    for (let i = 0; i < int_numbers.length; i++) {
        simbs.push(simbulos[Math.abs(int_numbers[i])])
    }

    // convert em simbulos
    return isNgt+simbs.reverse().join(''); // corrigir ::::::::::::::::::::::::::::::: isNgt
}

/**
 * ki_decode
 * @param ki_number
 * @returns {*}
 */
function ki_decode ( ki_number ) 
{
    let v_ki = ki_number.split('').reverse();

    let numeros = {
          "" :  0, "" :  1, "" :  2, "" :  3, "" :  4, "" :  5, "" :  6, "" :  7, "" :  8, "" :  9
        , "" : 10, "" : 11, "" : 12, "" : 13, "" : 14, "" : 15, "" : 16, "" : 17, "" : 18, "" : 19
    };

    // Converter de base 10 para base 20
    let p_math = 1;
    let v_calc = [1];
    let v_dec  = [];
    let v_prod = [];

    // monta base de multiplicação
    for (let i = 1; i < v_ki.length; i++) {
        p_math    = parseInt(p_math * 20);
        v_calc[i] = p_math
    }
    
    // converte caracteres
    for (let i = 0; i < v_ki.length; i++) {
        v_dec[i] = Math.abs(numeros[v_ki[i]]);
        v_prod[i] = v_dec[i] * v_calc[i]
    }

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return v_prod.reduce(reducer)
}