$(document).ready(function(){
    // Shows tooltip of the buttons
    $('[data-toggle="popover"]').popover();

    // Insert the numbers clicked on the calculating area
    $(".numeral").click(function()
    {
        var ki_clicked_simbol = $(this).text();
        var valor  = $("#termo").val();

        var ki_expression = valor +""+ ki_clicked_simbol;
        $("#termo").val(ki_expression);
        preparaCampo();
    });

    // Add dot symbol
    $("#dot").click(function()
    {
        var ki_clicked_simbol = ".";
        var valor  = $("#termo").val();

        // count dots on the last term
        var ultimoValorVigesimal = getLastTerm(valor);
        if ( existePontos(ultimoValorVigesimal)>0 ) {
            return false;
        }

        // It blocks adding consecutive dot symbols
        let lastChar = valor.substr(-1,1);
        if (lastChar == ".") {
            return false;
        } else {
            // It blocks adding consecutive operation
            if (lastChar == "+" || lastChar == "-" || lastChar == "×" || lastChar == "÷" || lastChar == "") {
                ki_clicked_simbol = ki_encode('0') +ki_clicked_simbol;
            }
        }

        var ki_expression = valor +""+ ki_clicked_simbol;
        $("#termo").val(ki_expression);
        preparaCampo();
    });

    // Add operation symbol
    $(".operacao").click(function()
    {
        var operacaoSelecionada = $(this).text();
        let lastChar = $("#termo").attr("title").substr(-1,1);

        // The first char may be a minus symbol
        if (lastChar == "" && operacaoSelecionada!='-') {
            return false;
        } else {
            // It blocks adding consecutive operation symbols
            if (lastChar == "+" || lastChar == "-" || lastChar == "×" || lastChar == "÷" || lastChar == ".") { // blocks consecutive operators
                return false;
            }
        }

        $("#termo").val( $("#termo").val()+operacaoSelecionada );
        $("#termo").attr( 'title',  $("#termo").attr( 'title')+operacaoSelecionada );
    });

    // Perform calculation
    $("#calcular").click(function()
    {
        var dec_termo = $("#termo").attr('title');
        if ( dec_termo == "" ) {
            return false;
        }
        var decimal_expression = $("#termo").attr('title');
        calcularController( decimal_expression );
    });

    // Button clear
    $("#limpar").click(function()
    {
        $("#termo, #resposta").val("");
        $(" #conferencia").text("");
        $("#termo, #resposta, #simboloResultado").attr('title', '');
        $("#simboloResultado").text( "=" );
    });
});

function preparaCampo()
{
    var titulo = $("#termo").attr('title');
    var lastOperatorTitle = ultimoOperador(titulo);
    var tituloInicial = titulo.substring(0,lastOperatorTitle+1);

    let valor = $("#termo").val();
    ultimoValorVigesimal = getLastTerm(valor);

    // var corrigeUltimoTituloDecimal = corrigeTitulo(ultimoValorVigesimal);
    var corrigeUltimoTituloDecimal = getTerms(ultimoValorVigesimal);
    $("#termo").attr('title', tituloInicial +""+ corrigeUltimoTituloDecimal);
}

function corrigeTitulo(vigesimalNumber)
{
    let v_term = vigesimalNumber.toString().split('');
    var concateno = "";
    for (let i=0; i<v_term.length; i++) {
        if ( v_term[i] == '.' ) {
            concateno += '.';
        } else {
            concateno += ki_decode(v_term[i]);
        }
    }

    if (concateno >= 10) {
        concateno = toVigesimal(concateno); // causa erro na conversão para decimal
    }
    var d = toDecimal(concateno);
    return d;
}

/**
 * Print Result
 * @param dec_number
 */
function printResult(dec_number)
{
    var ki_num = ki_encode( dec_number );
    var sinal = isNegative(dec_number); 
    $("#resposta").val( sinal +""+ ki_num );
    $("#resposta").attr( 'title', dec_number.toString() );

    var simboloResultado = "=";
    var descricaoResultado = "";

    if (dec_number.toString().length >= 18) {
        simboloResultado = "≅";
        descricaoResultado = "aproximadamente";
    }

    $("#conferencia").text($("#termo").attr("title") +""+ simboloResultado +""+ dec_number)

    $("#simboloResultado").text( simboloResultado );
    $("#simboloResultado").attr("title", descricaoResultado );
}

// ----------------------------------------------
//  CONTROLLER =
// ----------------------------------------------
function calcularController(decimal_expression)
{
    var newString = corrigeSimbolo(decimal_expression);
    // executarCalculo(newString);

    var decimal_result = eval(newString);
    printResult(decimal_result);
}

function subtracaoDecimal () {
    // var termo1 = Math.pow(1, 20)*2;
    var termo1 = 10;
    var termo2 = "0.1";

    termo1 = termo1.toString(20);
    termo2 = termo2.toString(20);

    var sub = termo1 - termo2;
    sub = sub.toString(20);
    sub = toDecimal(sub);

    console.log(termo1 +"-"+ termo2);
    return sub;
}

function getTerms(x) {
    var v_termExterno = x.split(".");
    var resposta = "";

    // quebra por ponto para numeros fracionarios
    for (let i=0; i<v_termExterno.length; i++) {
        var somatorio = "";
        var v_term = v_termExterno[i].split("");

        // itera pelos caracteres
        for (let j=0; j<v_term.length; j++) {

            // contabiliza somatorio das potencias
            if (j==0) {
                somatorio += ki_decode(v_term[j]);
            } else {
                somatorio = parseInt(somatorio)+parseInt(ki_decode(v_term[j]) * Math.pow(20,j));
            }
        }
        
        // devolve a virgula
        if (v_termExterno.length == 2 & i==1) {
            resposta += ".";
        }

        resposta += somatorio;
    }

    return resposta;
}







/**
 * calcularController
 * @param st_term
 * @returns {boolean}
 */
function executarCalculo ( st_term )
{
    console.log(st_term);

    let v_term = st_term.split(' ');
    let k_operator = posicaoOperador(v_term);

    if (!k_operator) {
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
    executarCalculo (st_term2);
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
