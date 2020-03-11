# Ajustes a serem realizados

## Matemática
- tratar numeros fracionários
- tratar numeros negativos
- calculadora cientifica e financeira
    - √
- novas funções . ( ) ^
- adicionar contas decimais (1.1+1.1)

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