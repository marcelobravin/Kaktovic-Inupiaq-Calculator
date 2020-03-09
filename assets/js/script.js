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
            if (lastChar == "+" || lastChar == "-" || lastChar == "×" || lastChar == "÷") { // blocks consecutive operators
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

    /* Button clear */
    $("#limpar").click(function()
    {
        $("#termo, #resposta").val("");
        $("#termo, #resposta").attr('title', '');
    });
});

function preparaCampo()
{
    var titulo = $("#termo").attr('title');
    var lastOperatorTitle = ultimoOperador(titulo);
    var tituloInicial = titulo.substring(0,lastOperatorTitle+1);

    let valor = $("#termo").val();
    var lastOperatorValue = ultimoOperador(valor);
    var ultimoValorVigesimal = valor.substring(lastOperatorValue+1, valor.length);

    var corrigeUltimoTituloDecimal = corrigeTitulo(ultimoValorVigesimal);
    $("#termo").attr('title', tituloInicial +""+ corrigeUltimoTituloDecimal);
}

/**
 * Ordena posicao dos operadores
 * @param array
 * @returns index
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
        concateno += ki_decode(v_term[i]);
    }
    
    var tituloDecimal = toDecimal( concateno );
    return tituloDecimal.toString();
}

/**
 * Print Result
 * @param dec_number
 */
function printResult(dec_number)
{
    var num = ki_encode( dec_number );
    var sinal = isNegative(dec_number); 
    $("#resposta").val( sinal +""+ num );
    $("#resposta").attr( 'title', dec_number.toString() );
}

// ----------------------------------------------
//  CONTROLLER =
// ----------------------------------------------

function calcularController(decimal_expression)
{
    var newString = decimal_expression.replace(/÷/g, '/'); // corrects symbol
    newString     = newString.replace(/×/g, '*'); // corrects symbol
    var decimal_result = eval(newString);
    printResult(decimal_result);
}