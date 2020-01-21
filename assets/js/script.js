$(document).ready(function(){

    /* Coloca os numeros e simbolos no palco */
    $("#calculadora .numeral").click(function() {
        var simb = $(this).text(); // simbolo selecionado
        var num = $(this).attr('title'); // numero do simbolo selecionado

        console.log( num );

        var x = $("#termo").val(); // simbolos contidos no palco
        // var y = $("#decimal .termo").val(); // numeros contidos no palco

        $("#termo").val(x+""+simb);
        // $("#decimal .termo").val(y+""+num);
    });

    /* Botao limpar */
    $("#limpar").click(function(){
        $("#termo, #resposta").val("");
    });

    /* Adiciona simbolo da operacao */
    $(".operacao").click(function(){
        var operacaoSelecionada = $(this).text();

        var x = $("#termo").val();
        // var y = $("#decimal .termo").val();

        $("#termo").val(x+""+  operacaoSelecionada);
        // $("#decimal .termo").val(y+""+ operacaoSelecionada);
    });

    /* Calcula */
    /* TODO multiplas operacoes */
    $("#calcular").click(function(){
        // var res = $("#decimal .termo").val();
       
        // return false;

        // var equacao = KITodecimalHelper( $("#termo").val() );




        calcularController ( x );

    });

});




function calcularController (stringConta) {

    
    var vetorConta = stringConta.split(' ');

    var keyOperador = posicaoOperador(vetorConta)

    if(!keyOperador) {
//        $("#resposta").val(decimalToKIHelper(stringConta)); //////////// aguardando 
        $("#resposta").val(stringConta);

        return false;
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

    // console.log(stringConta2);

    calcularController (stringConta2)

}

function posicaoOperador(array) {


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

function ajustaTermo(vetorConta, keyOperador, resultado) {

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



function decimal_to_ki_expression ( str ) {

    var vetorConta = str.split(' ');

    for (let i = 0; i < vetorConta.length; i++) {
        var number = array[i].isInteger();
        vetorConta[i] = ki_encode(number)
    }

    return  vetorConta.join(' ');

}


function ki_to_decimal_expression( str ) {
    var vetorConta = str.split(' ');

    for (let i = 0; i < vetorConta.length; i++) {
        var number = array[i].isNaN();
        vetorConta[i] = ki_dencode(number)
    }

    return  vetorConta.join(' ');
}





function returnKI(dec_num) {
    var resp = convertDecimalToKI(dec_num);

    var numeroKI = "";
    
    resp.each(function(){
        numeroKI += ki_encode ( dec_number );
    });

    return numeroKI;
}





function ki_encode ( dec_number ) {

    var simbulos = {
           0 : "",  1 : "",  2 : "",  3 : "",  4 : "",  5 : "",  6 : "",  7 : "",  8 : "",  9 : ""
        , 10 : "", 11 : "", 12 : "", 13 : "", 14 : "", 15 : "", 16 : "", 17 : "", 18 : "", 19 : ""
    }
    
    // Converter de base 10 para base 20
    var numeros = []
    var simbs = [];

    function transformBase20(dec_num) { // 20
        
        var resultado = parseInt(dec_num / 20)    
        var sobra     = dec_num % 20
    
        numeros.push(sobra);
        
        if (resultado <= 0) {
            return "false"
        }
        
        transformBase20(resultado)
    }

    transformBase20(dec_number)

    for (let i = 0; i < numeros.length; i++) {
        simbs[i] = simbulos[numeros[i]]
    }
    
    $("#resposta").val(simbs.reverse().join(''));
}


function ki_decode ( ki_number ) {
    
    var numeros = {
         "" :  0, "" :  1, "" :  2, "" :  3, "" :  4, "" :  5, "" :  6, "" :  7, "" :  8, "" :  9
        ,"" : 10, "" : 11, "" : 12, "" : 13, "" : 14, "" : 15, "" : 16, "" : 17, "" : 18, "" : 19
    }

    // if( ki_number < 20 && ki_number > -1){
        return numeros[ki_number];
    // }

    return false;
    
    
    
    
    var vetorSimbolos = [
        { simbolo: ""   , valor:  0 }
        , { simbolo: "" , valor:  1 }
        , { simbolo: "" , valor:  2 }
        , { simbolo: "" , valor:  3 }
        , { simbolo: "" , valor:  4 }
        , { simbolo: "" , valor:  5 }
        , { simbolo: "" , valor:  6 }
        , { simbolo: "" , valor:  7 }
        , { simbolo: "" , valor:  8 }
        , { simbolo: "" , valor:  9 }
        , { simbolo: "" , valor: 10 }
        , { simbolo: "" , valor: 11 }
        , { simbolo: "" , valor: 12 }
        , { simbolo: "" , valor: 13 }
        , { simbolo: "" , valor: 14 }
        , { simbolo: "" , valor: 15 }
        , { simbolo: "" , valor: 16 }
        , { simbolo: "" , valor: 17 }
        , { simbolo: "" , valor: 18 }
        , { simbolo: "" , valor: 19 }
    ];

    var n  = vetorSimbolos[resposta]['simbolo'];
    // if ( respostaDecimal > 19 ) {
    //     n += vetorSimbolos[sobra]['simbolo'];
    // }

    return n;
}



function somaService(n1, n2) {
    return parseInt(n1) + parseInt(n2);
}


function subtrairService(n1, n2) {
    return parseInt(n1) - parseInt(n2);
}


function multplicarService(n1, n2) {
    return parseInt(n1) * parseInt(n2);
}


function dividirService(n1, n2) {
    return parseInt(n1) / parseInt(n2); ///////////////////////


    if ( resposta > 19 ) {
        sobra = resposta % 20;
        resposta = parseInt(resposta / 20);
    }


    if (op == '/') {
        console.log(" divisão "+ resposta + " sobra: "+sobra);
    }
    console.log( respostaDecimal );
}


