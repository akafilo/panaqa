/* PANAQA v2 — "Señal perdida" */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Idiomas (ES / EN / 中文) ---------- */
    var I18N = {
        'PANAQA — CINTA 01': { en: 'PANAQA — TAPE 01', zh: 'PANAQA — 磁带 01' },
        'MENÚ ☰': { en: 'MENU ☰', zh: '菜单 ☰' },
        'CERRAR ✕': { en: 'CLOSE ✕', zh: '关闭 ✕' },
        '— SELECCIONE CANAL —': { en: '— SELECT CHANNEL —', zh: '— 选择频道 —' },
        'PROGRAMACIÓN': { en: 'PROGRAM GUIDE', zh: '节目单' },
        'EN VIVO': { en: 'LIVE', zh: '现场' },
        'FECHAS': { en: 'TOUR DATES', zh: '演出日期' },
        'TELETIENDA': { en: 'TELESHOP', zh: '电视购物' },
        'CRÉDITOS': { en: 'CREDITS', zh: '演职人员' },
        'LA RESISTENCIA': { en: 'THE RESISTANCE', zh: '抵抗' },
        'LETRAS': { en: 'LYRICS', zh: '歌词' },
        '▲▼ NAVEGAR · OK ENTRAR': { en: '▲▼ BROWSE · OK ENTER', zh: '▲▼ 浏览 · OK 进入' },
        'NUEVO SINGLE — PANAQA': { en: 'NEW SINGLE — PANAQA', zh: '新单曲 — PANAQA' },
        'VIDEOCLIP': { en: 'MUSIC VIDEO', zh: '音乐录影带' },
        'SONIDO OFF': { en: 'SOUND OFF', zh: '声音 关' },
        'SONIDO ON': { en: 'SOUND ON', zh: '声音 开' },
        '04 Abr — Cusco': { en: 'Apr 04 — Cusco', zh: '4月4日 — 库斯科' },
        '02 May — Lima': { en: 'May 02 — Lima', zh: '5月2日 — 利马' },
        'Nu metal desde el Perú': { en: 'Nu metal from Peru', zh: '来自秘鲁的新金属' },
        'Únete a la resistencia': { en: 'Join the resistance', zh: '加入抵抗' },
        'CH 02 — GUÍA DE PROGRAMACIÓN': { en: 'CH 02 — PROGRAM GUIDE', zh: 'CH 02 — 节目单' },
        'Discografía': { en: 'Discography', zh: '唱片' },
        'CANAL / TÍTULO': { en: 'CHANNEL / TITLE', zh: '频道 / 标题' },
        'FORMATO': { en: 'FORMAT', zh: '格式' },
        'SINGLE': { en: 'SINGLE', zh: '单曲' },
        'ÁLBUM': { en: 'ALBUM', zh: '专辑' },
        'EP 2024': { en: 'EP 2024', zh: 'EP 2024' },
        'SINGLE — YA DISPONIBLE': { en: 'SINGLE — OUT NOW', zh: '单曲 — 现已发行' },
        'GRABADO EN VIVO — VOLTAJE RECORDS': { en: 'RECORDED LIVE — VOLTAJE RECORDS', zh: '现场录制 — VOLTAJE RECORDS' },
        'EP DEBUT — 2024': { en: 'DEBUT EP — 2024', zh: '首张 EP — 2024' },
        'SINGLE — EN VIVO': { en: 'SINGLE — LIVE', zh: '单曲 — 现场' },
        'CH 03 — TRANSMISIÓN EN VIVO': { en: 'CH 03 — LIVE BROADCAST', zh: 'CH 03 — 现场直播' },
        'En vivo': { en: 'Live', zh: '现场直击' },
        '▶ VER': { en: '▶ WATCH', zh: '▶ 观看' },
        'SESIÓN EN VIVO': { en: 'LIVE SESSION', zh: '现场演出' },
        'CH 04 — SEÑAL CONTINUA': { en: 'CH 04 — CONTINUOUS SIGNAL', zh: 'CH 04 — 持续信号' },
        'EN BUCLE': { en: 'ON LOOP', zh: '循环播放' },
        'SINTONIZANDO…': { en: 'TUNING IN…', zh: '调台中…' },
        'CH 05 — PRÓXIMAS TRANSMISIONES': { en: 'CH 05 — UPCOMING BROADCASTS', zh: 'CH 05 — 即将播出' },
        'Fechas': { en: 'Dates', zh: '日期' },
        'SÁB · 2026': { en: 'SAT · 2026', zh: '周六 · 2026' },
        'Locación secreta': { en: 'Secret location', zh: '秘密地点' },
        'CUSCO, PERÚ': { en: 'CUSCO, PERU', zh: '秘鲁 库斯科' },
        'w/ WarakaPunk + grupos locales': { en: 'w/ WarakaPunk + local bands', zh: '同台：WarakaPunk + 本地乐队' },
        'ENTRADAS': { en: 'TICKETS', zh: '门票' },
        'CENTRO DE LIMA': { en: 'DOWNTOWN LIMA', zh: '利马市中心' },
        'w/ varios artistas': { en: 'w/ various artists', zh: '同台：多位艺人' },
        'POR ANUNCIAR': { en: 'TBA', zh: '待公布' },
        'Asiste a un ensayo': { en: 'Join a rehearsal', zh: '参加排练' },
        'LIMA, PERÚ': { en: 'LIMA, PERU', zh: '秘鲁 利马' },
        'Fechas cada mes': { en: 'Dates every month', zh: '每月都有' },
        'CONSULTAR': { en: 'ASK US', zh: '咨询' },
        'CH 06 — TELETIENDA PANAQA': { en: 'CH 06 — PANAQA TELESHOP', zh: 'CH 06 — PANAQA 电视购物' },
        'Teletienda': { en: 'Teleshop', zh: '电视购物台' },
        '¡Llame ya!': { en: 'Call now!', zh: '立即致电！' },
        'OFERTA EN PANTALLA': { en: 'ON-SCREEN OFFER', zh: '屏幕特惠' },
        'PEDIR POR WHATSAPP': { en: 'ORDER ON WHATSAPP', zh: '通过 WHATSAPP 订购' },
        'VER TODO': { en: 'SEE ALL', zh: '查看全部' },
        'ENVÍO GRATIS A TODO EL PERÚ · STOCK LIMITADO': { en: 'FREE SHIPPING ACROSS PERU · LIMITED STOCK', zh: '秘鲁全境免费配送 · 限量' },
        'Polo "Despierta la Bestia" negro': { en: '"Despierta la Bestia" T-shirt — black', zh: '"Despierta la Bestia" T恤 — 黑色' },
        'Polo "Despierta la Bestia" blanco': { en: '"Despierta la Bestia" T-shirt — white', zh: '"Despierta la Bestia" T恤 — 白色' },
        'Gorro clásico': { en: 'Classic beanie', zh: '经典帽子' },
        'Disco "Sesión en vivo"': { en: '"Sesión en vivo" CD', zh: '"Sesión en vivo" 专辑' },
        'CH 07 — LA BANDA': { en: 'CH 07 — THE BAND', zh: 'CH 07 — 乐队' },
        'La banda': { en: 'The band', zh: '乐队' },
        'PANAQA es una banda peruana de nu metal que fusiona la intensidad del metal con sonidos emblemáticos peruanos y rap. Desde 2022 hacen letras sobre superación personal, crítica social y la lucha interna del ser humano contemporáneo.': {
            en: 'PANAQA is a Peruvian nu metal band blending the intensity of metal with iconic Peruvian sounds and rap. Since 2022 they have written about personal growth, social critique and the inner struggle of the modern human being.',
            zh: 'PANAQA 是一支秘鲁新金属乐队，将金属的力量与标志性的秘鲁声音和说唱融合。自 2022 年起，他们的歌词讲述个人成长、社会批判以及当代人内心的挣扎。'
        },
        'VOCES': { en: 'VOCALS', zh: '主唱' },
        'GUITARRAS': { en: 'GUITARS', zh: '吉他' },
        'BAJO Y PRODUCCIÓN': { en: 'BASS AND PRODUCTION', zh: '贝斯与制作' },
        'BATERÍA': { en: 'DRUMS', zh: '鼓' },
        'TECLADOS Y SAMPLES': { en: 'KEYS AND SAMPLES', zh: '键盘与采样' },
        '⚠ TRANSMISIÓN DE EMERGENCIA': { en: '⚠ EMERGENCY BROADCAST', zh: '⚠ 紧急广播' },
        '● EN DIRECTO': { en: '● ON AIR', zh: '● 直播中' },
        'Únete a la': { en: 'Join the', zh: '加入' },
        'resistencia': { en: 'resistance', zh: '抵抗行动' },
        'Comunidad gratuita de WhatsApp: contenido exclusivo, sorteos, descuentos para las tocadas y avisos antes que nadie.': {
            en: 'Free WhatsApp community: exclusive content, giveaways, show discounts and news before anyone else.',
            zh: '免费 WhatsApp 社区：独家内容、抽奖、演出折扣，抢先获得消息。'
        },
        'ENTRAR AHORA': { en: 'JOIN NOW', zh: '立即加入' },
        'Fin de la': { en: 'End of', zh: '节目' },
        'transmisión': { en: 'transmission', zh: '结束' },
        'CONTRATACIONES': { en: 'BOOKING', zh: '演出邀约' },
        'CANALES': { en: 'CHANNELS', zh: '频道' },
        'NU METAL — PERÚ': { en: 'NU METAL — PERU', zh: '新金属 — 秘鲁' },
        /* Merch */
        'MERCH': { en: 'MERCH', zh: '周边' },
        'Merch': { en: 'Merch', zh: '周边商品' },
        'CATÁLOGO': { en: 'CATALOG', zh: '目录' },
        'INICIO': { en: 'HOME', zh: '首页' },
        'ARTÍCULOS': { en: 'ITEMS', zh: '商品' },
        'PRECIO': { en: 'PRICE', zh: '价格' },
        'TALLA': { en: 'SIZE', zh: '尺码' },
        'DISEÑO': { en: 'DESIGN', zh: '设计' },
        'Set de uñas Panaqa': { en: 'PANAQA pick set', zh: 'PANAQA 拨片套装' },
        'Polo "Bestia" negro': { en: '"Bestia" tee — black', zh: '"Bestia" T恤 黑' },
        'Polo "Bestia" blanco': { en: '"Bestia" tee — white', zh: '"Bestia" T恤 白' },
        'Póster Panaqa': { en: 'PANAQA poster', zh: 'PANAQA 海报' },
        'Algodón pima 20/1 con bordado en serigrafiado.': { en: '20/1 Pima cotton with screen-printed embroidery.', zh: '20/1 皮马棉，丝网印刷刺绣。' },
        'Gorro negro con bordado PANAQA y ajuste cómodo.': { en: 'Black beanie with PANAQA embroidery and a comfortable fit.', zh: '黑色帽子，PANAQA 刺绣，佩戴舒适。' },
        'Disco físico estilo sobre con portada exclusiva y audio directo desde el escenario.': { en: 'Physical CD in a sleeve with exclusive artwork and audio straight from the stage.', zh: '实体专辑，独家封面，舞台现场直录音频。' },
        'Set de 10 uñas con diseño PANAQA para un look extremo y personalizado.': { en: 'Set of 10 PANAQA guitar picks for an extreme, personal look.', zh: '10 枚 PANAQA 设计吉他拨片，打造极致个性造型。' },
        'Imprime tu póster PANAQA en alta calidad con dos diseños exclusivos.': { en: 'Get your PANAQA poster in high quality, in two exclusive designs.', zh: '高品质 PANAQA 海报，两款独家设计。' },
        'Envío nacional': { en: 'Shipping in Peru', zh: '秘鲁境内配送' },
        'Envío gratuito a todo el Perú mediante agentes como Shalom y Olva Courier.': { en: 'Free shipping across Peru with carriers like Shalom and Olva Courier.', zh: '通过 Shalom、Olva Courier 等快递免费配送至秘鲁全境。' },
        'Envío internacional': { en: 'International shipping', zh: '国际配送' },
        'Consulta por nuestro envío internacional, tarifas y posibilidades.': { en: 'Ask us about international shipping, rates and options.', zh: '咨询国际配送、运费及可选方式。' },
        'Diseño auténtico': { en: 'Authentic design', zh: '正版设计' },
        'Productos oficiales PANAQA con ediciones visuales pensadas para fans reales.': { en: 'Official PANAQA products with visual editions made for real fans.', zh: 'PANAQA 官方产品，为真正的乐迷设计。' },
        /* Letras */
        'TELETEXTO — PÁGINA 100': { en: 'TELETEXT — PAGE 100', zh: '图文电视 — 第 100 页' },
        'Letras': { en: 'Lyrics', zh: '歌词集' },
        'ÍNDICE': { en: 'INDEX', zh: '索引' },
        'SINGLES': { en: 'SINGLES', zh: '单曲合集' },
        'PANAQA — EP 2024': { en: 'PANAQA — EP 2024', zh: 'PANAQA — 2024 EP' },
        'PRÓXIMAMENTE': { en: 'COMING SOON', zh: '即将推出' },
        '▶ ESCUCHAR': { en: '▶ LISTEN', zh: '▶ 收听' },
        '■ CERRAR VIDEO': { en: '■ CLOSE VIDEO', zh: '■ 关闭视频' },
        '◀ ANTERIOR': { en: '◀ PREV', zh: '◀ 上一首' },
        'SIGUIENTE ▶': { en: 'NEXT ▶', zh: '下一首 ▶' },
        'EN REPRODUCCIÓN': { en: 'NOW PLAYING', zh: '正在播放' },
        /* Menú */
        'MÚSICA': { en: 'MUSIC', zh: '音乐' },
        'ESTRENOS': { en: 'NEW RELEASES', zh: '新作' },
        'HISTORIA': { en: 'STORY', zh: '故事' },
        'COMUNIDAD': { en: 'COMMUNITY', zh: '社区' },
        'La Resistencia': { en: 'The Resistance', zh: '抵抗组织' },
        'Catálogo completo': { en: 'Full catalog', zh: '完整目录' },
        'Todas las canciones': { en: 'All songs', zh: '全部歌曲' },
        'DISCOGRAFÍA': { en: 'DISCOGRAPHY', zh: '唱片目录' },
        'LA BANDA': { en: 'THE BAND', zh: '乐队成员' },
        'LA YAPITA': { en: 'LA YAPITA', zh: 'LA YAPITA' },
        'PRONTO NUEVAS FECHAS': { en: 'NEW DATES COMING SOON', zh: '新日期即将公布' },
        'AGOTADO': { en: 'SOLD OUT', zh: '售罄' },
        /* Carrito */
        'AGREGAR AL CARRITO': { en: 'ADD TO CART', zh: '加入购物车' },
        'AGREGADO': { en: 'ADDED', zh: '已加入' },
        'o pídelo directo por WhatsApp': { en: 'or order it directly on WhatsApp', zh: '或直接通过 WhatsApp 订购' },
        'CARRITO': { en: 'CART', zh: '购物车' },
        'Tu pedido': { en: 'Your order', zh: '你的订单' },
        'Tu carrito está vacío.': { en: 'Your cart is empty.', zh: '购物车是空的。' },
        'TOTAL': { en: 'TOTAL', zh: '合计' },
        'Nombre (opcional)': { en: 'Name (optional)', zh: '姓名（可选）' },
        'Ciudad o distrito (opcional)': { en: 'City or district (optional)', zh: '城市或区（可选）' },
        'ENVIAR PEDIDO POR WHATSAPP': { en: 'SEND ORDER ON WHATSAPP', zh: '通过 WHATSAPP 发送订单' },
        'Coordinamos el pago y el envío por WhatsApp.': { en: 'We arrange payment and shipping on WhatsApp.', zh: '我们会通过 WhatsApp 安排付款和配送。' },
        'VACIAR CARRITO': { en: 'EMPTY CART', zh: '清空购物车' },
        /* Archivo de cintas */
        'CH 09 — ARCHIVO DE CINTAS': { en: 'CH 09 — TAPE ARCHIVE', zh: 'CH 09 — 录像带档案' },
        'Archivo': { en: 'Archive', zh: '档案' },
        'ARCHIVO': { en: 'ARCHIVE', zh: '档案馆' },
        'INSERTE UNA CINTA': { en: 'INSERT A TAPE', zh: '请插入录像带' },
        '❚❚ PAUSA': { en: '❚❚ PAUSE', zh: '❚❚ 暂停' },
        '▶ PLAY': { en: '▶ PLAY', zh: '▶ 播放' },
        'PAUSA ❚❚': { en: 'PAUSE ❚❚', zh: '暂停 ❚❚' },
        '⏏ EJECT': { en: '⏏ EJECT', zh: '⏏ 退出' },
        '◀ DESLIZA PARA VER MÁS CINTAS ▶': { en: '◀ SWIPE FOR MORE TAPES ▶', zh: '◀ 滑动查看更多录像带 ▶' },
        'Elige una cinta del estante': { en: 'Pick a tape from the shelf', zh: '从架子上选一盘录像带' }
    };
    var LANGS = ['es', 'en', 'zh'];
    var lang = 'es';
    try { lang = localStorage.getItem('panaqaLang') || 'es'; } catch (e) {}
    if (LANGS.indexOf(lang) < 0) lang = 'es';
    var reverseI18n = {};
    Object.keys(I18N).forEach(function (k) {
        reverseI18n[k] = k;
        Object.keys(I18N[k]).forEach(function (l) { reverseI18n[I18N[k][l]] = k; });
    });
    function t(key) {
        if (lang === 'es' || !I18N[key]) return key;
        return I18N[key][lang] || key;
    }
    function translateDom() {
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
        var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        var node;
        while ((node = walker.nextNode())) {
            var raw = node.nodeValue;
            var text = raw.trim();
            if (!text) continue;
            var key = reverseI18n[text];
            if (!key) continue;
            node.nodeValue = raw.replace(text, t(key));
        }
        document.querySelectorAll('.lang-opt').forEach(function (el) {
            el.classList.toggle('on', el.getAttribute('data-lang') === lang);
        });
    }

    /* ---------- Ruido de TV (canvas reutilizable) ---------- */
    function noise(canvas, w, h) {
        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext('2d');
        var img = ctx.createImageData(w, h);
        return function draw() {
            var d = img.data;
            for (var i = 0; i < d.length; i += 4) {
                var v = Math.random() * 255 | 0;
                d[i] = d[i + 1] = d[i + 2] = v;
                d[i + 3] = 255;
            }
            ctx.putImageData(img, 0, 0);
        };
    }

    function loop(draw, fps) {
        var last = 0, id = 0, running = false;
        function tick(t) {
            if (!running) return;
            if (t - last > 1000 / fps) { draw(); last = t; }
            id = requestAnimationFrame(tick);
        }
        return {
            start: function () { if (!running) { running = true; id = requestAnimationFrame(tick); } },
            stop: function () { running = false; cancelAnimationFrame(id); }
        };
    }

    /* Ruido ambiental de fondo */
    var bgNoise = document.getElementById('noise');
    var bgLoop = null;
    if (bgNoise && !reduceMotion) {
        bgLoop = loop(noise(bgNoise, 160, 100), 12);
        bgLoop.start();
    }

    /* Flash de cambio de canal */
    var flashCanvas = document.getElementById('flash');
    var drawFlash = flashCanvas ? noise(flashCanvas, 160, 100) : null;
    function channelFlash() {
        if (!drawFlash || reduceMotion) return;
        var n = 0;
        flashCanvas.classList.add('on');
        (function step() {
            drawFlash();
            if (++n < 4) { setTimeout(step, 40); } else { flashCanvas.classList.remove('on'); }
        })();
    }

    /* ---------- Intro ---------- */
    var boot = document.getElementById('boot');
    if (boot) {
        var seen = false;
        try { seen = sessionStorage.getItem('panaqa-boot') === '1'; } catch (e) {}
        if (seen || reduceMotion) {
            boot.classList.add('done');
        } else {
            var bootLoop = loop(noise(document.getElementById('boot-noise'), 160, 100), 20);
            bootLoop.start();
            var closeBoot = function () {
                if (boot.classList.contains('done')) return;
                boot.classList.add('done');
                bootLoop.stop();
                try { sessionStorage.setItem('panaqa-boot', '1'); } catch (e) {}
                channelFlash();
            };
            boot.addEventListener('click', closeBoot);
            boot.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') closeBoot(); });
            setTimeout(closeBoot, 1400);
        }
    }

    /* ---------- OSD: fondo al hacer scroll + canal activo ---------- */
    var osd = document.getElementById('osd');
    var osdNum = document.getElementById('osd-num');
    var osdName = document.getElementById('osd-name');
    window.addEventListener('scroll', function () {
        osd.classList.toggle('solid', window.scrollY > 40 || document.body.classList.contains('sub'));
    }, { passive: true });

    var firstCh = document.querySelector('[data-ch]');
    var current = firstCh ? firstCh.getAttribute('data-ch') : '01';
    var chObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var ch = entry.target.getAttribute('data-ch');
            if (ch === current) return;
            current = ch;
            osdNum.textContent = 'CH ' + ch;
            osdName.textContent = t(entry.target.getAttribute('data-name'));
            channelFlash();
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('[data-ch]').forEach(function (s) { chObserver.observe(s); });

    /* ---------- Menú OSD ---------- */
    var menu = document.getElementById('menu');
    var menuBtn = document.getElementById('menu-btn');
    var menuClose = document.getElementById('menu-close');
    function setMenu(open) {
        menu.classList.toggle('open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
        if (open) { var first = menu.querySelector('a'); if (first) first.focus(); }
    }
    menuBtn.addEventListener('click', function () { setMenu(true); });
    menuClose.addEventListener('click', function () { setMenu(false); });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) {
        if (!menu.classList.contains('open')) return;
        if (e.key === 'Escape') { setMenu(false); menuBtn.focus(); return; }
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            var links = Array.prototype.slice.call(menu.querySelectorAll('a'));
            var i = links.indexOf(document.activeElement);
            i = e.key === 'ArrowDown' ? (i + 1) % links.length : (i - 1 + links.length) % links.length;
            links[i].focus();
        }
    });

    /* ---------- Hero: letra que se escribe + contador VHS ---------- */
    var lyricEl = document.getElementById('hero-lyric');
    var lyrics = [
        'HACEMOS CASO OMISO',
        'YA SÉ QUE ME QUIERES MÁS SUMISO',
        'LEVANTA EL PUÑO Y GRITA',
        'OBEY. OBEY. OBEY.'
    ];
    if (lyricEl) {
        if (reduceMotion) {
            lyricEl.textContent = lyrics[0];
        } else {
            var li = 0, ci = 0, deleting = false;
            (function type() {
                var line = lyrics[li];
                if (!deleting) {
                    lyricEl.textContent = line.slice(0, ++ci);
                    if (ci === line.length) { deleting = true; return setTimeout(type, 2200); }
                    return setTimeout(type, 55 + Math.random() * 60);
                }
                lyricEl.textContent = line.slice(0, --ci);
                if (ci === 0) { deleting = false; li = (li + 1) % lyrics.length; return setTimeout(type, 350); }
                setTimeout(type, 25);
            })();
        }
    }

    var counter = document.getElementById('hud-counter');
    var dateEl = document.getElementById('hud-date');
    var start = Date.now();
    var months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    function tickClock() {
        var s = Math.floor((Date.now() - start) / 1000);
        if (counter) counter.textContent = 'SP ' + pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s / 60) % 60) + ':' + pad(s % 60);
        var d = new Date();
        if (dateEl) dateEl.textContent = months[d.getMonth()] + ' ' + pad(d.getDate()) + ' ' + d.getFullYear() + '  ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
    }
    tickClock();
    setInterval(tickClock, 1000);

    /* ---------- Cambio de imagen con estática ---------- */
    function staticSwap(screen, canvas, apply) {
        if (reduceMotion) { apply(); return; }
        var draw = noise(canvas, 120, 120);
        var n = 0;
        screen.classList.add('switching');
        (function step() {
            draw();
            if (n === 2) apply();
            if (++n < 6) { setTimeout(step, 45); } else { screen.classList.remove('switching'); }
        })();
    }

    /* ---------- CH 02: Guía de programación ---------- */
    var releases = [
        {
            ch: '101', title: 'CASO OMISO', format: 'SINGLE', img: 'assets/omiso.jpeg',
            desc: 'SINGLE — YA DISPONIBLE',
            links: { spotify: 'https://open.spotify.com/intl-es/track/0GOv1ReuykGcUNw3NMTVM2', apple: 'https://music.apple.com/es/song/caso-omiso/6771792254', youtube: 'https://www.youtube.com/watch?v=kk-gxwCHHeQ' }
        },
        {
            ch: '102', title: 'IMPOSTOR', format: 'SINGLE', img: 'assets/panaqa-live..jpg',
            desc: 'SINGLE — EN VIVO',
            links: { spotify: 'https://open.spotify.com/intl-es/track/4QJLzSxf6e2cfwfQ7MK5nw', apple: 'https://music.apple.com/pe/song/impostor-en-vivo/1831329790', youtube: 'https://www.youtube.com/watch?v=Av9CaVcHFHs' }
        },
        {
            ch: '103', title: 'ÁGUILA', format: 'SINGLE', img: 'assets/panaqa-live..jpg',
            desc: 'SINGLE — EN VIVO',
            links: { spotify: 'https://open.spotify.com/intl-es/track/4L9qd1A1aLkR3o4woYc4Mo', apple: 'https://music.apple.com/pe/song/%C3%A1guila-en-vivo/1831329661', youtube: 'https://www.youtube.com/watch?v=pIBEJarNa_8' }
        },
        {
            ch: '104', title: 'SESIÓN EN VIVO', format: 'ÁLBUM', img: 'assets/panaqa-live..jpg',
            desc: 'GRABADO EN VIVO — VOLTAJE RECORDS',
            links: { spotify: 'https://open.spotify.com/intl-es/album/17o3Co1naaSKHcBQzTAneL', apple: 'https://music.apple.com/pe/album/sesi%C3%B3n-en-vivo-en-vivo/1831329660', youtube: 'https://www.youtube.com/watch?v=mdYjkvVU4Qg&list=PL9OvNYkk1Wh6wEsLh66f9W0BqawR_2KEB' }
        },
        {
            ch: '105', title: 'PANAQA', format: 'EP 2024', img: 'assets/panaqa-disco.jpg',
            desc: 'EP DEBUT — 2024',
            links: { spotify: 'https://open.spotify.com/intl-es/album/79iPS9p6YdRMvA0DkWlTBY', apple: 'https://music.apple.com/es/album/panaqa/1756490811', youtube: 'https://www.youtube.com/watch?v=4mzuXZkmImQ&list=OLAK5uy_lOODt-udZ4S1sDVzBG9SDNiLnsu2lF0NU' }
        }
    ];

    /* ---------- CH 04: La Yapita ----------
       Reproductor de YouTube controlado por su API: sin sonido, sin controles,
       sin subtítulos y en bucle. Una pantalla de estática lo cubre hasta que la
       interfaz inicial de YouTube (título, botón de pausa) desaparece. */
    var yapitaHost = document.getElementById('yapita-player');
    var yapitaCover = document.getElementById('yapita-cover');
    if (yapitaHost) {
        var coverLoop = null;
        if (!reduceMotion) {
            coverLoop = loop(noise(document.getElementById('yapita-noise'), 160, 90), 14);
            coverLoop.start();
        }
        var killCaptions = function (p) {
            try { p.unloadModule('captions'); } catch (e) {}
            try { p.unloadModule('cc'); } catch (e) {}
            try { p.setOption('captions', 'track', {}); } catch (e) {}
        };
        var revealed = false;
        var reveal = function () {
            if (revealed) return;
            revealed = true;
            yapitaCover.classList.add('off');
            if (coverLoop) setTimeout(function () { coverLoop.stop(); }, 600);
        };
        /* Botón de sonido debajo del televisor */
        var soundBtn = document.getElementById('yapita-sound');
        var soundLabel = document.getElementById('yapita-sound-label');
        var yapitaPlayer = null;
        var setSoundUI = function (on) {
            soundBtn.setAttribute('aria-pressed', String(on));
            soundLabel.textContent = t(on ? 'SONIDO ON' : 'SONIDO OFF');
        };
        if (soundBtn) {
            soundBtn.addEventListener('click', function () {
                if (!yapitaPlayer) return;
                var on = soundBtn.getAttribute('aria-pressed') !== 'true';
                try {
                    if (on) { yapitaPlayer.unMute(); yapitaPlayer.setVolume(80); yapitaPlayer.playVideo(); }
                    else { yapitaPlayer.mute(); }
                } catch (e) {}
                setSoundUI(on);
            });
        }
        var createYapita = function () {
            var player = yapitaPlayer = new YT.Player('yapita-player', {
                host: 'https://www.youtube-nocookie.com',
                videoId: yapitaHost.getAttribute('data-video'),
                playerVars: {
                    autoplay: 1, mute: 1, controls: 0, disablekb: 1, fs: 0,
                    playsinline: 1, rel: 0, iv_load_policy: 3, cc_load_policy: 0,
                    modestbranding: 1, origin: location.origin
                },
                events: {
                    onReady: function (e) {
                        e.target.mute();
                        killCaptions(e.target);
                        e.target.playVideo();
                        if (soundBtn) soundBtn.disabled = false;
                    },
                    onStateChange: function (e) {
                        if (e.data === YT.PlayerState.PLAYING) {
                            killCaptions(e.target);
                            setTimeout(reveal, 4500);
                        }
                        /* Si algo lo pausa, vuelve a reproducir */
                        if (e.data === YT.PlayerState.PAUSED) e.target.playVideo();
                        if (e.data === YT.PlayerState.ENDED) { e.target.seekTo(0, true); e.target.playVideo(); }
                    },
                    onApiChange: function (e) { killCaptions(e.target); }
                }
            });
            /* Reinicia antes del final para que nunca aparezca la pantalla de fin de YouTube */
            setInterval(function () {
                try {
                    var d = player.getDuration(), t = player.getCurrentTime();
                    if (d && t > d - 0.8) player.seekTo(0, true);
                } catch (e) {}
            }, 400);
        };
        new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                obs.disconnect();
                if (window.YT && window.YT.Player) { createYapita(); return; }
                var prev = window.onYouTubeIframeAPIReady;
                window.onYouTubeIframeAPIReady = function () { if (prev) prev(); createYapita(); };
                /* El Archivo (CH 09) también usa la API: cargarla una sola vez */
                if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
                    var s = document.createElement('script');
                    s.src = 'https://www.youtube.com/iframe_api';
                    document.head.appendChild(s);
                }
            });
        }, { rootMargin: '500px 0px' }).observe(yapitaHost);
    }

    var guideItems = document.getElementById('guide-items');
    var guideImg = document.getElementById('guide-img');
    var guideScreen = document.getElementById('guide-screen');
    var guideNoise = document.getElementById('guide-noise');
    var guideOsd = document.getElementById('guide-osd-ch');
    var guideDesc = document.getElementById('guide-desc');
    var guideLinks = document.getElementById('guide-links');
    var guideEmbed = document.getElementById('guide-embed');

    function spotifyEmbed(url) {
        var m = url.match(/open\.spotify\.com\/(?:intl-[a-z]+\/)?(track|album)\/([A-Za-z0-9]+)/);
        return m ? 'https://open.spotify.com/embed/' + m[1] + '/' + m[2] + '?utm_source=generator&theme=0' : '';
    }

    function renderLinks(r) {
        guideLinks.innerHTML =
            '<a class="vhs-btn rec" target="_blank" rel="noopener noreferrer" href="' + r.links.spotify + '"><i class="fab fa-spotify"></i> SPOTIFY</a>' +
            '<a class="vhs-btn" target="_blank" rel="noopener noreferrer" href="' + r.links.youtube + '"><i class="fab fa-youtube"></i> YOUTUBE</a>' +
            '<a class="vhs-btn" target="_blank" rel="noopener noreferrer" href="' + r.links.apple + '"><i class="fab fa-apple"></i> APPLE</a>';
    }

    function selectRelease(i, animate) {
        var r = releases[i];
        Array.prototype.forEach.call(guideItems.children, function (el, j) {
            el.classList.toggle('active', j === i);
            el.setAttribute('aria-selected', String(j === i));
        });
        var apply = function () {
            guideImg.src = r.img;
            guideImg.alt = 'Portada de ' + r.title;
            guideOsd.textContent = 'CH ' + r.ch;
        };
        if (animate) staticSwap(guideScreen, guideNoise, apply); else apply();
        guideIndex = i;
        guideDesc.textContent = t(r.desc);
        renderLinks(r);
        if (guideEmbed) {
            var src = spotifyEmbed(r.links.spotify);
            if (guideEmbed.getAttribute('src') !== src) guideEmbed.setAttribute('src', src);
        }
    }
    var guideIndex = 0;

    if (guideItems) {
        releases.forEach(function (r, i) {
            var b = document.createElement('button');
            b.className = 'guide-item';
            b.setAttribute('role', 'option');
            b.innerHTML = '<span class="num">' + r.ch + '</span><span>' + r.title + '</span><small>' + t(r.format) + '</small>';
            b.addEventListener('click', function () { selectRelease(i, true); });
            guideItems.appendChild(b);
        });
        selectRelease(0, false);
    }

    /* =========================================================
       Datos editables desde el panel /admin (carpeta data/)
       ========================================================= */
    var dataCache = {};
    function loadData(name) {
        if (!dataCache[name]) {
            dataCache[name] = fetch('data/' + name + '.json', { cache: 'no-cache' })
                .then(function (r) { if (!r.ok) throw new Error(name); return r.json(); });
        }
        return dataCache[name];
    }
    var settings = { whatsapp: '51907918581', ocultar_fechas_pasadas: true };
    var settingsReady = loadData('ajustes').then(function (a) {
        Object.keys(a || {}).forEach(function (k) { settings[k] = a[k]; });
        return settings;
    }).catch(function () { return settings; });
    function waLink(msg) {
        return 'https://wa.me/' + String(settings.whatsapp).replace(/\D/g, '') + '?text=' + encodeURIComponent(msg || '');
    }
    function esc(s) {
        return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
    }
    function trField(p, field, fallbackKey) {
        var tr = p.traducciones || {};
        if (lang !== 'es' && tr[field + '_' + lang]) return tr[field + '_' + lang];
        return t(fallbackKey);
    }
    function prodName(p, short) { return trField(p, 'nombre', short && p.nombre_corto ? p.nombre_corto : p.nombre); }
    function prodDesc(p) { return trField(p, 'descripcion', p.descripcion || ''); }
    function formatPrice(n) { return 'S/ ' + (Number(n) || 0).toFixed(2); }
    function prodValues(p) {
        return String(p.valores || '').split(',').map(function (v) { return v.trim(); }).filter(Boolean);
    }

    /* ---------- CH 05: Fechas ---------- */
    var DOW = {
        es: ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'],
        en: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        zh: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    };
    var MON = {
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        zh: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    };
    function parseDay(s) {
        var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || '');
        return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
    }
    function todayStart() { var d = new Date(); d.setHours(0, 0, 0, 0); return d; }
    var showList = null;
    function upcomingShows() {
        if (!showList) return [];
        var today = todayStart();
        return showList.filter(function (s) {
            var d = parseDay(s.fecha);
            if (s.por_confirmar || !d) return true;
            return !settings.ocultar_fechas_pasadas || d >= today;
        }).sort(function (a, b) {
            var da = parseDay(a.fecha), db = parseDay(b.fecha);
            if (a.por_confirmar || !da) return 1;
            if (b.por_confirmar || !db) return -1;
            return da - db;
        });
    }
    var showsEl = document.getElementById('shows');
    function renderShows() {
        if (!showsEl || !showList) return;
        var list = upcomingShows();
        if (!list.length) {
            showsEl.innerHTML = '<div class="shows-empty"><p class="blink">' + esc(t('PRONTO NUEVAS FECHAS')) + '</p>' +
                '<a class="vhs-btn" target="_blank" rel="noopener noreferrer" href="' + esc(waLink('Hola, quiero saber las próximas fechas de PANAQA')) + '">' + esc(t('CONSULTAR')) + '</a></div>';
            return;
        }
        showsEl.innerHTML = list.map(function (s) {
            var d = parseDay(s.fecha);
            var date = (s.por_confirmar || !d)
                ? '??.??<small class="blink">' + esc(t('POR ANUNCIAR')) + '</small>'
                : pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '<small>' + DOW[lang][d.getDay()] + ' · ' + d.getFullYear() + '</small>';
            var isTicket = s.boton !== 'consultar';
            var href = s.enlace ? s.enlace : waLink(s.mensaje);
            return '<div class="show reveal in">' +
                '<div class="show-date">' + date + '</div>' +
                '<div class="show-venue">' + esc(s.lugar) + '<small>' + esc(String(s.ciudad || '').toUpperCase()) + '</small></div>' +
                '<div class="show-with">' + (s.invitados ? esc((/^w\//i.test(s.invitados) ? '' : 'w/ ') + s.invitados) : esc(s.nota || '')) + '</div>' +
                '<a class="vhs-btn' + (isTicket ? ' rec' : '') + '" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' +
                esc(t(isTicket ? 'ENTRADAS' : 'CONSULTAR')) + '</a></div>';
        }).join('');
    }

    /* Cinta roja: frases fijas + las próximas fechas */
    var tickerTrack = document.querySelector('.ticker-track');
    function renderTicker() {
        if (!tickerTrack) return;
        var items = [t('Hacemos caso omiso')];
        upcomingShows().forEach(function (s) {
            var d = parseDay(s.fecha);
            if (!d || s.por_confirmar || items.length > 3) return;
            var city = String(s.ciudad || s.lugar || '').split(',')[0];
            items.push(pad(d.getDate()) + ' ' + MON[lang][d.getMonth()] + ' — ' + city);
        });
        items.push(t('Nu metal desde el Perú'), 'Obey', t('Únete a la resistencia'));
        var html = items.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('');
        tickerTrack.innerHTML = html + html;
    }

    if (showsEl || tickerTrack) {
        Promise.all([settingsReady, loadData('fechas')]).then(function (r) {
            showList = (r[1] && r[1].fechas) || [];
            renderShows();
            renderTicker();
        }).catch(function () { showList = []; renderShows(); });
    }

    /* ---------- CH 06: Teletienda (productos destacados) ---------- */
    var products = [];
    var shopScreen = document.getElementById('shop-screen');
    var shopNoise = document.getElementById('shop-noise');
    var shopImg = document.getElementById('shop-img');
    var shopName = document.getElementById('shop-name');
    var shopPrice = document.getElementById('shop-price');
    var shopOsd = document.getElementById('shop-osd');
    var shopBuy = document.getElementById('shop-buy');
    var shopDots = document.getElementById('shop-dots');
    var shopIndex = 0;
    var shopTimer = null;

    function selectProduct(i, animate) {
        if (!products.length) return;
        shopIndex = i;
        var p = products[i];
        var apply = function () {
            shopImg.src = (p.imagenes && p.imagenes[0]) || '';
            shopImg.alt = prodName(p);
            shopOsd.textContent = 'ART. ' + pad(i + 1) + '/' + pad(products.length);
        };
        if (animate) staticSwap(shopScreen, shopNoise, apply); else apply();
        shopName.textContent = prodName(p);
        shopPrice.textContent = formatPrice(p.precio);
        shopBuy.href = waLink(p.mensaje);
        Array.prototype.forEach.call(shopDots.children, function (b, j) { b.setAttribute('aria-pressed', String(j === i)); });
    }

    function stopShop() { if (shopTimer) { clearInterval(shopTimer); shopTimer = null; } }
    if (shopDots) {
        Promise.all([settingsReady, loadData('merch')]).then(function (r) {
            var all = ((r[1] && r[1].productos) || []).filter(function (p) { return !p.agotado; });
            var featured = all.filter(function (p) { return p.destacado; });
            products = (featured.length ? featured : all).slice(0, 6);
            products.forEach(function (p, i) {
                var b = document.createElement('button');
                b.textContent = pad(i + 1);
                b.setAttribute('aria-label', prodName(p));
                b.addEventListener('click', function () { stopShop(); selectProduct(i, true); });
                shopDots.appendChild(b);
            });
            selectProduct(0, false);
            if (shopScreen && !reduceMotion && products.length > 1) {
                new IntersectionObserver(function (entries) {
                    entries.forEach(function (e) {
                        if (e.isIntersecting && !shopTimer) {
                            shopTimer = setInterval(function () { selectProduct((shopIndex + 1) % products.length, true); }, 4000);
                        } else if (!e.isIntersecting) { stopShop(); }
                    });
                }).observe(shopScreen);
            }
        });
    }

    /* ---------- Revelado ---------- */
    var revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); }
        });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { revealObs.observe(el); });

    /* ---------- Sonido del hero ---------- */
    var heroVideo = document.getElementById('hero-video');
    var volBtn = document.getElementById('vol-btn');
    var volLabel = document.getElementById('vol-label');
    if (heroVideo && volBtn) {
        volBtn.addEventListener('click', function () {
            var on = heroVideo.muted;
            heroVideo.muted = !on;
            if (on) { heroVideo.volume = 0.8; var p = heroVideo.play(); if (p && p.catch) p.catch(function () {}); }
            volBtn.setAttribute('aria-pressed', String(on));
            volLabel.textContent = t(on ? 'SONIDO ON' : 'SONIDO OFF');
        });
    }

    /* ---------- Selector de idioma ---------- */
    var langBtn = document.getElementById('lang-btn');
    function applyLang() {
        translateDom();
        if (guideItems) {
            Array.prototype.forEach.call(guideItems.children, function (b, i) {
                b.querySelector('small').textContent = t(releases[i].format);
            });
            guideDesc.textContent = t(releases[guideIndex].desc);
        }
        if (shopName && products.length) shopName.textContent = prodName(products[shopIndex]);
        renderShows();
        renderTicker();
        var active = document.querySelector('[data-ch="' + current + '"]');
        if (active) osdName.textContent = t(active.getAttribute('data-name'));
        langListeners.forEach(function (fn) { try { fn(lang); } catch (e) {} });
    }

    /* API compartida para las páginas Merch y Letras */
    var langListeners = [];
    window.PANAQA = {
        t: t,
        lang: function () { return lang; },
        translate: translateDom,
        onLang: function (fn) { langListeners.push(fn); },
        staticSwap: staticSwap,
        flash: channelFlash,
        reduceMotion: reduceMotion,
        loadData: loadData,
        settings: function () { return settingsReady; },
        waLink: waLink,
        esc: esc,
        prodName: prodName,
        prodDesc: prodDesc,
        prodValues: prodValues,
        formatPrice: formatPrice
    };
    if (langBtn) {
        langBtn.addEventListener('click', function () {
            lang = LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length];
            try { localStorage.setItem('panaqaLang', lang); } catch (e) {}
            applyLang();
            channelFlash();
        });
    }
    applyLang();

    /* Pausar ruido de fondo cuando la pestaña no está visible */
    document.addEventListener('visibilitychange', function () {
        if (!bgLoop) return;
        if (document.hidden) bgLoop.stop(); else bgLoop.start();
    });
})();
