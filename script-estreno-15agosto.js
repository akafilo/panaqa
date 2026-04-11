// Script principal de PANAQA - Versión estable

// Video aleatorio en el Hero
(function() {
    var videos = ['FX0ry6Quzno', 'aLC5QA4WvQw', 'pahU-5d8tGA'];
    var id = videos[Math.floor(Math.random() * videos.length)];
    var iframe = document.getElementById('hero-iframe');
    if (iframe) {
        iframe.src = 'https://www.youtube.com/embed/' + id +
            '?autoplay=1&mute=1&loop=1&playlist=' + id +
            '&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1';
    }
})();

// Navegación móvil
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menú móvil
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animación del botón hamburguesa
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Cerrar menú si se hace click fuera de él
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = navToggle.contains(event.target);
        if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    });

    // Traducción ES/EN/ZH
    const langToggle = document.getElementById('lang-toggle');
    const languageStrings = {
        'Inicio': { en: 'Home', zh: '首页' },
        'Música': { en: 'Music', zh: '音乐' },
        'Presentaciones': { en: 'Shows', zh: '演出' },
        'Merch': { en: 'Merch', zh: '商品' },
        'Nosotros': { en: 'About', zh: '关于' },
        'Letras': { en: 'Lyrics', zh: '歌词' },
        'NUESTRA MÚSICA': { en: 'OUR MUSIC', zh: '我们的音乐' },
        'YA DISPONIBLE': { en: 'NOW AVAILABLE', zh: '现已发行' },
        'Sesión en vivo': { en: 'Live Session', zh: '现场演出' },
        'Disco Panaqa': { en: 'Panaqa Album', zh: 'Panaqa 专辑' },
        'Nuevos Singles': { en: 'New Singles', zh: '新单曲' },
        'LA YAPITA': { en: 'THE TIP', zh: '小费' },
        'Sin sonido': { en: 'Muted', zh: '静音' },
        'Con sonido': { en: 'Sound On', zh: '有声音' },
        'FECHAS DE PRESENTACIONES': { en: 'TOUR DATES', zh: '演出日期' },
        'BOLETOS': { en: 'TICKETS', zh: '门票' },
        'Consulta las fechas del Mes': { en: "Check the month's dates", zh: '查看本月日期' },
        'PRODUCTOS OFICIALES': { en: 'OFFICIAL MERCH', zh: '官方周边' },
        'PRODUCTOS OFICIALES DE PANAQA': { en: 'OFFICIAL PANAQA PRODUCTS', zh: 'PANAQA 官方产品' },
        'Pedir ahora': { en: 'Order now', zh: '立即订购' },
        'Talla': { en: 'Size', zh: '尺码' },
        'Elige tu versión': { en: 'Choose your version', zh: '选择你的版本' },
        'Imprime tu poster PANAQA en alta calidad con dos diseños exclusivos.': { en: 'Print your PANAQA poster in high quality with two exclusive designs.', zh: '以高品质打印您的 PANAQA 海报，提供两个独特设计。' },
        'Pago por WhatsApp': { en: 'Pay via WhatsApp', zh: '通过 WhatsApp 支付' },
        'Envío internacional': { en: 'International shipping', zh: '国际配送' },
        'Consulta por nuestro envío internacional, tarifas y posibilidades.': { en: 'Check our international shipping, rates and options.', zh: '了解我们的国际运输、费率和可选项。' },
        'Envío nacional': { en: 'National shipping', zh: '全国配送' },
        'Envío gratuito a todo el Perú  mediante agentes de envío como Shalom y Olva Courier.': { en: 'Free shipping throughout Peru via carriers like Shalom and Olva Courier.', zh: '通过 Shalom 和 Olva Courier 等运输代理，可免费送货至秘鲁全国。' },
        'Diseño auténtico': { en: 'Authentic design', zh: '真实设计' },
        'Polo "Despierta la Bestia" Blanco': { en: 'Polo "Despierta la Bestia" Blanco', zh: 'Polo "Despierta la Bestia" Blanco' },
        'Polo "Despierta la Bestia" Negro': { en: 'Polo "Despierta la Bestia" Negro', zh: 'Polo "Despierta la Bestia" Negro' },
        'Gorro Clásico': { en: 'Classic Hat', zh: '经典帽子' },
        'Disco "Sesión en vivo"': { en: 'Album "Sesión en vivo"', zh: '专辑 "Sesión en vivo"' },
        'Uña Panaqa': { en: 'Panaqa Nails', zh: 'Panaqa 指甲' },
        'Poster Panaqa': { en: 'Panaqa Poster', zh: 'Panaqa 海报' },
        'Consulta disponibilidad y medios de pago': { en: 'Check availability and payment methods', zh: '查看库存和付款方式' },
        'AGOTADO': { en: 'SOLD OUT', zh: '售罄' },
        'SOBRE PANAQA': { en: 'ABOUT PANAQA', zh: '关于 PANAQA' },
        'PANAQA es una banda peruana de nu metal que surge de la necesidad de expresar la identidad cultural, fusionando la intensidad del metal con sonidos emblemáticos peruanos y rap. Formada en 2022, la banda ha logrado crear un sonido único que resuena con una generación que busca expresar su resistencia y esperanza.': { en: 'PANAQA is a Peruvian nu metal band born from the need to express cultural identity, blending the intensity of metal with iconic Peruvian sounds and rap. Formed in 2022, the band has created a unique sound that resonates with a generation seeking to express their resistance and hope.', zh: 'PANAQA 是一支秘鲁新金属乐队，诞生于表达文化身份的需求，将标志性的秘鲁声音与说唱和金属的强度融合。成立于 2022 年，乐队创造了独特的声音，与寻求表达抵抗和希望的一代人产生共鸣。' },
        'Con letras que hablan de superación personal, crítica social y la lucha interna del ser humano contemporáneo, PANAQA se ha posicionado como una voz auténtica en la escena del metal latinoamericano.': { en: 'With lyrics that speak of personal growth, social critique and the internal struggle of the contemporary human being, PANAQA has positioned itself as an authentic voice in the Latin American metal scene.', zh: 'PANAQA 的歌词讲述了个人成长、社会批判和当代人内心的斗争，使其成为拉丁美洲金属界真实的声音。' },
        'Integrantes': { en: 'Members', zh: '成员' },
        'SÍGUENOS EN INSTAGRAM': { en: 'FOLLOW US ON INSTAGRAM', zh: '关注我们的 Instagram' },
        'No te pierdas nuestras últimas publicaciones, fotos exclusivas detrás de cámaras, videos en vivo y mucho más contenido exclusivo.': { en: 'Don’t miss our latest posts, exclusive behind-the-scenes photos, live videos and much more exclusive content.', zh: '不要错过我们的最新帖子、独家幕后照片、现场视频以及更多独家内容。' },
        'VER PUBLICACIONES': { en: 'VIEW POSTS', zh: '查看帖子' },
        'ÚNETE A LA RESISTENCIA': { en: 'JOIN THE RESISTANCE', zh: '加入抵抗' },
        'Únete a nuestra comunidad gratuita de WhatsApp para contenido exclusivo, sorteos y descuentos para nuestras presentaciones, y mucho más.': { en: 'Join our free WhatsApp community for exclusive content, giveaways and discounts for our shows, and much more.', zh: '加入我们的免费 WhatsApp 社区，获取独家内容、抽奖和演出折扣，以及更多精彩内容。' },
        'ÚNETE AHORA': { en: 'JOIN NOW', zh: '立即加入' },
        'Enlaces': { en: 'Links', zh: '链接' },
        'Más Información': { en: 'More Information', zh: '更多信息' },
        'Contacto': { en: 'Contact', zh: '联系' },
        'Política de Privacidad': { en: 'Privacy Policy', zh: '隐私政策' },
        '¿Dónde quieres escucharlo?': { en: 'Where do you want to listen?', zh: '你想在哪里收听？' },
        'Información de Contacto': { en: 'Contact Information', zh: '联系信息' },
        'Para contratos y presskit:': { en: 'For contracts and press kit:', zh: '用于合同和新闻资料包：' },
        'Última actualización:': { en: 'Last updated:', zh: '最后更新：' },
        'Información que recopilamos': { en: 'Information we collect', zh: '我们收集的信息' },
        'Cómo utilizamos tu información': { en: 'How we use your information', zh: '我们如何使用您的信息' },
        'Utilizamos la información recopilada para:': { en: 'We use the information collected to:', zh: '我们使用收集的信息来：' },
        'Mejorar nuestros servicios y experiencia del usuario': { en: 'Improve our services and user experience', zh: '改进我们的服务和用户体验' },
        'Enviar actualizaciones sobre conciertos y lanzamientos': { en: 'Send updates about concerts and releases', zh: '发送有关演唱会和发行的更新' },
        'Responder a consultas y proporcionar soporte': { en: 'Respond to inquiries and provide support', zh: '回应查询并提供支持' },
        'Personalizar contenido y recomendaciones': { en: 'Personalize content and recommendations', zh: '个性化内容和推荐' },
        'Compartir información': { en: 'Sharing information', zh: '共享信息' },
        'No vendemos, intercambiamos ni transferimos tu información personal a terceros sin tu consentimiento, excepto cuando sea necesario para proporcionar nuestros servicios.': { en: 'We do not sell, trade or transfer your personal information to third parties without your consent, except when necessary to provide our services.', zh: '我们不会在未经您同意的情况下将您的个人信息出售、交易或转让给第三方，除非为了提供我们的服务而必要。' },
        'Cookies y tecnologías similares': { en: 'Cookies and similar technologies', zh: 'Cookie 和类似技术' },
        'Utilizamos cookies para mejorar tu experiencia de navegación y analizar el tráfico del sitio web.': { en: 'We use cookies to improve your browsing experience and analyze website traffic.', zh: '我们使用 Cookie 来改善您的浏览体验并分析网站流量。' },
        'Seguridad': { en: 'Security', zh: '安全' },
        'Implementamos medidas de seguridad apropiadas para proteger tu información personal contra acceso no autorizado, alteración o divulgación.': { en: 'We implement appropriate security measures to protect your personal information from unauthorized access, alteration or disclosure.', zh: '我们实施适当的安全措施，以保护您的个人信息免遭未经授权的访问、更改或披露。' },
        'Tus derechos': { en: 'Your rights', zh: '您的权利' },
        'Tienes derecho a acceder, actualizar o eliminar tu información personal. Para ejercer estos derechos, contáctanos en panaqaband@gmail.com': { en: 'You have the right to access, update or delete your personal information. To exercise these rights, contact us at panaqaband@gmail.com', zh: '您有权访问、更新或删除您的个人信息。要行使这些权利，请通过 panaqaband@gmail.com 与我们联系' }
    };
    const reverseMap = {};
    Object.keys(languageStrings).forEach(key => {
        reverseMap[key] = key;
        const values = languageStrings[key];
        Object.keys(values).forEach(lang => {
            reverseMap[values[lang]] = key;
        });
    });
    const langOrder = ['es', 'en', 'zh'];
    let currentLang = localStorage.getItem('panaqaLang') || 'es';
    function translatePage(lang) {
        currentLang = lang;
        localStorage.setItem('panaqaLang', lang);
        document.documentElement.lang = lang;
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
            const text = node.nodeValue.trim();
            if (!text) continue;
            const key = reverseMap[text];
            if (!key) continue;
            const translation = lang === 'es' ? key : languageStrings[key][lang];
            if (translation) {
                node.nodeValue = node.nodeValue.replace(text, translation);
            }
        }
        if (langToggle) {
            const label = langToggle.querySelector('.lang-label');
            if (label) {
                label.textContent = lang === 'en' ? 'EN' : lang === 'zh' ? '中文' : 'ES';
            }
        }
    }
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            const nextIndex = (langOrder.indexOf(currentLang) + 1) % langOrder.length;
            translatePage(langOrder[nextIndex]);
        });
    }
    translatePage(currentLang);

    // Scroll suave y navbar transparencia dinámica
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrolled = window.pageYOffset;
        
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Animaciones al scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const animateElements = document.querySelectorAll('.music-item, .tour-item, .merch-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Música: Play buttons
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Simular reproducción (aquí puedes integrar con Spotify API o similar)
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('fa-play')) {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                this.style.backgroundColor = 'var(--text-primary)';
                this.style.color = 'var(--primary-color)';
                
                // Simular parada después de 3 segundos
                setTimeout(() => {
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                    this.style.backgroundColor = 'var(--primary-color)';
                    this.style.color = 'var(--text-primary)';
                }, 3000);
            }
        });
    });

    // Merchandise: WhatsApp consultation functionality
    const whatsappButtons = document.querySelectorAll('.quick-add');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // El enlace se abrirá automáticamente por el target="_blank"
            // Agregar efecto visual opcional
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Botones bloqueados/próximamente functionality
    const lockedButtons = document.querySelectorAll('.btn-locked');
    lockedButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Mostrar notificación temporal
            showLockedNotification();
            
            // Efecto visual de botón presionado pero sin acción
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Función para mostrar notificación de content locked
    function showLockedNotification() {
        // Crear elemento de notificación si no existe
        let notification = document.getElementById('locked-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'locked-notification';
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-clock"></i>
                    <span>¡Muy pronto estará disponible!</span>
                </div>
            `;
            document.body.appendChild(notification);
            
            // Agregar estilos inline
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, var(--primary-color), #ef4444);
                color: white;
                padding: 15px 25px;
                border-radius: 8px;
                z-index: 10000;
                opacity: 0;
                animation: slideInDown 0.3s ease forwards;
                box-shadow: 0 4px 20px rgba(220, 38, 38, 0.3);
                font-weight: 600;
                letter-spacing: 0.5px;
            `;
        }
        
        // Mostrar notificación
        notification.style.opacity = '1';
        notification.style.animation = 'slideInDown 0.3s ease forwards';
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutUp 0.3s ease forwards';
            setTimeout(() => {
                notification.style.opacity = '0';
            }, 300);
        }, 3000);
    }

    // Efectos de hover mejorados para tour items
    const tourItems = document.querySelectorAll('.tour-item');
    tourItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // El iframe de YouTube ya tiene autoplay=1, mute=1 y loop=1 en su src.
    // No se toca heroVideo.src para evitar recargas del iframe que bloquean el autoplay.

    // Parallax effect mejorado para el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const heroOverlay = document.querySelector('.hero-overlay');
        const heroHeight = document.querySelector('.hero').offsetHeight;
        
        if (heroContent && scrolled < heroHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        if (heroOverlay && scrolled < heroHeight) {
            const opacity = Math.min(0.8, 0.3 + (scrolled / heroHeight) * 0.5);
            heroOverlay.style.background = `linear-gradient(
                45deg,
                rgba(0, 0, 0, ${opacity}),
                rgba(220, 38, 38, 0.3),
                rgba(0, 0, 0, ${opacity + 0.1})
            )`;
        }
    });

    // Efecto de aparición gradual para el logo del hero
    const heroLogo = document.querySelector('.hero-logo-image');
    if (heroLogo) {
        heroLogo.style.opacity = '0';
        heroLogo.style.transform = 'scale(0.8) translateY(30px)';
        
        setTimeout(() => {
            heroLogo.style.transition = 'all 1.5s ease-out';
            heroLogo.style.opacity = '1';
            heroLogo.style.transform = 'scale(1) translateY(0)';
        }, 1000);
    }

    // Comentado mientras usamos el logo
    /*
    // Efecto de escritura para el título del hero
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid var(--primary-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    */

    // Loading screen con logo — animación letra por letra
    if (!window.location.pathname.endsWith('merch.html') && !window.location.pathname.endsWith('letras.html')) {
        const loadingScreen = document.createElement('div');
        loadingScreen.innerHTML = `
        <div id="loading-screen-main" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        ">
            <div id="loading-svg-wrap" style="
                position: relative;
                z-index: 1;
                height: min(560px, 80vh);
                max-width: 95vw;
                margin-bottom: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
            "></div>
        </div>
        <style>
            @keyframes loadingShake {
                0%   { transform: translate(0, 0) rotate(0deg); }
                20%  { transform: translate(-3px, 2px) rotate(-1deg); }
                40%  { transform: translate(3px, -1px) rotate(1.2deg); }
                60%  { transform: translate(-2px, 3px) rotate(-0.8deg); }
                80%  { transform: translate(2px, -2px) rotate(1deg); }
                100% { transform: translate(0, 0) rotate(0deg); }
            }
            #loading-svg-wrap svg {
                height: min(560px, 80vh);
                width: auto;
                max-width: 95vw;
                animation: loadingShake 0.4s infinite;
            }
            #loading-svg-wrap svg path {
                transition: opacity 0.15s ease, fill 0.25s ease;
            }
            @keyframes loadingExit {
                0% {
                    transform: translateY(0);
                    opacity: 1;
                }
                100% {
                    transform: translateY(110vh);
                    opacity: 0;
                }
            }
            .loading-exit {
                animation: loadingExit 0.7s ease forwards;
            }
        </style>
    `;

        document.body.appendChild(loadingScreen);

        let loadingRevealComplete = false;
        let pageHasLoaded = false;
        let loadingExitScheduled = false;

        function scheduleLoadingExit() {
            if (!loadingRevealComplete || !pageHasLoaded || loadingExitScheduled) return;
            const loadingMain = document.getElementById('loading-screen-main');
            if (!loadingMain) return;
            loadingExitScheduled = true;
            setTimeout(() => {
                loadingMain.classList.add('loading-exit');
            }, 1000);
            setTimeout(() => {
                loadingScreen.remove();
            }, 1700);
        }

        // Carga el SVG e inyéctalo inline para animar cada path por separado
    fetch('assets/despierta.svg')
        .then(function(r) { return r.text(); })
        .then(function(svgText) {
            var cleanSvg = svgText
                .replace(/<\?xml[^>]+\?>/g, '')
                .replace(/<!DOCTYPE[^>]+>/g, '')
                .trim();

            var container = document.getElementById('loading-svg-wrap');
            if (!container) return;
            container.innerHTML = cleanSvg;

            var svg = container.querySelector('svg');
            if (!svg) return;

            // Quitar dimensiones fijas y controlar tamaño por CSS
            svg.removeAttribute('width');
            svg.removeAttribute('height');
            svg.style.height = 'min(560px, 80vh)';
            svg.style.width = 'auto';
            svg.style.maxWidth = '95vw';
            svg.style.animation = 'loadingShake 0.4s infinite';
            svg.style.transformOrigin = '50% 50%';

            // Ocultar todos los paths al inicio
            var paths = Array.from(svg.querySelectorAll('path'));
            paths.forEach(function(p) {
                p.style.opacity = '0';
                p.style.transition = 'opacity 0.18s ease';
            });

            // Extraer coordenada del primer punto M de cada path
            // (el SVG usa escala invertida: mayor Y en datos = más arriba en pantalla)
            var pathData = paths.map(function(p) {
                var d = p.getAttribute('d') || '';
                var m = d.match(/M(\d+)\s+(\d+)/);
                return {
                    path: p,
                    x: m ? parseInt(m[1]) : 0,
                    y: m ? parseInt(m[2]) : 0
                };
            });

            // Fila superior "!!!DESPIERTA!!" → y >= 10000, ordenados izq→der
            // Fila inferior "LA BESTIA!!"    → y <  10000, ordenados izq→der
            var row1 = pathData.filter(function(p) { return p.y >= 10000; })
                               .sort(function(a, b) { return a.x - b.x; });
            var row2 = pathData.filter(function(p) { return p.y < 10000; })
                               .sort(function(a, b) { return a.x - b.x; });
            var sorted = row1.concat(row2);

            // Revelar cada path con un delay incremental
            var ms = 90;
            sorted.forEach(function(item, i) {
                setTimeout(function() { item.path.style.opacity = '1'; }, i * ms);
            });

            // Activar temblor cuando todas las letras ya son visibles
            setTimeout(function() {
                svg.style.animation = 'loadingShake 0.4s infinite';
                loadingRevealComplete = true;
                scheduleLoadingExit();
            }, sorted.length * ms + 200);
        })
        .catch(function() {
            // Fallback al PNG si no carga el SVG
            var container = document.getElementById('loading-svg-wrap');
            if (container) {
                container.innerHTML = '<img src="assets/despierta.png" alt="PANAQA" style="height:min(560px,80vh);width:auto;max-width:95vw;animation:loadingShake 0.4s infinite;">';
            }
        });

        window.addEventListener('load', function() {
            pageHasLoaded = true;
            scheduleLoadingExit();
        });
        if (document.readyState === 'complete') {
            pageHasLoaded = true;
            scheduleLoadingExit();
        }
    }

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === konamiSequence.length && 
            konamiCode.every((key, index) => key === konamiSequence[index])) {
            
            // Activar modo "Metal"
            document.body.style.filter = 'hue-rotate(120deg) saturate(1.5)';
            document.body.style.animation = 'shake 0.5s infinite';
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                document.body.style.filter = 'none';
                document.body.style.animation = 'none';
                style.remove();
            }, 5000);
            
            konamiCode = [];
        }
    });

    // Modal para citas musicales
    const modal = document.getElementById('music-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalSpotify = document.getElementById('modal-spotify');
    const modalApple = document.getElementById('modal-apple');
    const modalYoutube = document.getElementById('modal-youtube');
    const quoteLinks = document.querySelectorAll('.quote-modal');

    // Abrir modal al hacer clic en una cita
    quoteLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener los enlaces de los data attributes
            const spotifyLink = this.getAttribute('data-spotify');
            const appleLink = this.getAttribute('data-apple');
            const youtubeLink = this.getAttribute('data-youtube');
            
            // Asignar los enlaces a los botones del modal
            modalSpotify.href = spotifyLink;
            modalApple.href = appleLink;
            modalYoutube.href = youtubeLink;
            
            // Mostrar el modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        });
    });

    // Cerrar modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }

    // Cerrar modal al hacer clic en la X
    modalClose.addEventListener('click', closeModal);

    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Abrir enlaces en nueva pestaña y cerrar modal
    [modalSpotify, modalApple, modalYoutube].forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(this.href, '_blank');
            closeModal();
        });
    });
});

// Modal de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactLink = document.getElementById('contact-link');
    const contactModal = document.getElementById('contact-modal');
    const contactModalClose = contactModal.querySelector('.modal-close');

    // Abrir modal de contacto
    contactLink.addEventListener('click', function(e) {
        e.preventDefault();
        contactModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    });

    // Cerrar modal de contacto
    function closeContactModal() {
        contactModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }

    // Cerrar modal al hacer clic en la X
    contactModalClose.addEventListener('click', closeContactModal);

    // Cerrar modal al hacer clic fuera del contenido
    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });

    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal.style.display === 'block') {
            closeContactModal();
        }
    });

    // Modal de política de privacidad
    const privacyLink = document.getElementById('privacy-link');
    const privacyModal = document.getElementById('privacy-modal');
    const privacyModalClose = privacyModal.querySelector('.modal-close');

    // Abrir modal de privacidad
    privacyLink.addEventListener('click', function(e) {
        e.preventDefault();
        privacyModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    });

    // Cerrar modal de privacidad
    function closePrivacyModal() {
        privacyModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }

    // Cerrar modal al hacer clic en la X
    privacyModalClose.addEventListener('click', closePrivacyModal);

    // Cerrar modal al hacer clic fuera del contenido
    privacyModal.addEventListener('click', function(e) {
        if (e.target === privacyModal) {
            closePrivacyModal();
        }
    });

    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && privacyModal.style.display === 'block') {
            closePrivacyModal();
        }
    });

    // Funcionalidad para botones circulares de Instagram
    const instagramCircles = document.querySelectorAll('.instagram-circle');
    instagramCircles.forEach(circle => {
        circle.addEventListener('click', function() {
            // Obtener la URL personalizada del atributo data-url
            const customUrl = this.getAttribute('data-url');
            if (customUrl) {
                // Abrir la URL personalizada en nueva pestaña
                window.open(customUrl, '_blank', 'noopener,noreferrer');
            } else {
                // Fallback a Instagram si no hay URL personalizada
                window.open('https://www.instagram.com/panaqa_peru', '_blank', 'noopener,noreferrer');
            }
        });
    });

    // Contador regresivo hasta el 15 de agosto de 2025
    function initCountdown() {
        // Fecha objetivo: 15 de agosto de 2025 a las 15:00 horas (3 PM hora peruana)
        const targetDate = new Date('2025-08-15T15:00:00-05:00').getTime();
        
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        // Referencias a los botones de música
        const musicSpotifyBtn = document.getElementById('music-spotify-btn');
        const musicAppleBtn = document.getElementById('music-apple-btn');
        const musicYoutubeBtn = document.getElementById('music-youtube-btn');
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance > 0) {
                // Calcular días, horas, minutos y segundos
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                // Actualizar el display
                if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
                if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
                if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
                if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
                
            } else {
                // El tiempo ha llegado
                if (daysElement) daysElement.textContent = '00';
                if (hoursElement) hoursElement.textContent = '00';
                if (minutesElement) minutesElement.textContent = '00';
                if (secondsElement) secondsElement.textContent = '00';
                
                // Ocultar el contador
                const countdownContainer = document.querySelector('.countdown-container');
                if (countdownContainer) {
                    countdownContainer.style.display = 'none';
                }
                
                // Cambiar el texto
                const releaseText = document.querySelector('.hero-featured p');
                if (releaseText) {
                    releaseText.textContent = 'YA DISPONIBLE';
                }
                
                // Mostrar botones del hero cuando esté disponible
                const heroButtons = document.querySelector('.hero-buttons');
                if (heroButtons) {
                    heroButtons.style.display = 'flex';
                }
                
                // Desbloquear botones de la sección música (ya están desbloqueados en HTML)
                /*
                if (musicSpotifyBtn) {
                    musicSpotifyBtn.classList.remove('btn-locked');
                    musicSpotifyBtn.innerHTML = '<i class="fab fa-spotify"></i> Spotify';
                    musicSpotifyBtn.href = 'https://open.spotify.com/intl-es/album/YOUR_ALBUM_ID';
                    musicSpotifyBtn.target = '_blank';
                    musicSpotifyBtn.rel = 'noopener noreferrer';
                    musicSpotifyBtn.removeAttribute('data-locked');
                }
                
                if (musicAppleBtn) {
                    musicAppleBtn.classList.remove('btn-locked');
                    musicAppleBtn.innerHTML = '<i class="fab fa-apple"></i> Apple M.';
                    musicAppleBtn.href = 'https://music.apple.com/album/YOUR_ALBUM_ID';
                    musicAppleBtn.target = '_blank';
                    musicAppleBtn.rel = 'noopener noreferrer';
                    musicAppleBtn.removeAttribute('data-locked');
                }
                
                if (musicYoutubeBtn) {
                    musicYoutubeBtn.classList.remove('btn-locked');
                    musicYoutubeBtn.innerHTML = '<i class="fab fa-youtube"></i> YouTube';
                    musicYoutubeBtn.href = 'https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID';
                    musicYoutubeBtn.target = '_blank';
                    musicYoutubeBtn.rel = 'noopener noreferrer';
                    musicYoutubeBtn.removeAttribute('data-locked');
                }
                */
                
                // El badge ya muestra "YA DISPONIBLE" permanentemente
                
                // El badge ya muestra "YA DISPONIBLE" permanentemente
                /*
                // Quitar el badge "Próximamente"
                const comingSoonBadge = document.querySelector('.coming-soon-badge');
                if (comingSoonBadge) {
                    comingSoonBadge.style.display = 'none';
                }
                */
            }
        }
        
        // Actualizar inmediatamente y luego cada segundo
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // Inicializar el contador cuando se carga la página
    initCountdown();
});

// Función para detectar dispositivo móvil
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// Optimizaciones para móvil
if (isMobileDevice()) {
    // Deshabilitar efectos parallax en móvil
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.style.transform = 'none';
    }
    
    // Reducir animaciones en móvil
    document.body.style.setProperty('--transition', 'all 0.2s ease');
}

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}
