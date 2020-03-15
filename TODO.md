# Ajustes a serem realizados

## Matemática
- tratar numeros fracionários
    - adicionar contas entre frações (1.1+1.1)
OK - tratar numeros negativos
- calculadora cientifica e financeira
    - √
- novas funções . ( ) ^

## Documentação
- arrumar readme (ingles e bem descrito)
- documentar funções
- fazer fluxograma
- meta authors
- criar diagrama

## Estrutura
- android
- nomes das letras

## View
- tirar css do html
- tableless
- maxlenght
- tirar center
- baixar CDNs
    https://code.jquery.com/jquery-3.4.1.slim.min.js
    https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js
    https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js

# bugs conhecidos
- zeros a esquerda

## Organizar
- disseminar
- substituir operaçao ao clicar em operações sequenciais
- popover no resultado
- código em ingles
- internacionalização



FACIL
    maxlenght termos
    trocar op
    pow
    rad
    favicon
    CDN



I always use the CDN (Content Delivery Network) from Google. But just in case it's offline:

Grab Google CDN's jQuery and fallback to local if necessary
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
    <script>!window.jQuery && document.write('<script src="jquery-1.4.2.min.js"><\/script>')</script>




script href="jquery.com/3/min.js" || local/js.min



- verificar divisão
    contas que causam resultados incoerentes
    1 / 0.0000000001 ????????????? pq dá um numero gigante?
        “Dividing by 0.1 is the same as multiplying by 10. This is because there are 10 tenths in a whole. Dividing by 0.01 is the same as multiplying by 100. This is because 0.01 is one hundredth and there are a hundred hundredths in a whole."
















https://www.youtube.com/watch?v=pPGKI_S1_kk


bug conhecido
    ok - . + .
         .1 + .1

    ok-0.1+0.2 = 1.3
        0.30000000000000004

    solução davi
        quebrar pelo ponto e fazer sem float
        substituir eval por DaviEval

    https://stackoverflow.com/questions/588004/is-floating-point-math-broken


    ok - .+

    0.19+0.x1 (está comendo zeros a esquerda do ponto decimal)


     18 numeros 


    1-0.1 =0.9 deveria ser 0.19



    .19;


    421.421+0.842 calculos interpretam q 10x0.1 já aumenta, deveria ser 20



    exibir valores das casas no resultado
    ///
    1 unidade
    1 20
    1 400




    TODO
- nomes das letras
- Colocar os links de contato dos devs