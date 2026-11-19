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
    var buy = $('cat-buy'), buyLabel = $('cat-buy-label');
    var addBtn = $('cat-add'), addLabel = $('cat-add-label');

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

    var addedTimer = null;
    function updateBuy() {
        var p = products[state.i];
        clearTimeout(addedTimer);
        addBtn.classList.remove('added');
        if (p.agotado) {
            addBtn.disabled = true;
            addLabel.textContent = t('AGOTADO');
            buy.hidden = true;
            return;
        }
        addBtn.disabled = false;
        addLabel.textContent = t('AGREGAR AL CARRITO');
        buy.hidden = false;
        buy.href = P.waLink(message(p));
        buyLabel.textContent = t('o pídelo directo por WhatsApp');
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
        if (!products.length || document.getElementById('menu').classList.contains('open') || isCartOpen()) return;
        if (e.target.closest && e.target.closest('input, textarea, select')) return;
        if (e.key === 'ArrowRight') select(state.i + 1, true);
        if (e.key === 'ArrowLeft') select(state.i - 1, true);
    });

    /* =========================================================
       Carrito: se guarda en el navegador del visitante y se envía
       como un solo pedido por WhatsApp. Los precios siempre se
       recalculan con data/merch.json.
       ========================================================= */
    var CART_KEY = 'panaqa-cart';
    var MAX_QTY = 20;
    var cart = [];
    try { cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]') || []; } catch (e) { cart = []; }
    if (!Array.isArray(cart)) cart = [];

    var cartEl = $('cart'), fab = $('cart-fab'), countEl = $('cart-count');
    var itemsEl = $('cart-items'), emptyEl = $('cart-empty'), footEl = $('cart-foot');
    var totalEl = $('cart-total'), sendBtn = $('cart-send');
    var nameInput = $('cart-name'), cityInput = $('cart-city');
    var lastFocus = null;

    function saveCart() { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {} }
    function findProduct(name) {
        for (var i = 0; i < products.length; i++) if (products[i].nombre === name) return products[i];
        return null;
    }
    function optText(p, opt, lang) {
        if (!opt || !optType(p)) return '';
        var label = optType(p) === 'talla' ? 'Talla' : 'Diseño';
        return (lang ? t(label.toUpperCase()) : label) + ' ' + opt;
    }
    /* Quita del carrito lo que ya no existe, se agotó o cambió de opciones */
    function cartLines() {
        var lines = [], changed = false;
        cart = cart.filter(function (c) {
            var p = findProduct(c.name);
            var ok = p && !p.agotado && (!optType(p) || P.prodValues(p).indexOf(c.opt) >= 0);
            if (!ok) { changed = true; return false; }
            c.qty = Math.min(MAX_QTY, Math.max(1, parseInt(c.qty, 10) || 1));
            lines.push({ item: c, product: p, subtotal: (Number(p.precio) || 0) * c.qty });
            return true;
        });
        if (changed) saveCart();
        return lines;
    }
    function orderMessage(lines, total) {
        var msg = 'Hola PANAQA, quiero hacer este pedido:\n';
        lines.forEach(function (l) {
            var o = optText(l.product, l.item.opt, false);
            msg += '\n• ' + l.item.qty + ' × ' + l.product.nombre + (o ? ' — ' + o : '') + ' — ' + P.formatPrice(l.subtotal);
        });
        msg += '\n\nTotal: ' + P.formatPrice(total);
        var name = nameInput.value.trim(), city = cityInput.value.trim();
        if (name) msg += '\nNombre: ' + name;
        if (city) msg += '\nCiudad: ' + city;
        return msg;
    }
    function renderCart() {
        if (!products.length) return;
        var lines = cartLines();
        var count = 0, total = 0;
        lines.forEach(function (l) { count += l.item.qty; total += l.subtotal; });

        fab.hidden = count === 0;
        countEl.textContent = count;
        emptyEl.hidden = lines.length > 0;
        footEl.hidden = lines.length === 0;
        totalEl.textContent = P.formatPrice(total);

        itemsEl.innerHTML = lines.map(function (l, i) {
            var p = l.product, o = optText(p, l.item.opt, true);
            var img = (p.imagenes && p.imagenes[0]) || '';
            return '<div class="cart-item">' +
                '<img src="' + esc(img) + '" alt="" loading="lazy">' +
                '<div class="cart-item-info">' +
                    '<div class="cart-item-name">' + esc(P.prodName(p)) + '</div>' +
                    (o ? '<div class="cart-item-opt">' + esc(o) + '</div>' : '') +
                    '<div class="cart-qty">' +
                        '<button type="button" data-act="dec" data-i="' + i + '" aria-label="Quitar uno">−</button>' +
                        '<span aria-live="polite">' + l.item.qty + '</span>' +
                        '<button type="button" data-act="inc" data-i="' + i + '" aria-label="Agregar uno"' + (l.item.qty >= MAX_QTY ? ' disabled' : '') + '>+</button>' +
                    '</div>' +
                '</div>' +
                '<div class="cart-item-side">' +
                    '<button type="button" class="cart-remove" data-act="del" data-i="' + i + '" aria-label="Quitar del carrito">✕</button>' +
                    '<div class="cart-item-price">' + P.formatPrice(l.subtotal) + '</div>' +
                '</div>' +
            '</div>';
        }).join('');

        sendBtn.href = lines.length ? P.waLink(orderMessage(lines, total)) : '#';
    }

    function addToCart() {
        var p = products[state.i];
        if (!p || p.agotado) return;
        var opt = optType(p) ? state.opt : null;
        var found = null;
        cart.forEach(function (c) { if (c.name === p.nombre && (c.opt || null) === opt) found = c; });
        if (found) found.qty = Math.min(MAX_QTY, found.qty + 1);
        else cart.push({ name: p.nombre, opt: opt, qty: 1 });
        saveCart();
        renderCart();
        /* Confirmación en el botón y en el carrito flotante */
        addBtn.classList.add('added');
        addLabel.textContent = '✓ ' + t('AGREGADO');
        clearTimeout(addedTimer);
        addedTimer = setTimeout(function () {
            addBtn.classList.remove('added');
            addLabel.textContent = t('AGREGAR AL CARRITO');
        }, 1400);
        fab.classList.remove('bump');
        void fab.offsetWidth;
        fab.classList.add('bump');
    }

    function isCartOpen() { return !cartEl.hidden; }
    function openCart() {
        renderCart();
        lastFocus = document.activeElement;
        cartEl.hidden = false;
        document.body.style.overflow = 'hidden';
        cartEl.querySelector('.cart-close').focus();
    }
    function closeCart() {
        cartEl.hidden = true;
        document.body.style.overflow = '';
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    addBtn.addEventListener('click', addToCart);
    fab.addEventListener('click', openCart);
    cartEl.addEventListener('click', function (e) {
        if (e.target.closest('[data-cart-close]')) { closeCart(); return; }
        var b = e.target.closest('button[data-act]');
        if (!b) return;
        var line = cartLines()[+b.getAttribute('data-i')];
        if (!line) return;
        var act = b.getAttribute('data-act');
        if (act === 'inc') line.item.qty = Math.min(MAX_QTY, line.item.qty + 1);
        if (act === 'dec') line.item.qty -= 1;
        if (act === 'del' || line.item.qty < 1) cart.splice(cart.indexOf(line.item), 1);
        saveCart();
        renderCart();
        if (!cart.length) closeCart();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isCartOpen()) closeCart(); });
    [nameInput, cityInput].forEach(function (inp) { inp.addEventListener('input', renderCart); });
    $('cart-clear').addEventListener('click', function () {
        cart = [];
        saveCart();
        renderCart();
        closeCart();
    });

    Promise.all([P.settings(), P.loadData('merch')]).then(function (r) {
        products = (r[1] && r[1].productos) || [];
        if (!products.length) {
            nameEl.textContent = t('PRÓXIMAMENTE');
            return;
        }
        build();
        renderCart();
    }).catch(function () { nameEl.textContent = t('PRÓXIMAMENTE'); });

    P.onLang(function () { renderText(); renderCart(); });
})();
