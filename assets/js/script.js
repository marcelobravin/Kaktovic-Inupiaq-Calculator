// ----------------------------------------------
//  VIEWS =
// ----------------------------------------------
$(document).ready(function(){
    // Shows tooltip of the buttons
    $('[data-toggle="popover"]').popover();

    /* Insert the numbers clicked on the calculating area */
    $(".numeral").click(function()
    {
        var ki_clicked_simbol = $(this).text();
        var i_clicked_simbol  = $(this).data('content');

        var valor  = $("#termo").val();
        var titulo = $("#termo").attr('title');
        
        var ki_expression = valor +""+ ki_clicked_simbol;
        var dec_expression = titulo +""+i_clicked_simbol;

        $("#termo").val(ki_expression);
        $("#termo").attr( 'title', dec_expression );
    });

    // Add simbolo da operacao
    $(".operacao").click(function()
    {
        var operacaoSelecionada = $(this).text();
        let lastChar = $("#termo").attr("title").substr(-2,1);

        if (lastChar == "" && operacaoSelecionada!='-') { // The first char may be a minus
            return false;
        } else {

            if (lastChar == "+" || lastChar == "-" || lastChar == "×" || lastChar == "÷") { // blocks consecutive operators
                return false;
            }
        }

        $("#termo").val( $("#termo").val()+operacaoSelecionada );
        $("#termo").attr( 'title',  $("#termo").attr( 'title')+operacaoSelecionada );
    });

    // Executa calculo
    $("#calcular").click(function()
    {
        var dec_termo = $("#termo").attr('title');
        if ( dec_termo == "" ) {
            return false;
        }
        preparaCampo("");
        calcularController();
    });

    /* Botao limpar */
    $("#limpar").click(function()
    {
        $("#termo, #resposta").val("");
        $("#termo, #resposta").attr('title', '');
    });
});

function preparaCampo() {
    let valor = $("#termo").val();
    var valores = valor.split('+'); //////////////////////////////////////

    var ultimoValor = valores[valores.length-1];

    var x = $("#termo").attr('title');
    console.log(x);
    comeco = x.substr(0, x.indexOf("+") );
    console.log(x);
    // x = "+";

    fim = x.substr(x.indexOf("+"));
    // alert("comeco "+ comeco);
    // alert("fim "+ fim);

    var corrigeUltimoTituloDecimal = corrigeUltimoTitulo2(ultimoValor);

    $("#termo").attr('title', comeco +"+" +corrigeUltimoTituloDecimal);
}


function novoAtualizar() {
    let valor = $("#termo").val();
    var valores = valor.split('+'); //////////////////////////////////////

    var ultimoValor = valores[valores.length-1];
    var corrigeUltimoTituloDecimal = corrigeUltimoTitulo2(ultimoValor);

    let titulo = $("#termo").attr('title');
    var titulos = titulo.split('+'); //////////////////////////////////////

console.log(titulos);
console.log(corrigeUltimoTituloDecimal);

}

function corrigeUltimoTitulo2(ki_expression)
{
    let v_term = ki_expression.toString().split('');
    var concateno = "";
    for (let i=0; i<v_term.length; i++) {
        concateno += ki_decode(v_term[i]);
    }
    
    var tituloDecimal = toDecimal2( concateno );
    return tituloDecimal.toString();
}

/**
 * Print Result
 * @param dec_number
 */
function printResult2(dec_number)
{
    var x = ki_encode( dec_number );
    var sinal = isNegative(dec_number); 
    $("#resposta").val( sinal +""+ x );
    $("#resposta").attr( 'title', dec_number.toString() );
}

// ----------------------------------------------
//  CONTROLLER =
// ----------------------------------------------

function calcularController(decimal_expression) {
    var decimal_expression = $("#termo").attr('title');
    var newString = decimal_expression.replace(/÷/g, '/'); // corrects symbol
    newString = decimal_expression.replace(/×/g, '*'); // corrects symbol
    var decimal_result = eval(newString);
    printResult2(decimal_result);
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
    if ( jQuery.inArray( "×", array ) > 0 ) {
        return array.indexOf("×");
    }

    if ( jQuery.inArray( "÷", array ) > 0 ) {
        return array.indexOf("÷");
    }

    if ( jQuery.inArray( "+", array ) > 0 ) {
        return array.indexOf("+");
    }

    if ( jQuery.inArray( "-", array ) > 0 ) {
        return array.indexOf("-");
    }

    return false;
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

function toDecimal(vigesimal) {
    return parseFloat(vigesimal, 20).toString(10);
}

function toDecimal2(decimal) {    
    var vigesimal = decimal.toString(20);
    return parseInt(vigesimal, 20);
}

function toVigesimal(decimal) {
    return decimal.toString(20).toString(10);
}

function getKeyByValue(object, value) { 
    return Object.keys(object).find(
        key => object[key] === value
    );
}

function ki_encode(dec_number) {
    var vig_number = toVigesimal( Math.abs(dec_number) );

    // In case the vigesimal result have multiple characters
    var array = vig_number.split('');
    var x = '';
    for (let i=0; i<array.length; i++) {
        x += simbolos[ array[i] ];
    }

    return x;
}

function ki_decode(simbolo) {
    return getKeyByValue(simbolos, simbolo)
}

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