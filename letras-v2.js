/* PANAQA v2 — Letras en teletexto */
(function () {
    'use strict';
    var P = window.PANAQA;
    var DATA = window.PANAQA_LYRICS;
    if (!P || !DATA) return;
    var t = P.t;

    var groups = [
        { name: 'SINGLES', base: 100, songs: ['caso-omiso'] },
        { name: 'SESIÓN EN VIVO', base: 200, songs: ['qumbia', 'somos', 'impostor', 'octágono', 'panaqa-real', 'préndelo', 'águila'] },
        { name: 'PANAQA — EP 2024', base: 300, soon: true }
    ];

    /* Lista plana de canciones con su número de página */
    var pages = [];
    groups.forEach(function (g) {
        (g.songs || []).forEach(function (key, i) {
            if (DATA[key]) pages.push({ key: key, page: 'P' + (g.base + i + 1), group: g.name });
        });
    });

    var $ = function (id) { return document.getElementById(id); };
    var index = $('ttx-index'), pageEl = $('ttx-page'), groupEl = $('ttx-group'), titleEl = $('ttx-title');
    var lyricsEl = $('ttx-lyrics'), countEl = $('ttx-count'), playBtn = $('ttx-play'), video = $('ttx-video');
    var videoFrame = $('ttx-video-frame'), crt = $('ttx-crt'), picker = $('ttx-select');

    /* Selector desplegable (celular): mismas canciones agrupadas por disco */
    function renderPicker() {
        var html = '';
        groups.forEach(function (g) {
            html += '<optgroup label="' + esc(t(g.name)) + '">';
            if (g.soon) {
                html += '<option disabled>' + esc(t('PRÓXIMAMENTE')) + '</option>';
            } else {
                pages.forEach(function (p, i) {
                    if (p.group === g.name) html += '<option value="' + i + '">' + esc(DATA[p.key].title.toUpperCase()) + '</option>';
                });
            }
            html += '</optgroup>';
        });
        picker.innerHTML = html;
        picker.value = String(current);
    }
    picker.addEventListener('change', function () { select(+picker.value, true); });
    var current = 0;

    function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

    /* Índice */
    function renderIndex() {
        var html = '<div class="ttx-index-head">' + esc(t('ÍNDICE')) + '</div>';
        groups.forEach(function (g) {
            html += '<div class="ttx-index-group">' + esc(t(g.name)) + '</div>';
            if (g.soon) {
                html += '<div class="ttx-index-item soon"><span class="num">P' + (g.base + 1) + '</span><span>' + esc(t('PRÓXIMAMENTE')) + '</span></div>';
                return;
            }
            pages.forEach(function (p, i) {
                if (p.group !== g.name) return;
                html += '<button type="button" class="ttx-index-item' + (i === current ? ' active' : '') + '" data-i="' + i + '"' +
                        ' aria-current="' + (i === current ? 'true' : 'false') + '">' +
                        '<span class="num">' + p.page + '</span><span>' + esc(DATA[p.key].title.toUpperCase()) + '</span></button>';
            });
        });
        index.innerHTML = html;
        Array.prototype.forEach.call(index.querySelectorAll('button[data-i]'), function (b) {
            b.addEventListener('click', function () { select(+b.getAttribute('data-i'), true); });
        });
    }

    /* Letra: los versos repetidos tipo "Obey" quedan resaltados */
    function renderLyrics(text) {
        var blocks = text.trim().split(/\n\s*\n/);
        lyricsEl.innerHTML = blocks.map(function (b) {
            return '<p>' + b.split('\n').map(function (l) { return esc(l.trim()); }).join('<br>') + '</p>';
        }).join('');
    }

    /* ---------- Ventana flotante (celular) ----------
       Aparece arriba, bajo la cabecera fija, y se puede arrastrar desde su barra.
       Mantiene la posición elegida mientras siga abierta. */
    var mobile = window.matchMedia('(max-width: 900px)');
    var placed = false;
    function navBottom() { return document.getElementById('osd').getBoundingClientRect().bottom; }
    function clampPos(left, top) {
        var w = video.offsetWidth, h = video.offsetHeight;
        return {
            left: Math.min(Math.max(left, 6), window.innerWidth - w - 6),
            top: Math.min(Math.max(top, navBottom() + 4), window.innerHeight - h - 6)
        };
    }
    function setPos(left, top) {
        var p = clampPos(left, top);
        video.style.left = p.left + 'px';
        video.style.top = p.top + 'px';
    }
    function placeDefault() {
        if (!mobile.matches) { video.style.left = video.style.top = ''; return; }
        var head = document.querySelector('.ttx-top').getBoundingClientRect();
        var top = Math.max(navBottom(), head.bottom) + 8;
        if (top > window.innerHeight * 0.45) top = navBottom() + 8;
        setPos(window.innerWidth - video.offsetWidth - 12, top);
        placed = true;
    }
    var bar = $('ttx-video-bar'), drag = null;
    bar.addEventListener('pointerdown', function (e) {
        if (!mobile.matches || e.target.closest('button')) return;
        drag = { dx: e.clientX - video.offsetLeft, dy: e.clientY - video.offsetTop };
        bar.setPointerCapture(e.pointerId);
        video.classList.add('dragging');
        e.preventDefault();
    });
    bar.addEventListener('pointermove', function (e) {
        if (drag) setPos(e.clientX - drag.dx, e.clientY - drag.dy);
    });
    function endDrag() { drag = null; video.classList.remove('dragging'); }
    bar.addEventListener('pointerup', endDrag);
    bar.addEventListener('pointercancel', endDrag);
    window.addEventListener('resize', function () {
        if (video.hidden) return;
        if (!mobile.matches) { video.style.left = video.style.top = ''; placed = false; return; }
        if (placed) setPos(video.offsetLeft, video.offsetTop); else placeDefault();
    });

    function closeVideo() {
        video.hidden = true;
        videoFrame.innerHTML = '';
        placed = false;
        playBtn.setAttribute('aria-pressed', 'false');
        playBtn.textContent = t('▶ ESCUCHAR');
    }
    function openVideo() {
        var song = DATA[pages[current].key];
        videoFrame.innerHTML = '<iframe title="' + esc(song.title) + '" src="https://www.youtube-nocookie.com/embed/' + song.youtubeId +
            '?autoplay=1&rel=0&modestbranding=1&playsinline=1" allow="autoplay; encrypted-media; picture-in-picture" ' +
            'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
        video.hidden = false;
        if (!placed) placeDefault();
        playBtn.setAttribute('aria-pressed', 'true');
        playBtn.textContent = t('■ CERRAR VIDEO');
    }
    $('ttx-video-close').addEventListener('click', closeVideo);

    /* Al cambiar de canción, vuelve al inicio de la letra si quedó arriba de la pantalla */
    function scrollToLyricsTop() {
        var navH = document.getElementById('osd').offsetHeight;
        var top = crt.getBoundingClientRect().top;
        if (top < navH) window.scrollTo({ top: window.scrollY + top - navH - 12, behavior: P.reduceMotion ? 'auto' : 'smooth' });
    }

    function renderStatic() {
        var p = pages[current];
        pageEl.textContent = p.page;
        groupEl.textContent = t(p.group);
        titleEl.textContent = DATA[p.key].title;
        countEl.textContent = (current + 1) + ' / ' + pages.length;
        playBtn.textContent = t(video.hidden ? '▶ ESCUCHAR' : '■ CERRAR VIDEO');
    }

    function select(i, animate) {
        current = (i + pages.length) % pages.length;
        var wasPlaying = !video.hidden;
        renderIndex();
        renderPicker();
        renderStatic();
        renderLyrics(DATA[pages[current].key].lyrics);
        /* Si el video estaba abierto, pasa a la nueva canción */
        if (wasPlaying) openVideo();
        if (animate) { P.flash(); scrollToLyricsTop(); }
        try { history.replaceState(null, '', '#' + pages[current].key); } catch (e) {}
    }

    playBtn.addEventListener('click', function () { if (video.hidden) openVideo(); else closeVideo(); });
    $('ttx-prev').addEventListener('click', function () { select(current - 1, true); });
    $('ttx-next').addEventListener('click', function () { select(current + 1, true); });
    document.addEventListener('keydown', function (e) {
        if (document.getElementById('menu').classList.contains('open')) return;
        if (e.key === 'ArrowRight') select(current + 1, true);
        if (e.key === 'ArrowLeft') select(current - 1, true);
    });

    /* Reloj de teletexto */
    var clock = $('ttx-clock');
    var months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    function tick() {
        var d = new Date();
        clock.textContent = pad(d.getDate()) + ' ' + months[d.getMonth()] + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    }
    tick();
    setInterval(tick, 1000);

    /* Enlace directo: letras-v2.html#impostor */
    var hash = decodeURIComponent(location.hash.slice(1));
    var start = 0;
    pages.forEach(function (p, i) { if (p.key === hash) start = i; });
    select(start, false);

    P.onLang(function () { renderIndex(); renderPicker(); renderStatic(); });
})();
