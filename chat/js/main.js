/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.0
 * Docs: http://rocha.la/jQuery-slimScroll
 */
(function(f) {
    jQuery.fn.extend({
        slimScroll: function(h) {
            var a = f.extend({ width: "auto", height: "250px", size: "7px", color: "#000", position: "right", distance: "1px", start: "top", opacity: 0.4, alwaysVisible: !1, disableFadeOut: !1, railVisible: !1, railColor: "#333", railOpacity: 0.2, railDraggable: !0, railClass: "slimScrollRail", barClass: "slimScrollBar", wrapperClass: "slimScrollDiv", allowPageScroll: !1, wheelStep: 20, touchScrollStep: 200, borderRadius: "7px", railBorderRadius: "7px" }, h);
            this.each(function() {
                function r(d) {
                    if (s) {
                        d = d ||
                            window.event;
                        var c = 0;
                        d.wheelDelta && (c = -d.wheelDelta / 120);
                        d.detail && (c = d.detail / 3);
                        f(d.target || d.srcTarget || d.srcElement).closest("." + a.wrapperClass).is(b.parent()) && m(c, !0);
                        d.preventDefault && !k && d.preventDefault();
                        k || (d.returnValue = !1)
                    }
                }

                function m(d, f, h) {
                    k = !1;
                    var e = d,
                        g = b.outerHeight() - c.outerHeight();
                    f && (e = parseInt(c.css("top")) + d * parseInt(a.wheelStep) / 100 * c.outerHeight(), e = Math.min(Math.max(e, 0), g), e = 0 < d ? Math.ceil(e) : Math.floor(e), c.css({ top: e + "px" }));
                    l = parseInt(c.css("top")) / (b.outerHeight() - c.outerHeight());
                    e = l * (b[0].scrollHeight - b.outerHeight());
                    h && (e = d, d = e / b[0].scrollHeight * b.outerHeight(), d = Math.min(Math.max(d, 0), g), c.css({ top: d + "px" }));
                    b.scrollTop(e);
                    b.trigger("slimscrolling", ~~e);
                    v();
                    p()
                }

                function C() { window.addEventListener ? (this.addEventListener("DOMMouseScroll", r, !1), this.addEventListener("mousewheel", r, !1), this.addEventListener("MozMousePixelScroll", r, !1)) : document.attachEvent("onmousewheel", r) }

                function w() {
                    u = Math.max(b.outerHeight() / b[0].scrollHeight * b.outerHeight(), D);
                    c.css({ height: u + "px" });
                    var a = u == b.outerHeight() ? "none" : "block";
                    c.css({ display: a })
                }

                function v() {
                    w();
                    clearTimeout(A);
                    l == ~~l ? (k = a.allowPageScroll, B != l && b.trigger("slimscroll", 0 == ~~l ? "top" : "bottom")) : k = !1;
                    B = l;
                    u >= b.outerHeight() ? k = !0 : (c.stop(!0, !0).fadeIn("fast"), a.railVisible && g.stop(!0, !0).fadeIn("fast"))
                }

                function p() { a.alwaysVisible || (A = setTimeout(function() { a.disableFadeOut && s || (x || y) || (c.fadeOut("slow"), g.fadeOut("slow")) }, 1E3)) }
                var s, x, y, A, z, u, l, B, D = 30,
                    k = !1,
                    b = f(this);
                if (b.parent().hasClass(a.wrapperClass)) {
                    var n = b.scrollTop(),
                        c = b.parent().find("." + a.barClass),
                        g = b.parent().find("." + a.railClass);
                    w();
                    if (f.isPlainObject(h)) {
                        if ("height" in h && "auto" == h.height) {
                            b.parent().css("height", "auto");
                            b.css("height", "auto");
                            var q = b.parent().parent().height();
                            b.parent().css("height", q);
                            b.css("height", q)
                        }
                        if ("scrollTo" in h) n = parseInt(a.scrollTo);
                        else if ("scrollBy" in h) n += parseInt(a.scrollBy);
                        else if ("destroy" in h) {
                            c.remove();
                            g.remove();
                            b.unwrap();
                            return
                        }
                        m(n, !1, !0)
                    }
                } else {
                    a.height = "auto" == a.height ? b.parent().height() : a.height;
                    n = f("<div></div>").addClass(a.wrapperClass).css({
                        position: "relative",
                        overflow: "hidden",
                        width: a.width,
                        height: a.height
                    });
                    b.css({ overflow: "auto", width: a.width, height: a.height });
                    var g = f("<div></div>").addClass(a.railClass).css({ width: a.size, height: "100%", position: "absolute", top: 0, display: a.alwaysVisible && a.railVisible ? "block" : "none", "border-radius": a.railBorderRadius, background: a.railColor, opacity: a.railOpacity, zIndex: 90 }),
                        c = f("<div></div>").addClass(a.barClass).css({
                            background: a.color,
                            width: a.size,
                            position: "absolute",
                            top: 0,
                            opacity: a.opacity,
                            display: a.alwaysVisible ?
                                "block" : "none",
                            "border-radius": a.borderRadius,
                            BorderRadius: a.borderRadius,
                            MozBorderRadius: a.borderRadius,
                            WebkitBorderRadius: a.borderRadius,
                            zIndex: 99
                        }),
                        q = "right" == a.position ? { right: a.distance } : { left: a.distance };
                    g.css(q);
                    c.css(q);
                    b.wrap(n);
                    b.parent().append(c);
                    b.parent().append(g);
                    a.railDraggable && c.bind("mousedown", function(a) {
                        console.log(a);
                        console.log(window);
                        console.log($('#conversa .slimScrollBar'));
                        var b = f(document);
                        y = !0;
                        t = parseFloat(c.css("top"));
                        pageY = a.pageY;
                        b.bind("mousemove.slimscroll", function(a) {
                            currTop = t + a.pageY - pageY;
                            c.css("top", currTop);
                            m(0, c.position().top, !1)
                        });
                        b.bind("mouseup.slimscroll", function(a) {
                            y = !1;
                            p();
                            b.unbind(".slimscroll")
                        });
                        return !1
                    }).bind("selectstart.slimscroll", function(a) {
                        a.stopPropagation();
                        a.preventDefault();
                        return !1
                    });
                    g.hover(function() { v() }, function() { p() });
                    c.hover(function() { x = !0 }, function() { x = !1 });
                    b.hover(function() {
                        s = !0;
                        v();
                        p()
                    }, function() {
                        s = !1;
                        p()
                    });
                    b.bind("touchstart", function(a, b) { a.originalEvent.touches.length && (z = a.originalEvent.touches[0].pageY) });
                    b.bind("touchmove", function(b) {
                        k || b.originalEvent.preventDefault();
                        b.originalEvent.touches.length &&
                            (m((z - b.originalEvent.touches[0].pageY) / a.touchScrollStep, !0), z = b.originalEvent.touches[0].pageY)
                    });
                    w();
                    "bottom" === a.start ? (c.css({ top: b.outerHeight() - c.outerHeight() }), m(0, !0)) : "top" !== a.start && (m(f(a.start).position().top, null, !0), a.alwaysVisible || c.hide());
                    C()
                }
            });
            return this
        }
    });
    jQuery.fn.extend({ slimscroll: jQuery.fn.slimScroll })
})(jQuery);

(function($) {
    var allowed_extensions = ["psd", "ai", "eps", "pptx", "rtf", "wma", "odp", "ods", "sxw", "sxi", "sxc", "dwg", "xps", "jpg", "jpeg", "png", "gif", "svg", "pdf", "doc", "docx", "key", "ppt", "odt", "xls", "xlsx", "zip", "rar", "mp3", "m4a", "ogg", "wav", "mp4", "mov", "wmv", "avi", "mpg", "ogv", "3gp", "3g2", "mkv", "txt", "ico", "exe", "csv", "java", "js", "xml", "unx", "ttf", "font", "css"];
    var sb_user_arr = { id: "", img: "", username: "", email: "" };
    var new_user_id = getRandomInt(9999999, 99999999);
    var current_cnt;
    var isChat = false;
    var real_time = false;
    var sounds = false;
    var audio;
    var isScrollBox = false;
    var msgCount = 999999;
    var sbInit = true;
    var sbInit_msg = true;
    var sbInit_agent_reply = true;
    var isGuest = false;
    var isNewGuest = false;
    var isWelcome = false;
    var welcomeShowed = false;
    var welcomeAlways = false;
    var isFollow = false;
    var isWpAdmin = false;
    var isSlack = false;
    var isPush = false;
    var isPushSent = false;
    var isFlash = false;
    var submitEnabled = true;
    var tabActive = true;
    var flashInterval;
    var flashMessage;
    var sb_main;
    var sb_plugin_url;
    var sb_plugin_ajax_url;
    var is_php = false;
    var lang_php = "";
    var wh = 0;
    var ww = 0;
    var chat_close = false;

    $(document).ready(function() {

        //VARIOUS
        sb_main = $("#sb-main");
        current_cnt = $("body");
        // autosize($(".sb-editor textarea"));
        wh = window.innerHeight;
        ww = window.innerWidth;
        chat_close = localStorage.getItem("chat_close");
        if (isEmpty(chat_close)) {
            chat_close = false;
        }
        if ($(sb_main).hasClass("sb-php")) {
            is_php = true;
        }

        if ($(".sb-chat-cnt").length) {
            isChat = true;
        }
        if ($("#sb-audio").length) {
            audio = $("#sb-audio")[0];
            sounds = true;
        }
        if (!isEmpty($(sb_main).attr("data-welcome"))) {
            isWelcome = true;
        }
        if (!isEmpty($(sb_main).attr("data-follow"))) {
            isFollow = true;
        }
        if (!isEmpty($(sb_main).attr("data-slack"))) {
            isSlack = true;
        }
        if (!isEmpty($(sb_main).attr("data-flash"))) {
            flashMessage = $(sb_main).attr("data-flash");
        } else {
            flashMessage = "New message received";
        }
        // if ($(sb_main).hasClass("sb-push")) {
        //     if (Push.Permission.get() == "granted") {
        //         isPush = true;
        //     } else {
        //         Push.Permission.request(function() { isPush = true; }, function() {});
        //     }
        // }
        if ($(sb_main).hasClass("sb-flash")) {
            isFlash = true;
        }
        if ($(sb_main).hasClass("welcome-always")) {
            welcomeAlways = true;
        }
        if ($("body.admin-bar").length) {
            isWpAdmin = true;
        }
        $(sb_main).css("display", "");

        $("body").on("hover", sb_main, function() {
            clearInterval(flashInterval);
        });

        // Abre a busca de arquivos
        $('.sb-chat-attach-file').click(function() {
            $('#file').click();
        });

        // Após a seleção do arquivo
        $('#file').change(function(event) {
            var file_data = event.target.files[0];
            var form_data = new FormData();
            form_data.append('file', file_data);
            $.ajax({
                url: 'json/file.json',
                dataType: 'text', // what to expect back from the PHP script, if anything
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                complete: function(php_script_response) {
                    alert(php_script_response); // display response from the PHP script, if any
                }
            });
        });

        $("#mensagemTextarea").keyup(function(e) {
            var code = e.which;
            if (code == 13) { // Enter
                $(".sb-chat-btn-submit path").removeAttr("fill");
                // envia a mensagem para o banco de dados
                sb_add_message('');
            } else if ($.isBlank($(this).val())) {
                $(".sb-chat-btn-submit path").removeAttr("fill");
            } else {
                $(".sb-chat-btn-submit path").attr("fill", "#3047EC");
            }
        });
        $("body").on("click", ".sb-chat-btn-submit", function(e) {
            sb_add_message('');
        });

        $("body").on("click", ".sb-chat-btn", function() {
            var t = $(".sb-chat-cnt");

            if ($(t).hasClass("sb-active")) {
                // Modificando o iframe do lado do cliente 
                window.parent.postMessage("closed", "*");

                $(t).removeClass("sb-active");
                set_chat_closed(true);

            } else {
                // Modificando o iframe do lado do cliente 
                window.parent.postMessage("open", "*");
                $(t).addClass("sb-active");
            }

            sb_update_view('primeiravez');
        });

        setInterval(() => {
            // tables
            $(".tables-group a").unbind();
            $(".tables-group a").on("click", function() {
                var label = $(this).attr('data-label');
                $(this).addClass('selected');
                sb_add_message(label);
            });
            // buttons
            $(".button-group button").unbind();
            $(".button-group button").on("click", function() {
                var texto = $(this).attr('data-texto');
                sb_add_message(texto);
            });
            // form
            $(".formulario .btn-atualizar").unbind();
            $(".formulario .btn-atualizar").on("click", function() {
                if (!validaForm()) {
                    sb_update_user();
                    escondeForm();
                }
            });
            $(".formulario .btn-voltar").unbind();
            $(".formulario .btn-voltar").on("click", function() {
                escondeForm();
            });
        }, 1000)
    });

    function exibeForm() {
        var sbchat = '<form class="formulario" style="padding: 30px;background-color: #F7F7F7; height: 100% !important;">' +
            '<span class="form_title"><b>Preencha os campos abaixo</b></span>' +
            '<div class="form-group">' +
            '<label for="nome" style="padding-top: 1rem;">Nome</label>' +
            '<input type="text" class="form-control" name="nome" id="nome" aria-describedby="nomeHelp" placeholder="Seu nome completo">' +
            '</div>' +
            '<div class="form-group">' +
            '<label for="email">E-mail</label>' +
            '<input type="email" class="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Seu melhor e-mail">' +
            '</div>' +
            '<label for="telefone">Telefone</label>' +
            '<div class="form-group">' +
            '<select class="no-margin form-control" name="select" style="padding-left: 5px;">' +
            '<option value="+55">+55 Brazil (Brasil)</option>' +
            '</select>' +
            '<input type="text" class="no-margin form-control" name="tel" id="tel" placeholder="(99) 9 9999-9999">' +
            '</div>' +
            '<div class="form-group">' +
            '<button type="button" class="btn btn-success btn-sm btn-atualizar">Avançar</button>' +
            '</div>' +
            '<div class="form-group">' +
            '<button type="button" class="btn btn-light btn-sm btn-voltar">Voltar</button>' +
            '</div>' +
            '</form>';
        $(".sb-chat.col-xs-12").append(sbchat);
        $(".formulario").show();
        $("#conversa_anterior").parent().hide();
        $(".sb-chat-editor").hide();
        $('#tel').mask("(99) 9999-9999?9");
    }

    function escondeForm() {
        $(".formulario").hide();
        $("#conversa_anterior").parent().show();
        $(".sb-chat-editor").show();
    }

    function validaForm() {
        var erro = false;
        if ($.isBlank($("#nome").val())) {
            erro = true;
            $("#nome").attr('style', 'border: 2px solid #ED008C');
            $("#nome").parent().attr('style', 'color: #ED008C; font-weight: bolder;');
        } else {
            $("#nome").removeAttr("style");
            $("#nome").parent().removeAttr("style");
        }
        if ($.isBlank($("#email").val())) {
            erro = true;
            $("#email").attr('style', 'border: 2px solid #ED008C');
            $("#email").parent().attr('style', 'color: #ED008C; font-weight: bolder;');
        } else {
            $("#email").removeAttr("style");
            $("#email").parent().removeAttr("style");
        }
        if ($.isBlank($("#tel").val())) {
            erro = true;
            $("#tel").attr('style', 'border: 2px solid #ED008C');
            $("#tel").parent().attr('style', 'color: #ED008C; font-weight: bolder;');
        } else {
            $("#tel").removeAttr("style");
            $("#tel").parent().removeAttr("style");
        }
        return erro;
    }

    function sb_update_user() {
        $.ajax({
            url: 'json/user.json',
            type: 'POST',
            data: $(".formulario").serialize(),
            dataType: "json",
            complete: function(response) {
                //console.log(response);
                response = {
                    isServer: false,
                    avatar: 'img/atendente.png',
                    mensagem: 'Dados atualizados com sucesso.',
                    dataEhora: '18/04/2019 às 12:53'
                }
                sb_update_chat(response);
            }
        });
    }

    // Salva a mensagem no banco de dados e depois atualiza a tela
    function sb_add_message(opcao) {
        //console.log(opcao);
        var mensagem = $("#mensagemTextarea").val();
        if (!isEmpty(opcao)) {
            mensagem = opcao;
        }
        $.ajax({
            url: 'json/send.json',
            type: 'POST',
            data: { 'mensagem': mensagem },
            dataType: "json",
            complete: function(response) {
                //console.log(response);
                response = {
                    isServer: false,
                    isCarousel: false,
                    isButtons: false,
                    isTables: false,
                    avatar: 'img/atendente.png',
                    mensagem: mensagem,
                    dataEhora: '18/04/2019 às 12:53',
                    carousel: [{
                        img: 'https://i.imgur.com/A1wilrA.jpg',
                        title: 'CHATBOT',
                        labelclick: 'QUERO TER UM CHATBOT',
                        link: "https://s3nd.com.br/#modulos",
                        mensagem: 'Tenha chatbots no seu site, landing pages, facebook messenger e campanhas diversas.'
                    }, {
                        img: 'https://i.imgur.com/A1wilrA.jpg',
                        title: 'SMS',
                        labelclick: 'SMS',
                        link: "https://s3nd.com.br/#menu-contato",
                        mensagem: 'Envie notificações via SMS para usuários que você possui telefone de contato.'
                    }],
                    buttons: ['CHATBOT', 'SMS', 'EMAIL', 'Outras opções'],
                    tables: [{
                        labelclick: 'Chatbot'
                    }, {
                        labelclick: 'SMS'
                    }, {
                        labelclick: 'E-mails'
                    }, {
                        labelclick: 'Outras opções'
                    }],
                }
                $("#mensagemTextarea").val('');
                sb_update_chat(response);
                if (response.isCarousel) {
                    sb_show_carousel(response);
                } else if (response.isButtons) {
                    sb_show_buttons(response);
                } else if (response.isTables) {
                    sb_show_tables(response);
                }
                // else {
                //     sb_update_chat(response);
                // }
            }
        });
    }

    function sb_show_buttons(response) {
        if (!isEmpty(response) && !isEmpty(response.buttons)) {
            var conversa =
                '<div class="sd-card">' +
                '<div class="button-group">' +
                '<div class="row">' +
                '<div class="col-sm-12 col-md-12" style="transform: translate3d(0px, 0px, 0px); padding-left: 7px; padding-right: 7px;">';

            // Conteúdo
            for (var texto in response.buttons) {
                conversa += '<button class="button action-text" data-texto="' + response.buttons[texto] + '">' + response.buttons[texto] + '</button>';
            }
            conversa += '</div></div></div></div>';

            $("#conversa").append(conversa);
            sb_update_view();
            scroll_to_last_message();
        }
    }

    function sb_show_tables(response) {
        if (!isEmpty(response) && !isEmpty(response.tables)) {
            var conversa =
                '<div class="sd-card">' +
                '<div class="tables-group">';

            // Conteúdo
            for (var table in response.tables) {
                conversa += '<a data-label="' + response.tables[table]['labelclick'] + '" class="table-action action-text">' + response.tables[table]['labelclick'] + '</a>';
            }
            conversa += '</div></div>';

            $("#conversa").append(conversa);
            sb_update_view();
            scroll_to_last_message();
        }
    }

    function sb_show_carousel(response) {
        if (!isEmpty(response) && !isEmpty(response.carousel)) {
            var randomico = parseInt((Math.random() * 100), 10);
            var conversa = '<div class="owl-carousel owl-theme carousel' + randomico + '" style="margin-bottom: 20px; width: 100% !important; float: left;">';

            // Conteúdo
            for (var carousel in response.carousel) {
                var img = 'https://i.imgur.com/A1wilrA.jpg';
                var title = 'CHATBOT';
                var mensagem = 'Tenha chatbots no seu site, landing pages, facebook messenger e campanhas diversas.';
                var labelclick = 'QUERO TER UM CHATBOT';
                var link = 'https://s3nd.com.br/';

                if (response.carousel[carousel]['img']) {
                    img = response.carousel[carousel]['img'];
                }
                if (response.carousel[carousel]['title']) {
                    title = response.carousel[carousel]['title'];
                }
                if (response.carousel[carousel]['mensagem']) {
                    mensagem = response.carousel[carousel]['mensagem'];
                }
                if (response.carousel[carousel]['labelclick']) {
                    labelclick = response.carousel[carousel]['labelclick'];
                }
                if (response.carousel[carousel]['link']) {
                    link = response.carousel[carousel]['link'];
                }

                conversa +=
                    '<div class="item">' +
                    '<img id="carousel-item-img' + randomico + '" src="' + img + '" style="width: 100%;">' +
                    '<div class="card">' +
                    '<div class="card-text">' +
                    '<h5 id="card-title' + randomico + '" class="card-title">' + title + '</h5>' +
                    '<div class="card-text-content">' +
                    '<p id="card-text' + randomico + '">' + mensagem + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="card">' +
                    '<div class="card-actions">' +
                    '<a id="card-action' + randomico + '" href="' + link + '" target="_blank " class="card-action action-text">' + labelclick + '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }
            conversa += '</div>';

            $("#conversa").append(conversa);
            sb_update_view();
            init_carousel('carousel' + randomico);
            scroll_to_last_message();
        }
    }

    // Atualia as mensagens do chat
    function sb_update_chat(response) {
        if (!isEmpty(response)) {
            var avatar = 'img/atendente.png';
            var mensagem = '';
            var dataEhora = '';
            if (response.avatar) {
                avatar = response.avatar;
            }
            if (response.mensagem) {
                mensagem = response.mensagem;
            }
            if (response.dataEhora) {
                dataEhora = response.dataEhora;
            }
            if (response.isServer) {
                $("#conversa").append(
                    '<div class="sb-card">' +
                    '<div class="sb-thumb">' +
                    '<img src="' + avatar + '">' +
                    '</div>' +
                    '<div class="sb-card-cnt">' +
                    '<div class="sb-message">' + mensagem + '</div>' +
                    '<div class="sb-time">' + dataEhora + '</div>' +
                    '</div>' +
                    '</div>');
            } else {
                $("#conversa").append(
                    '<div class="sb-card sb-card-right">' +
                    '<div class="sb-card-cnt">' +
                    '<div class="sb-message">' + mensagem + '</div>' +
                    '<div class="sb-time">' + dataEhora + '</div>' +
                    '</div>' +
                    '</div>');
            }
            sb_update_view();
            scroll_to_last_message();
        }
    }

    function sb_update_view(opcao) {
        // Atualiza as mensagens na tela
        $(".sb-list,.sb-chat-list").each(function() {
            var t = this;
            if (!isEmpty($(t).attr("data-scroll")) || isChat) {
                var _height = $(t).attr("data-height");
                var offset = parseInt($(t).attr("data-offset"));
                if (isChat) _height = 300;
                if (isEmpty(offset)) offset = 0;
                if (isWpAdmin) offset += 32;
                if (_height == "fullscreen") {
                    _height = wh - offset;
                } else {
                    _height = parseInt(_height);
                }
                if (_height > 200) {
                    setTimeout(function() {
                        var chat = $(".sb-chat");
                        isScrollBox = true;
                        var ch = $(chat).height();
                        if (isChat && wh < (ch + 250)) {
                            $(".sb-chat-cnt").addClass("sb-active-hidden");
                            _height = wh - $(".sb-chat-header").outerHeight() - 278;
                            $(".sb-chat-cnt").removeClass("sb-active-hidden");
                            if (ww > 767) _height -= 218;
                            $(chat).addClass("sb-chat-custom-height");
                        }
                        var optionsString = $(t).attr("data-options");
                        var optionsArr;
                        var options = {
                            height: _height,
                            size: '0px',
                            color: '#608095',
                            //start: 'bottom',
                            //wheelStep: 3,
                            allowPageScroll: true
                        }
                        if (!isEmpty(optionsString)) {
                            optionsArr = optionsString.split(",");
                            options = getOptionsString(optionsString, options);
                        }
                        $(t).slimScroll(options);
                        // rola para a última mensagem
                        $('.sb-chat-list').animate({
                            scrollTop: $(".sb-chat-list")[1].scrollHeight
                        }, 'slow');

                        if (opcao == "primeiravez") {
                            opcao = '';
                            exibeForm();
                        }
                    }, 300);
                }
            }

            if (!isChat && !real_time) {
                real_time = true;
            }
        });
    }

    function isEmpty(obj) {
        var type = typeof(obj);
        if (type !== "undefined" && obj !== null && (obj.length > 0 || (type == "object" && Object.keys(obj).length > 0) || type === "boolean" || type == 'number') && obj !== "undefined") return false;
        else return true;
    }

    function getRandomInt(min, max) {
        return Math.floor(parseInt((Math.random() * 100), 10) * (max - min + 1)) + min;
    }

    function getOptionsString(txt, mainArray) {
        var optionsArr = txt.split(",");
        for (var i = 0; i < optionsArr.length; i++) {
            mainArray[optionsArr[i].split(":")[0]] = correctValue(optionsArr[i].split(":")[1]);
        }
        return mainArray;
    }

    function correctValue(n) { return typeof n == "number" ? parseFloat(n) : n == "true" ? !0 : n == "false" ? !1 : n }
    var vis = (function() {
        var stateKey, eventKey, keys = {
            hidden: "visibilitychange",
            webkitHidden: "webkitvisibilitychange",
            mozHidden: "mozvisibilitychange",
            msHidden: "msvisibilitychange"
        };
        for (stateKey in keys) {
            if (stateKey in document) {
                eventKey = keys[stateKey];
                break;
            }
        }
        return function(c) {
            if (c) document.addEventListener(eventKey, c);
            return !document[stateKey];
        }
    })();
    vis(function() {
        if (vis()) {
            tabActive = true;
            clearInterval(flashInterval);
        } else {
            tabActive = false;
        }
    });

    function set_chat_closed(close) {
        chat_close = close;
        localStorage.setItem("chat_close", close);
    }

    function scroll_to_last_message() {
        // rola para a última mensagem
        $('.sb-chat-list').animate({
            scrollTop: $(".sb-chat-list")[1].scrollHeight + 100
        }, 'slow');
    }

    $.isBlank = function(obj) {
        return (!obj || $.trim(obj) === "");
    };
    // $.isBlank("a") //false

    // $.isBlank(" ") //true
    // $.isBlank("") //true
    // $.isBlank("\n") //true
    // $.isBlank(null) //true
    // $.isBlank(undefined) //true
    // $.isBlank(false) //true
    // $.isBlank([]) //true

    function init_carousel(classe) {
        $("." + classe + "").owlCarousel({
            animateOut: 'slideOutDown',
            animateIn: 'flipInX',
            loop: true,
            items: 3,
            center: true,
            margin: 10,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        });
    }

}(jQuery));