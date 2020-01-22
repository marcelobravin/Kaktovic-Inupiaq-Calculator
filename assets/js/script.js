$(document).ready(function(){

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
        $("#termo").removeAttr('title');
        $("#resposta").removeAttr('title');
    });

    /* Adiciona simbolo da operacao */
    $(".operacao").click(function()
    {
        let isOP =  $("#termo").val().substr(-2,1);
        if (isOP === "+" || isOP === "-" || isOP === "*" || isOP === "/") {
            return false;
        }

        var operacaoSelecionada = $(this).text();
        let x    = $("#termo").val();

        $("#termo").val(x+""+  operacaoSelecionada);
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


// ----------------------------------------------
//  CONTROLLER =
// ----------------------------------------------

/**
 * calcularController
 * @param stringConta
 * @returns {boolean}
 */
function calcularController ( stringConta )
{
    let vetorConta = stringConta.split(' ');
    let keyOperador = posicaoOperador(vetorConta);

    if(!keyOperador)
    {
        $("#resposta").attr({ 'title': stringConta.toString() });

        let s = "";
        if ( parseInt(stringConta) < 0 ) { s = "- " }

        $("#resposta").val( s + ki_encode( Math.abs(stringConta).toString()) );
        return true;
    }

    var n1 = vetorConta[keyOperador - 1];
    var n2 = vetorConta[keyOperador + 1];
    var op = vetorConta[keyOperador];

    switch (op) {
        case "*":
            var resultado = multplicar(n1, n2);
            break;

        case "/":
            var resultado = dividir(n1, n2);
            break;

        case "+":
            var resultado = somar(n1, n2);
            break;

        case "-":
            var resultado = subtrair(n1, n2);
            break;
    }

    var stringConta2 = ajustaTermo(vetorConta, parseInt(keyOperador), resultado );

    calcularController (stringConta2)

}

// ----------------------------------------------
//  SERVICES =
// ----------------------------------------------

/**
 * posicaoOperador
 * @param array
 * @returns {*}
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
 * @param vetorConta
 * @param keyOperador
 * @param resultado
 * @returns {string}
 */
function ajustaTermo ( vetorConta, keyOperador, resultado )
{
    var min = keyOperador - 1;

    for (let i = 0; i < vetorConta.length; ++i) {

        // Adiciona o resultado no vetor
        if (i === min) {
            vetorConta[min] = resultado.toString();
        }

        // Remove o Operador e o N2
        if (i === keyOperador) {
            vetorConta.splice(i, 2);
        }
    }

    return  vetorConta.join(' ');

}


/**
 * somar
 * @param n1
 * @param n2
 * @returns {number}
 */
function somar ( n1, n2 )
{
    return parseInt(n1) + parseInt(n2);
}

/**
 * subtrair
 * @param n1
 * @param n2
 * @returns {number}
 */
function subtrair ( n1, n2 )
{
    return parseInt(n1) - parseInt(n2);
}

/**
 * multplicar
 * @param n1
 * @param n2
 * @returns {number}
 */
function multplicar ( n1, n2 )
{
    return parseInt(n1) * parseInt(n2);
}

/**
 * dividir
 * @param n1
 * @param n2
 * @returns {number}
 */
function dividir ( n1, n2 )
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

    var vetorConta = ki_expressao.split(' ');

    for (let i = 0; i < vetorConta.length; i++) {

        let str = ki_decode(vetorConta[i]);

        if(is_Int(str)){
             vetorConta[i] = str
        } else {
            vetorConta[i] = vetorConta[i]    
        }
    }

    return  vetorConta.join(' ');
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
    
    var numeros = [];
    var simbs = [];

    function transformBase10toBase20(dec_num) {
        
        var resultado = parseInt(dec_num / 20);
        var sobra     = dec_num % 20;
    
        numeros.push(sobra);
        
        if (resultado <= 0) {
            return true;
        }
        
        transformBase10toBase20(resultado)
    }

    transformBase10toBase20(dec_number);

    for (let i = 0; i < numeros.length; i++) {
        simbs[i] = simbulos[numeros[i]]
    }
    
    return simbs.reverse().join('');
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