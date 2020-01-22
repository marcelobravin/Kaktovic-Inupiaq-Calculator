$(document).ready(function(){

    /* Coloca os numeros e simbolos no palco */
    $("#calculadora .numeral").click(function() 
    {
        $("#termo").removeAttr('title');
        var simb = $(this).text();
        var x = $("#termo").val();
        var expression = x+""+simb; 
        var dec_termo = ki_to_decimal_expression(expression)
        $("#termo").val(expression);
        $("#termo").attr({ 'title': dec_termo.toString() });
    });

    /* Botao limpar */
    $("#limpar").click(function(){
        $("#termo, #resposta").val("");
        $("#termo").removeAttr('title');
        $("#resposta").removeAttr('title');
    });

    /* Adiciona simbolo da operacao */
    $(".operacao").click(function(){
        var operacaoSelecionada = $(this).text();
        var x = $("#termo").val();
        $("#termo").val(x+""+  operacaoSelecionada);
    });

    /* Calcula */
    $("#calcular").click(function(){
        $("#resposta").removeAttr('title');
        var ki_termo = $("#termo").val();
        var dec_termo = ki_to_decimal_expression(ki_termo)
        
        calcularController ( dec_termo );
    });

});

function calcularController ( stringConta ) 
{
    var vetorConta = stringConta.split(' ');
    var keyOperador = posicaoOperador(vetorConta)

    if(!keyOperador) {
        $("#resposta").attr({ 'title': stringConta.toString() });
        $("#resposta").val( ki_encode( stringConta.toString() ) );
        return true;
    }

    var n1 = vetorConta[keyOperador - 1];
    var n2 = vetorConta[keyOperador + 1];
    var op = vetorConta[keyOperador];

    switch (op) {
        case "*":
            var resultado = multplicarService(n1, n2)
        break;

        case "/":
            var resultado = dividirService(n1, n2)
        break;

        case "+":
            var resultado = somaService(n1, n2)
        break;

        case "-":
            var resultado = subtrairService(n1, n2)
        break;
    }

    var stringConta2 = ajustaTermo(vetorConta, parseInt(keyOperador), resultado )

    calcularController (stringConta2)

}

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

function ajustaTermo ( vetorConta, keyOperador, resultado ) 
{
    var min = keyOperador - 1;

    for (let i = 0; i < vetorConta.length; ++i) {
        
        if (i == min) {
            vetorConta[min] = resultado.toString()
        }

        if (i == keyOperador) {
            vetorConta.splice(i, 2);
        }
    }

    return  vetorConta.join(' ');

}

function decimal_to_ki_expression ( str ) 
{

    var vetorConta = str.split(' ');

    for (let i = 0; i < vetorConta.length; i++) {
        var number = array[i].isInteger();
        vetorConta[i] = ki_encode(number)
    }

    return  vetorConta.join(' ');

}

function ki_to_decimal_expression( ki_expressao ) {

    var vetorConta = ki_expressao.split(' ');

    for (let i = 0; i < vetorConta.length; i++) {

        str = ki_decode(vetorConta[i])

        if(is_Int(str)){
             vetorConta[i] = str
        } else {
            vetorConta[i] = vetorConta[i]    
        }
    }

    return  vetorConta.join(' ');
}

function is_Int(num) 
{
    if (typeof num !== 'number') {
        return false; 
    }
   
   return !isNaN(num) && parseInt(Number(num)) == num && !isNaN(parseInt(num, 10));
 }

function ki_encode ( dec_number ) 
{
    var simbulos = {
           0 : "",   1 : "",   2 : "",   3 : "",   4 : "",   5 : "",   6 : "",   7 : "",   8 : "",   9 : ""
        , 10 : "",  11 : "",  12 : "",  13 : "",  14 : "",  15 : "",  16 : "",  17 : "",  18 : "",  19 : ""
    }
    
    // Converter de base 10 para base 20
    var numeros = []
    var simbs = [];

    function transformBase10toBase20(dec_num) { // 20
        
        var resultado = parseInt(dec_num / 20)    
        var sobra     = dec_num % 20
    
        numeros.push(sobra);
        
        if (resultado <= 0) {
            return "false"
        }
        
        transformBase10toBase20(resultado)
    }

    transformBase10toBase20(dec_number)

    for (let i = 0; i < numeros.length; i++) {
        simbs[i] = simbulos[numeros[i]]
    }
    
    return simbs.reverse().join('');
}


function ki_decode ( ki_number ) 
{
    var v_ki = ki_number.split('');

    var numeros = {
          "" :  0, "" :  1, "" :  2, "" :  3, "" :  4, "" :  5, "" :  6, "" :  7, "" :  8, "" :  9
        , "" : 10, "" : 11, "" : 12, "" : 13, "" : 14, "" : 15, "" : 16, "" : 17, "" : 18, "" : 19
    }

    // Converter de base 10 para base 20
    let p_math = 1;
    let v_calc = [1];
    let v_dec  = [];
    let v_prod = [];

    // monta base de multiplicação
    for (let i = 1; i < v_ki.length; i++) {
        p_math    = parseInt(p_math * 20)
        v_calc[i] = p_math
    }
    
    // converte caracteres
    for (let i = 0; i < v_ki.length; i++) {
        v_dec[i] = numeros[v_ki[i]];
        v_prod[i] = v_dec[i] * v_calc[i]
    }

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    // console.log(v_calc, v_dec, v_prod, v_prod.reduce(reducer))
    return v_prod.reduce(reducer)
}

function somaService ( n1, n2 ) 
{
    return parseInt(n1) + parseInt(n2);
}

function subtrairService ( n1, n2 ) 
{
    return parseInt(n1) - parseInt(n2);
}

function multplicarService ( n1, n2 ) 
{
    return parseInt(n1) * parseInt(n2);
}

function dividirService ( n1, n2 ) 
{
    return parseInt(n1) / parseInt(n2);

    if ( resposta > 19 ) {
        sobra = resposta % 20;
        resposta = parseInt(resposta / 20);
    }

    if (op == '/') {
        console.log(" divisão "+ resposta + " sobra: "+sobra);
    }
    console.log( respostaDecimal );
}