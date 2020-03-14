// ----------------------------------------------
//  VIEWS =
// ----------------------------------------------
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

    var corrigeUltimoTituloDecimal = corrigeTitulo(ultimoValorVigesimal);
    $("#termo").attr('title', tituloInicial +""+ corrigeUltimoTituloDecimal);
}

/**
 * Return position of the last operator
 * @param string
 * @returns int
 */
function ultimoOperador( str )
{
    if ( typeof str != undefined) {
        var v_indexes = [];
        if ( str.lastIndexOf("×") > 0 )
            v_indexes.push( str.lastIndexOf("×") );

        if ( str.lastIndexOf("÷") > 0 )
            v_indexes.push( str.lastIndexOf("÷") );

        if ( str.lastIndexOf("+") > 0 )
            v_indexes.push( str.lastIndexOf("+") );

        if ( str.lastIndexOf("-") > 0 )
            v_indexes.push( str.lastIndexOf("-") );

        var biggestNumber = Math.max.apply(Math, v_indexes);
        return biggestNumber;
    }
    
    return false;
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

    var v = toVigesimal(concateno);
    var d = toDecimal(v);
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
    
    $("#simboloResultado").text( simboloResultado );
    $("#simboloResultado").attr("title", descricaoResultado );
}

// ----------------------------------------------
//  CONTROLLER =
// ----------------------------------------------
function calcularController(decimal_expression)
{
    var newString = corrigeSimbolo(decimal_expression);
    var decimal_result = eval(newString);
    
    printResult(decimal_result);
}