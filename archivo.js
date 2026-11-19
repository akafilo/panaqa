/* PANAQA — CH 09 · Archivo de cintas
   Las cintas se editan en /admin (data/archivo.json). Al hacer clic, la cinta
   entra a la videocasetera y el televisor reproduce el video de YouTube. */
(function () {
    'use strict';
    var P = window.PANAQA;
    var arc = document.getElementById('arc');
    if (!P || !arc) return;
    var t = P.t, esc = P.esc;
    var $ = function (id) { return document.getElementById(id); };

    var row = $('arc-row'), pile = row.querySelector('.arc-pile'), cab = row.parentNode, swipe = $('arc-swipe');
    var scr = $('arc-scr'), cover = $('arc-cover'), covertxt = $('arc-covertxt'), osd = $('arc-osd');
    var trk = $('arc-trk'), trkbar = $('arc-trkbar'), dateEl = $('arc-date');
    var door = $('arc-door'), vfd = $('arc-vfd');
    var kplay = $('arc-kplay'), ksound = $('arc-ksound'), keject = $('arc-keject');

    var BANDS = {
        'rojo-amarillo': ['#b3122e', '#d99a1c'],
        'azul-gris': ['#1f4fa3', '#c9c9c9'],
        'verde-amarillo': ['#2b8a3e', '#e0c341']
    };
    var PRINTS = ['T-120', 'E-180', 'T-120', 'HG 120', 'T-160', 'T-120', 'E-240'];
    var MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    var player = null, cur = null, busy = false, timers = [], tick = null, watch = null, revealTimer = null;

    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    function later(f, ms) { var id = setTimeout(f, ms); timers.push(id); return id; }
    function ytId(url) {
        var s = String(url || '').trim();
        var m = s.match(/(?:v=|youtu\.be\/|shorts\/|embed\/|live\/)([\w-]{11})/);
        if (m) return m[1];
        return /^[\w-]{11}$/.test(s) ? s : '';
    }
    function camDate(c) {
        var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(c.fecha || '');
        var line1 = m ? MONTHS[+m[2] - 1] + '.' + m[3] + ' ' + m[1] : 'PANAQA';
        var line2 = c.detalle || '';
        return esc(line1) + (line2 ? '<br>' + esc(line2) : '');
    }

    /* ---------- Estática ---------- */
    (function () {
        var cv = $('arc-noise');
        if (!cv || P.reduceMotion) return;
        var x = cv.getContext('2d'), im = x.createImageData(cv.width, cv.height);
        (function draw() {
            if (!cover.classList.contains('off')) {
                for (var i = 0; i < im.data.length; i += 4) {
                    var v = Math.random() * 255 | 0;
                    im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255;
                }
                x.putImageData(im, 0, 0);
            }
            setTimeout(draw, 75);
        })();
    })();

    /* ---------- Estante ---------- */
    function renderShelf(list) {
        Array.prototype.slice.call(row.querySelectorAll('.arc-tape')).forEach(function (el) { el.remove(); });
        list.forEach(function (c, i) {
            var id = ytId(c.youtube);
            if (!id) return;
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'arc-tape' + (c.inclinada ? ' lean' : '');
            b.setAttribute('role', 'listitem');
            b.setAttribute('aria-label', (c.etiqueta || 'Cinta') + (c.detalle ? ' — ' + c.detalle : ''));
            b.dataset.v = id;
            b.dataset.d = camDate(c);
            var bands = BANDS[c.franja];
            var paper = c.papel === 'viejo' ? ' viejo' : c.papel === 'embalaje' ? ' embalaje' : '';
            var hand = c.letra === 'manuscrita' ? ' manuscrita' : '';
            b.innerHTML =
                '<span class="arc-print" aria-hidden="true">' + PRINTS[i % PRINTS.length] + '</span>' +
                (bands ? '<span class="arc-bands" aria-hidden="true"><i style="background:' + bands[0] + '"></i><i style="background:' + bands[1] + '"></i></span>' : '') +
                '<span class="arc-lab' + paper + hand + '" aria-hidden="true">' + esc(c.etiqueta || '') + '</span>' +
                '<span class="arc-vhs" aria-hidden="true">VHS</span>';
            b.addEventListener('click', function () { insert(b); });
            row.insertBefore(b, pile);
        });
        edges();
    }
    function edges() {
        var max = row.scrollWidth - row.clientWidth;
        cab.classList.toggle('more-left', row.scrollLeft > 4);
        cab.classList.toggle('more-right', row.scrollLeft < max - 4);
        swipe.classList.toggle('show', max > 4);
    }
    row.addEventListener('scroll', edges, { passive: true });
    window.addEventListener('resize', edges);

    /* ---------- YouTube ---------- */
    function withApi(cb) {
        if (window.YT && window.YT.Player) { cb(); return; }
        var prev = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = function () { if (prev) prev(); cb(); };
        if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
            var s = document.createElement('script');
            s.src = 'https://www.youtube.com/iframe_api';
            document.head.appendChild(s);
        }
    }
    function killCaptions(p) {
        try { p.unloadModule('captions'); } catch (e) {}
        try { p.unloadModule('cc'); } catch (e) {}
    }
    function setSoundUI() {
        var muted = player && player.isMuted && player.isMuted();
        ksound.textContent = t(muted ? 'SONIDO OFF' : 'SONIDO ON');
        ksound.classList.toggle('on', !muted);
    }
    /* Solo si el navegador bloqueó el arranque con sonido se arranca en silencio */
    function blockedCheck() {
        later(function () {
            try {
                var st = player.getPlayerState();
                if (st === -1 || st === 5) { player.mute(); player.playVideo(); }
            } catch (e) {}
        }, 2500);
    }
    function reveal() {
        clearTimeout(revealTimer);
        if (!cur) return;
        cover.classList.add('off');
        osd.classList.remove('hide');
        later(function () { osd.classList.add('hide'); }, 2500);
        /* TRACKING tapa el ícono de pausa que YouTube muestra al arrancar */
        var n = 2;
        trk.classList.remove('hide');
        trkbar.textContent = '▮▮▯▯▯▯▯▯▯▯';
        var fill = setInterval(function () {
            n++;
            trkbar.textContent = '▮'.repeat(Math.min(n, 10)) + '▯'.repeat(Math.max(0, 10 - n));
            if (n >= 10) clearInterval(fill);
        }, 230);
        timers.push(fill);
        later(function () { trk.classList.add('hide'); }, 2700);
    }
    function onState(e) {
        var S = YT.PlayerState;
        if (!cur) return;
        if (e.data === S.PLAYING) {
            killCaptions(e.target);
            scr.classList.remove('ispaused');
            kplay.textContent = t('❚❚ PAUSA');
            if (!cover.classList.contains('off')) { clearTimeout(revealTimer); revealTimer = setTimeout(reveal, 1200); }
            setTimeout(function () { setSoundUI(); ksound.classList.toggle('ask', player.isMuted()); }, 300);
        }
        if (e.data === S.ENDED) eject();
    }
    function startVideo(id) {
        if (!player) {
            player = new YT.Player('arc-player', {
                host: 'https://www.youtube-nocookie.com',
                videoId: id,
                playerVars: {
                    autoplay: 1, mute: 0, controls: 0, disablekb: 1, fs: 0, playsinline: 1, rel: 0,
                    iv_load_policy: 3, cc_load_policy: 0, modestbranding: 1, origin: location.origin
                },
                events: {
                    onReady: function (e) { e.target.unMute(); e.target.setVolume(85); e.target.playVideo(); blockedCheck(); },
                    onStateChange: onState
                }
            });
        } else {
            player.unMute(); player.setVolume(85); player.loadVideoById(id); blockedCheck();
        }
        /* Expulsa antes del final: nunca aparece la pantalla de videos sugeridos */
        clearInterval(watch);
        watch = setInterval(function () {
            try { var d = player.getDuration(), ct = player.getCurrentTime(); if (d && ct > d - 0.6) eject(); } catch (e) {}
        }, 400);
        clearInterval(tick);
        tick = setInterval(function () {
            try {
                var s = Math.floor(player.getCurrentTime() || 0);
                vfd.textContent = (scr.classList.contains('ispaused') ? '❚❚ ' : '') + '0:' + pad(Math.floor(s / 60)) + ':' + pad(s % 60);
            } catch (e) {}
        }, 500);
    }

    /* ---------- Videocasetera ---------- */
    function setKeys(on) { kplay.disabled = ksound.disabled = keject.disabled = !on; }
    function resetScreen() {
        timers.forEach(function (x) { clearTimeout(x); clearInterval(x); });
        timers = [];
        clearInterval(tick); clearInterval(watch); clearTimeout(revealTimer);
        try { if (player) player.stopVideo(); } catch (e) {}
        scr.classList.remove('blueon', 'ispaused');
        cover.classList.remove('off');
        covertxt.textContent = t('INSERTE UNA CINTA');
        osd.classList.add('hide'); trk.classList.add('hide');
        dateEl.innerHTML = '';
        vfd.textContent = '-:--:--';
        ksound.classList.remove('ask');
        setKeys(false);
    }
    function eject() {
        if (!cur || busy) return;
        busy = true;
        var tape = cur;
        cur = null;
        resetScreen();
        vfd.textContent = 'EJECT';
        door.classList.add('open');
        setTimeout(function () {
            door.classList.remove('open');
            tape.classList.remove('out');
            if (!P.reduceMotion) {
                var lean = tape.classList.contains('lean') ? 'rotate(-2.2deg) ' : '';
                tape.animate([{ opacity: .2, transform: lean + 'translateY(-14px)' }, { opacity: 1, transform: lean + 'translateY(0)' }], { duration: 420, easing: 'cubic-bezier(.2,.7,.2,1)' });
            }
            vfd.textContent = '-:--:--';
            busy = false;
        }, 450);
    }
    function insert(tape) {
        if (busy || cur === tape) return;
        if (cur) { var prev = cur; cur = null; resetScreen(); prev.classList.remove('out'); }
        busy = true;
        var id = tape.dataset.v;
        withApi(function () {});   /* empieza a cargar la API mientras se anima la cinta */

        var started = false;
        var go = function () {
            scr.classList.remove('blueon');
            dateEl.innerHTML = tape.dataset.d;
            cur = tape; busy = false; setKeys(true);
            withApi(function () { if (cur === tape && !started) { started = true; startVideo(id); } });
            revealTimer = setTimeout(reveal, 6000);   /* respaldo si YouTube tarda */
        };
        if (P.reduceMotion) {
            tape.classList.add('out');
            covertxt.textContent = t('SINTONIZANDO…');
            vfd.textContent = 'PLAY';
            go();
            return;
        }
        var R = arc.getBoundingClientRect(), r = tape.getBoundingClientRect(), d = door.getBoundingClientRect();
        var f = tape.cloneNode(true);
        f.classList.remove('lean');
        f.classList.add('arc-fly');
        f.removeAttribute('role');
        f.style.left = (r.left - R.left) + 'px';
        f.style.top = (r.top - R.top) + 'px';
        f.style.width = r.width + 'px';
        f.style.height = r.height + 'px';
        arc.appendChild(f);
        tape.classList.add('out');
        var dx = (d.left + d.width / 2) - (r.left + r.width / 2);
        var dy = (d.top + d.height / 2) - (r.top + r.height / 2);
        var sc = Math.max(.4, (d.width - 14) / r.height);
        f.animate([
            { transform: 'translate(0,0) rotate(0) scale(1)' },
            { transform: 'translate(0,-10px) scale(1.05)', offset: .22 },
            { transform: 'translate(' + (dx * .55) + 'px,' + (dy * .45) + 'px) rotate(-60deg) scale(.9)', offset: .55 },
            { transform: 'translate(' + dx + 'px,' + (dy - 18) + 'px) rotate(-90deg) scale(' + sc + ')', offset: .82 },
            { transform: 'translate(' + dx + 'px,' + (dy + 6) + 'px) rotate(-90deg) scale(' + sc + ')', opacity: 0 }
        ], { duration: 1300, easing: 'cubic-bezier(.45,.05,.3,1)', fill: 'forwards' });
        later(function () { door.classList.add('open'); }, 900);
        later(function () { f.remove(); door.classList.remove('open'); vfd.textContent = 'LOAD'; covertxt.textContent = t('SINTONIZANDO…'); }, 1320);
        later(function () { scr.classList.add('blueon'); vfd.textContent = 'PLAY'; }, 1500);
        later(go, 1950);
    }

    kplay.addEventListener('click', function () {
        if (!player || !cur) return;
        if (player.getPlayerState() === 1) {
            player.pauseVideo();
            scr.classList.add('ispaused');
            kplay.textContent = t('▶ PLAY');
        } else {
            player.playVideo();
            scr.classList.remove('ispaused');
            kplay.textContent = t('❚❚ PAUSA');
        }
    });
    ksound.addEventListener('click', function () {
        if (!player) return;
        if (player.isMuted()) { player.unMute(); player.setVolume(85); } else { player.mute(); }
        ksound.classList.remove('ask');
        setTimeout(setSoundUI, 100);
    });
    keject.addEventListener('click', eject);

    P.loadData('archivo').then(function (data) {
        renderShelf((data && data.cintas) || []);
    }).catch(function () { renderShelf([]); });

    P.onLang(function () {
        if (!cur) covertxt.textContent = t('INSERTE UNA CINTA');
        setSoundUI();
    });
})();
