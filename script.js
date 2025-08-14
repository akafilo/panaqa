// === FORCE CACHE UPDATE === 
// Detectar y forzar actualización de caché en dispositivos problemáticos
(function() {
    const CURRENT_VERSION = '20250814';
    const STORAGE_KEY = 'panaqa_site_version';
    
    try {
        const lastVersion = localStorage.getItem(STORAGE_KEY);
        
        // Si es primera visita o versión diferente, forzar recarga completa
        if (!lastVersion || lastVersion !== CURRENT_VERSION) {
            localStorage.setItem(STORAGE_KEY, CURRENT_VERSION);
            
            // Si no es primera visita (hay versión anterior), forzar recarga sin caché
            if (lastVersion && lastVersion !== CURRENT_VERSION) {
                window.location.reload(true);
                return;
            }
        }
        
        // Verificar si los elementos críticos están presentes
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
                const presaveBtn = document.querySelector('.btn-presave');
                const epText = document.querySelector('.hero-featured h2');
                
                // Si no encuentra elementos nuevos, forzar recarga
                if (!presaveBtn || (epText && !epText.textContent.includes('EP'))) {
                    localStorage.removeItem(STORAGE_KEY);
                    window.location.reload(true);
                }
            }, 1000);
        });
        
    } catch (e) {
        // Si hay error con localStorage, forzar recarga
        window.location.reload(true);
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

    // Optimización para video de YouTube
    const heroVideo = document.querySelector('.hero-youtube-video');
    if (heroVideo) {
        // Pausar video cuando no está visible para ahorrar ancho de banda
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Video visible, mantener reproduciendo
                    heroVideo.src = heroVideo.src;
                } else {
                    // Video no visible, pausar para ahorrar datos
                    // En móvil, pausar automáticamente
                    if (window.innerWidth <= 768) {
                        heroVideo.src = heroVideo.src.replace('autoplay=1', 'autoplay=0');
                    }
                }
            });
        });
        
        observer.observe(heroVideo);
    }

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

    // Loading screen con logo
    const loadingScreen = document.createElement('div');
    loadingScreen.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #000, #dc2626);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        ">
            <img src="assets/logo-panaqa.svg" alt="PANAQA" style="
                height: 140px;
                width: auto;
                max-width: 400px;
                margin-bottom: 2rem;
                animation: loadingPulse 2s infinite;
                filter: brightness(1.2) drop-shadow(0 0 30px rgba(255, 255, 255, 0.8));
                object-fit: contain;
            ">
            <div style="
                width: 50px;
                height: 50px;
                border: 3px solid #fff;
                border-top: 3px solid transparent;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            "></div>
        </div>
        <style>
            @keyframes loadingPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    document.body.appendChild(loadingScreen);
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 2000);
    });

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

    // Reproductor de música básico (simulado)
    let currentTrack = null;
    let isPlaying = false;

    function createMusicPlayer() {
        const player = document.createElement('div');
        player.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.9);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                padding: 1rem;
                color: white;
                display: none;
                z-index: 1000;
                backdrop-filter: blur(10px);
            " id="music-player">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <button id="player-toggle" style="
                        background: var(--primary-color);
                        border: none;
                        color: white;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        cursor: pointer;
                    ">
                        <i class="fas fa-play"></i>
                    </button>
                    <div>
                        <div id="track-title" style="font-weight: bold; font-size: 0.9rem;"></div>
                        <div id="track-artist" style="color: #ccc; font-size: 0.8rem;">PANAQA</div>
                    </div>
                    <button id="player-close" style="
                        background: none;
                        border: none;
                        color: #ccc;
                        cursor: pointer;
                        font-size: 1.2rem;
                    ">×</button>
                </div>
                <div style="
                    width: 200px;
                    height: 3px;
                    background: #333;
                    margin-top: 0.5rem;
                    border-radius: 2px;
                ">
                    <div id="progress-bar" style="
                        width: 0%;
                        height: 100%;
                        background: var(--primary-color);
                        border-radius: 2px;
                        transition: width 0.1s ease;
                    "></div>
                </div>
            </div>
        `;
        document.body.appendChild(player);

        // Funcionalidad del reproductor
        const playerElement = document.getElementById('music-player');
        const toggleButton = document.getElementById('player-toggle');
        const closeButton = document.getElementById('player-close');
        const progressBar = document.getElementById('progress-bar');
        
        let progress = 0;
        let progressInterval;

        toggleButton.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (isPlaying) {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                clearInterval(progressInterval);
                isPlaying = false;
            } else {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                
                progressInterval = setInterval(() => {
                    progress += 0.5;
                    progressBar.style.width = progress + '%';
                    
                    if (progress >= 100) {
                        progress = 0;
                        icon.classList.remove('fa-pause');
                        icon.classList.add('fa-play');
                        clearInterval(progressInterval);
                        isPlaying = false;
                    }
                }, 50);
                
                isPlaying = true;
            }
        });

        closeButton.addEventListener('click', function() {
            playerElement.style.display = 'none';
            clearInterval(progressInterval);
            isPlaying = false;
            currentTrack = null;
        });

        return playerElement;
    }

    const musicPlayer = createMusicPlayer();

    // Conectar botones de reproducción con el reproductor
    playButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const musicItem = this.closest('.music-item');
            const trackTitle = musicItem.querySelector('h3').textContent;
            
            document.getElementById('track-title').textContent = trackTitle;
            document.getElementById('music-player').style.display = 'block';
            
            // Resetear progreso
            document.getElementById('progress-bar').style.width = '0%';
            
            currentTrack = trackTitle;
        });
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
                
                // Desbloquear botones de la sección música
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
                
                // Quitar el badge "Próximamente"
                const comingSoonBadge = document.querySelector('.coming-soon-badge');
                if (comingSoonBadge) {
                    comingSoonBadge.style.display = 'none';
                }
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
