# Ajustar a ser realizados

## Matemática
- tratar numeros fracionados
- tratar numeros negativos
- √

## Documentação
- arrumar readme (ingles e bem descrito)
- documentar funções
- fazer fluxograma
- meta authors
- disseminar

## Estrutura
- quebrar algumas funções em arquivos (helpers deixar separados)
- android
- nomes das letras

## View
- tirar css do html
- tableless
- maxlenght
- tirar center

# bugs conhecidos
- ajustar várias formulas (+-* dá problema)
- zeros a esquerda

## Organizar
- novos botões . ( ) ^
- 3.33 ????
    - retornar aproximadamente
- calculadora cientifica e financeira
- arrumar readme
- parseInt(text).toString(20) // verificar se fica mais fácil KI_encode e KI_decode
- unificar vetor de caracteres no ki_encode e ki_decode
- baixar CDNs
- criar diagrama

// So calcular se tiver operacao

//funcoes
    function printResult
    function calcularController
    function posicaoOperador
    function ajustaTermo
    function add
    function subtract
    function multiply
    function division
    function ki_to_decimal_expression
    function is_Int
    function isNegative
    function ki_encode
    function integer_Base10toBase20
    function float_Base10toBase20
    function ki_decode

// eventos
    /* Coloca os numeros e simbolos no palco */
    Clicar em calculadora
        $("#calculadora .numeral").click
    /* Botao limpar */
    Clicar em limpar
        $("#limpar").click
    /* Adiciona simbolo da operacao */
    Clicar em operacao
        $(".operacao").click
    /* Calcula */
    Clicar em calcular
        $("#calcular").click


ALGORITMO



recebe valor
calcula valor das casas
recebe operação
calcula v1 op v2
converte dec -> KI
exibe KI e dec



bug: não permite começar com número negativo
popover no resultado


contas que causam resultados incoerentes
// 1/1000










atualizar valor termo
    recebe expressao
    quebra expressao por operacao
    pega ultimo termo
    converte ultimo termo de KI para decimal
    substitui ultimo termo
    concatena termos
    retorna





<script>
    var expressao = "421+111";

    corrigeUltimoTermo(expressao);



    function converte(pa) {
        pa = parseInt(pa, 20);
        return pa.toString(10);
    }

    function quebra(expressao) {
        return expressao.split("+");
    }

    function corrigeUltimoTermo(expressao) {
        var vetor = quebra(expressao);

        var valor = converte( vetor[1] );

        var novoValor = converte(valor);
        vetor[1] = novoValor;

        return vetor;
}
</script>



