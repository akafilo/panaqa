/* PANAQA v2 — Teletienda (catálogo completo)
   Los productos se editan desde el panel /admin y se guardan en data/merch.json */
(function () {
    'use strict';
    var P = window.PANAQA;
    if (!P) return;
    var t = P.t, esc = P.esc;

    var $ = function (id) { return document.getElementById(id); };
    var screen = $('cat-screen'), noise = $('cat-noise'), img = $('cat-img');
    var osdArt = $('cat-osd-art'), osdView = $('cat-osd-view');
    var thumbs = $('cat-thumbs'), items = $('cat-items');
    var nameEl = $('cat-name'), priceEl = $('cat-price'), descEl = $('cat-desc');
    var optWrap = $('cat-option'), optLabel = $('cat-option-label'), optBtns = $('cat-option-btns');
    var buy = $('cat-buy');

    var products = [];
    var state = { i: 0, view: 0, opt: null };
    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    function optType(p) { return p.opcion === 'talla' || p.opcion === 'diseno' ? p.opcion : null; }

    function message(p) {
        var base = p.mensaje || ('Hola, quiero ' + p.nombre);
        if (optType(p) === 'talla' && state.opt) return base + ' — Talla ' + state.opt;
        if (optType(p) === 'diseno' && state.opt) return base + ' — Diseño ' + state.opt;
        return base;
    }

    function updateBuy() {
        var p = products[state.i];
        if (p.agotado) {
            buy.removeAttribute('href');
            buy.setAttribute('aria-disabled', 'true');
            buy.classList.add('is-disabled');
            buy.innerHTML = esc(t('AGOTADO'));
            return;
        }
        buy.removeAttribute('aria-disabled');
        buy.classList.remove('is-disabled');
        buy.href = P.waLink(message(p));
        buy.innerHTML = '<i class="fab fa-whatsapp"></i> ' + esc(t('PEDIR POR WHATSAPP'));
    }

    function showView(v, animate) {
        var p = products[state.i];
        var imgs = p.imagenes || [];
        if (!imgs.length) return;
        state.view = Math.min(v, imgs.length - 1);
        var apply = function () {
            img.src = imgs[state.view];
            img.alt = P.prodName(p) + ' — ' + (state.view + 1);
            osdView.textContent = (state.view + 1) + '/' + imgs.length;
        };
        if (animate) P.staticSwap(screen, noise, apply); else apply();
        Array.prototype.forEach.call(thumbs.children, function (b, j) { b.setAttribute('aria-pressed', String(j === state.view)); });
        /* En los diseños (póster), cada vista corresponde a un diseño */
        if (optType(p) === 'diseno') {
            var vals = P.prodValues(p);
            if (vals[state.view]) setOption(vals[state.view], false);
        }
    }

    function setOption(value, syncView) {
        var p = products[state.i];
        state.opt = value;
        Array.prototype.forEach.call(optBtns.children, function (b) {
            b.setAttribute('aria-pressed', String(b.getAttribute('data-value') === value));
        });
        if (syncView && optType(p) === 'diseno') {
            var idx = P.prodValues(p).indexOf(value);
            if (idx >= 0 && idx < (p.imagenes || []).length) showView(idx, true);
        }
        updateBuy();
    }

    function renderText() {
        if (!products.length) return;
        var p = products[state.i];
        nameEl.textContent = P.prodName(p);
        priceEl.textContent = P.formatPrice(p.precio);
        descEl.textContent = P.prodDesc(p);
        if (optType(p)) optLabel.textContent = t(optType(p) === 'talla' ? 'TALLA' : 'DISEÑO');
        Array.prototype.forEach.call(items.children, function (row, j) {
            row.querySelector('.cat-item-name').textContent = P.prodName(products[j], true);
            row.querySelector('small').textContent = products[j].agotado ? t('AGOTADO') : P.formatPrice(products[j].precio);
        });
        updateBuy();
    }

    function select(i, animate) {
        state.i = (i + products.length) % products.length;
        var p = products[state.i];
        osdArt.textContent = 'ART. ' + pad(state.i + 1) + '/' + pad(products.length);

        thumbs.innerHTML = '';
        (p.imagenes || []).forEach(function (src, v) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'cat-thumb';
            b.setAttribute('aria-label', 'Vista ' + (v + 1));
            b.innerHTML = '<img src="' + esc(src) + '" alt="" loading="lazy">';
            b.addEventListener('click', function () { showView(v, true); });
            thumbs.appendChild(b);
        });

        optBtns.innerHTML = '';
        var vals = P.prodValues(p);
        if (optType(p) && vals.length) {
            optWrap.hidden = false;
            vals.forEach(function (val) {
                var b = document.createElement('button');
                b.type = 'button';
                b.className = 'cat-opt';
                b.textContent = val;
                b.setAttribute('data-value', val);
                b.addEventListener('click', function () { setOption(val, true); });
                optBtns.appendChild(b);
            });
            state.opt = optType(p) === 'talla' ? vals[Math.min(1, vals.length - 1)] : vals[0];
        } else {
            optWrap.hidden = true;
            state.opt = null;
        }

        Array.prototype.forEach.call(items.children, function (row, j) {
            row.classList.toggle('active', j === state.i);
            row.setAttribute('aria-selected', String(j === state.i));
        });
        screen.classList.toggle('sold-out', !!p.agotado);

        renderText();
        showView(0, animate);
        if (state.opt) setOption(state.opt, false);
        try { history.replaceState(null, '', '#art-' + (state.i + 1)); } catch (e) {}
    }

    function build() {
        items.innerHTML = '';
        products.forEach(function (p, j) {
            var row = document.createElement('button');
            row.type = 'button';
            row.className = 'guide-item cat-item' + (p.agotado ? ' sold' : '');
            row.setAttribute('role', 'option');
            row.innerHTML = '<span class="num">' + pad(j + 1) + '</span><span class="cat-item-name"></span><small></small>';
            row.addEventListener('click', function () { select(j, true); });
            items.appendChild(row);
        });
        var m = location.hash.match(/^#art-(\d+)$/);
        select(m ? Math.min(products.length, Math.max(1, +m[1])) - 1 : 0, false);
    }

    $('cat-prev').addEventListener('click', function () { if (products.length) select(state.i - 1, true); });
    $('cat-next').addEventListener('click', function () { if (products.length) select(state.i + 1, true); });
    document.addEventListener('keydown', function (e) {
        if (!products.length || document.getElementById('menu').classList.contains('open')) return;
        if (e.key === 'ArrowRight') select(state.i + 1, true);
        if (e.key === 'ArrowLeft') select(state.i - 1, true);
    });

    Promise.all([P.settings(), P.loadData('merch')]).then(function (r) {
        products = (r[1] && r[1].productos) || [];
        if (!products.length) {
            nameEl.textContent = t('PRÓXIMAMENTE');
            return;
        }
        build();
    }).catch(function () { nameEl.textContent = t('PRÓXIMAMENTE'); });

    P.onLang(renderText);
})();
