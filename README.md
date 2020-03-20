# chat-front-end

Instalando Local o chat

1 - Publicar a pasta "chat" no servidor IIS ou Apache

Estamos utilizando por padrão a url:
http://localhost:80/chat/

Se precisar alterar a url, edite o arquivo:
chat/js/init.js

Altere a propriedade src:
iframe.src = 'http://localhost:80/chat/index.html';


2 - Publicar a pasta "meusite" no servidor IIS ou Apache

Estamos utilizando por padrão a url:
http://localhost:80/meusite/

Se precisar alterar a url do chat, edite o arquivo:
meusite/index.html

Altere a propriedade src:
<footer>

    <script type="text/javascript">
        $(document).ready(function() {
        });
    </script>

    <script type="text/javascript" src="http://localhost:80/chat/js/init.js?"document></script>

</footer>

3 - Com os dois sites publicados, abra a url do "meusite".

PRONTO! Você vai ver o chat no rodapé à direita.
