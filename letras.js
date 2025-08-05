// JavaScript para la página de letras con reproductor de YouTube
let player;
let isPlayerReady = false;

// Inicializar la API de YouTube
function onYouTubeIframeAPIReady() {
    console.log('✅ YouTube API Ready');
}

// Variable para verificar si la API de YouTube se está cargando
let ytApiLoaded = false;

// Cargar la API de YouTube si no está cargada
function loadYouTubeAPI() {
    if (typeof YT !== 'undefined') {
        console.log('✅ YouTube API ya está disponible');
        ytApiLoaded = true;
        return;
    }
    
    if (ytApiLoaded) return;
    
    console.log('🔄 Cargando YouTube API...');
    ytApiLoaded = true;
    
    // La API ya debería estar cargada desde el HTML, pero verificamos
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando aplicación de letras...');
    
    // Cargar la API de YouTube
    loadYouTubeAPI();
    
    // Objeto con todas las letras y IDs de YouTube de las canciones
    const lyricsData = {
        'qumbia': {
            title: 'Qumbia',
            youtubeId: '-0Z0R_arZZg', // ID del video de YouTube
            lyrics: `Para ti, que te fuiste despedido
Por el hijo de algún engreído
A ti que juzgaron por no haber tenido
El dinero para el viaje de final de ciclo

Te dijeron que no estabas a la altura de la chamba
Y te obligaron a cambiar tu alma
Por un sueldo que no alcanza
Si haciendo la balanza
La materia básica está en alza

¿Te acuerdas? Ese bullying del colegio
Y ese apodo te lo dicen aún de viejo
Normal que nos mantengan con complejos
Si ahora adulto lo que fue de niño es un reflejo

Oye, yo también vengo de las sombras
De la lluvia fuerte, de la injusta suerte
Yo también me crié bajo tus normas
La casa del frente, la que nunca duerme

Yo me fui de casa y no wa regresar
Aunque a veces me gusta recordar
No todo fue bueno, la pasé mal
Años después por fin encontré mi lugar, mira

Por los llantos, las cuentas en blanco
Los "me caigo y me levanto"
Las facturas siguen llegando y llegando
El dolor de cabeza ya me estaba matando

Ahora respiro un poco más tranquilo
Sin problemas, las cargas pesan menos
De mí depende, los cultivos de este sueño
Y puedes venir a disfrutar conmigo

Oye, yo también vengo de las sombras
De la lluvia fuerte, de la injusta suerte
Yo también me crié bajo tus normas
La casa del frente, la que nunca duerme

Desde los Andes, en los adentros
La jungla hasta mi selva de cemento
Un puñado de jaguares hambrientos
Cansados de su cruel experimento

¿Cuántos años aguantando sus burlas?
Mestizo, cholo, me juzgas
Una pregunta...
¿Mi voto vale lo mismo que el tuyo dentro de la urna?

Que sí vivo dentro de una laguna
La puna, o al frente de la luna, con plumas
Que si tengo raro aroma
Que si mis padres fueron a un colegio lejos de esta zona

¿Qué si la rabia me detona? Pero claro, no ves cómo me hacen besar esa lona?
Si la mesa me sabe a leche del PRONAA
Y la masa más pudiente piensa que tiene corona
Que piensa que tiene corona...
Oye, ¿entonces porque carajos no me tratas como persona?

La voz de mi pueblo presente (¿de quién?)
La voz de mi pueblo presente (¿de quién?)
La voz de mi pueblo presente (¿de quién?)
La voz de mi pueblo presente

La voz de mi pueblo presente (¿de quién?)
La voz de mi pueblo presente (¿de quién?)
La voz de mi pueblo presente (¿de quién?)
La voz de mi pueblo presente (¿de quién?)

Presenteeeeee...
Presenteeeeee...

La voz de mi pueblo presente
La voz de mi pueblo presente

Noooooooooooooooooo`
        },
        'somos': {
            title: 'Somos',
            youtubeId: 'fMfcnop5TUU',
            lyrics: `Somos la sangre y el sudor
La fe de que mañana todo será mejor
La esperanza puesta y una misión
Pelear para que triunfe la nueva generación

Porque vengo de un país listo para el duelo
Con los pies bien pegaditos al suelo
Pero no te equivoques, esto no es miedo
Estamos preparados para emprender el vuelo

Tengo la imagen en el cielo (en el cielo)
De Chabuca improvisando junto al Zambo Cavero
De Polo Campos junto a La Paz de Kike
Soy cholo, soy inca, No me critiques

Somos
Ese conjunto de razones que nos mueve a levantarnos antes de las seis am
Somos
La fuerza del interior, una llama de esperanza buscando algo mejor
Somos
Quien tiene de inga o de mandinga, acá no existe roche cuando escribo mi firma
Somos
La costa, la sierra y la selva, pura sangre seria, esto es Perú ¡ah!

Yo también me despertaba temprano
Para ver la previa del partido con toditos mis hermanos
Un ceviche de entrada y una chanchita
Juntos en manchón, todos con chela en la mano

Todos con camisetas de equipos peruanos
Tan multicolor, acá no entraban los tiranos
Una voz de fondo que narraba la jugada
Que anunciaba el gol ¡todos botaban sus tragos!

Somos
Ese conjunto de razones que nos mueve a levantarnos antes de las seis am
Somos
La fuerza del interior, una llama de esperanza buscando algo mejor
Somos
Quien tiene de inga o de mandinga, acá no existe roche cuando escribo mi firma
Somos
La costa, la sierra y la selva, pura sangre seria, esto es Perú ¡ah!

Esto es Perú ¡ah!
Esto es Perú ¡ah!
Esto es Perú ¡ah!
Esto es Perú ¡ah!

Pon el puño en alto si tú eres peruano
Puño en alto si tú eres peruano
Pon el puño en alto si tú eres peruano
Puño en alto si tú eres peruano

Pon el puño en alto si tú eres peruano
Puño en alto si tú eres peruano
Pon el puño en alto si tú eres peruano
Puño en alto si tú eres peruano

Somos
Somos
Somos
Somos

Esto es Perú ¡ah!
Somos
Somos
Esto es Perú ¡ah!
Somos
Somos
Esto es Perú ¡ah!
Somos
Somos
Esto es Perú ¡ah!
Somos
Somos`
        },
        'impostor': {
            title: 'Impostor',
            youtubeId: 'mdYjkvVU4Qg', // Placeholder - reemplazar con el ID correcto
            lyrics: `Yo crecí en un city
Donde si eras distinto te llamaban friki
Lo leí en un graffiti
La crueldad de la vida no estaba en la wiki

Escribiendo rapeo en cuaderno de seguimiento del colegio de turno y
Grabando canciones de mierda en un baño usando un micrófono de coolbox

Me cambié de color el cabello
Los tatuajes borré de mi cuello
Incendié mis polos color negro
Para aparentar, para parecer como tú

Me cambié de color el cabello
Los tatuajes borré de mi cuello
Incendié mis polos color negro
Para aparentar, para parecer como tú

Quise explorar tus deseos
No hay nada que hablar
Voy a cagarme en tu ego
Voy a acabar con la oscuridad

Y me jode toda esta basura
Me molesta que busquen la cura
A una enfermedad que no existe
Quieren catalogar la locura

Y me jode toda esta basura
Me molesta que busquen la cura
A una enfermedad que no existe
Quieren catalogar la locura

Y me jode toda esta basura
Me molesta que busquen la cura
A una enfermedad que no existe
Quieren catalogar la locura

Quieren catalogar la locura
Quieren catalogar la locura
Quieren catalogar la locura
Para aparentar, para parecer como tú

Quise explotar tus deseos
Para encontrar la fórmula
Voy a cagarme en tu ego
Voy a acabar con la oscuri

Daaaaaad

Un entorno turbio, enfermo, surdo, taciturno, cero diurno
Va que absurdo, era un plasta con rastas que buscaba paz en Saturno

Un entorno turbio, enfermo, surdo, taciturno, cero diurno
Va que absurdo, era un plasta con rastas que buscaba paz en Saturno`
        },
        'octágono': {
            title: 'Octágono',
            youtubeId: 'mdYjkvVU4Qg', // Placeholder - reemplazar con el ID correcto
            lyrics: `Así entro al octágono malévolo
Así entro al octágono malévolo
Así entro al octágono malévolo
Así entro al octágono malévolo

Paro disparo
Desaparezco like mago
Soy un genio desterrado
Un gancho y listo te vas pal barro

Descontrolado ya he dominado
Las artes que tú ni has encontrado
Soy un soldado
Para la maldad sí que estoy armado
¡Vamos!

Yo estoy listo pa' la guerra
Yo estoy listo pa' ganar
Yo estoy listo pa' la guerra
Yo estoy listo pa' ganar

Yo me busco el pan no el trono
Yo no busco del rap ser icono
Para mí esto es un juego
Un tigre de lego que agarro delante y lo domo
Ellos se preguntan – ¿pero cómo?
Tú golpea primero con todo
Aquí no perdono yo no me escondo
Si conecto un gancho lo exploto

Así entro al octágono malévolo

Yo estoy listo pa' la guerra
Yo estoy listo pa' ganar
Yo estoy listo pa' la guerra
Yo estoy listo pa' ganar

Si tú quieres guerra dame el primer golpe
Si tú quieres guerra dame el primer golpe
Si tú quieres guerra dame el primer golpe
¡Si tú quieres guerra dame el primer golpe huh!

Yaaaaaaaaaaaaa

Así entro al octágono malévolo
Así entro al octágono malévolo
Así entro al octágono malévolo
Así entro al octágono malévolo

Malévolooooo
Malévolooooo
Malévolooooo
Malévolooooooooo`
        },
        'panaqa-real': {
            title: 'Panaqa Real',
            youtubeId: 'mdYjkvVU4Qg', // Placeholder - reemplazar con el ID correcto
            lyrics: `Estoy corriendo sobre campo minado
Llevando este mensaje crudo, me lo han encomendado
Somos los restos de un pueblo callado
Somos Panaqa, un tiroteo en un cuarto cerrado

Y tu opinión te la puedes guardar
No salgas a jugar si el partido ya está terminado
Puedo entender que te vaya a gustar
Pero tocamos por el justo gusto de ser criticados

Vengo desde un barrio, una calle, un desierto
De cualquier punto donde exista un micrófono abierto
Buscamos dejar un cerebro atento
Y un par de cuellos fracturados luego del concierto

El ego lo dejamos bien afuera
Aquí el sol quema y no importa tu bandera
El ritmo rompe las fronteras
Esto es Panaqa bro, la última cena

Con la música no se pagan los bills
Pero estamos dispuestos a morir
Fuimos desde el under, no wanna be
En los tiempos de antes, yo no te vi

Con la música no se pagan los bills
Pero estamos dispuestos a morir
Fuimos desde el under, no wanna be
En los tiempos de antes, yo no te vi

Escribo por puro placebo
Mi gente toca por miedo a que se apague el fucking minutero
Serpientes metiendo cabeza en avispero
Yo me hago cargo de lo que hago, no pongo pero

Recuerdo madrugadas con el cenicero
4, 5, seis de la mañana en el paradero
Un flow de varadero, hablando junto al panadero
Van a ver otra garganta sintiendo ese garraspeo

Hey you, creo que soy sincero, perro
Si nos juzgaste por lo que sentimos, estás en cero
Si nos juzgaste por lo que vestimos, estás en serio
Si nos juzgaste por lo que dijimos, allá nos vemos

Ellos quieren opinar de ti, de ti, de ti, de mí
¿Más que nos va a decir?
Si no juego a tu juego es porque me aburrí
Fuck that shit, ¿con qué moral vienes a exigir?

Con la música no se pagan los bills
Pero estamos dispuestos a morir
Fuimos desde el under, no wanna be
En los tiempos de antes, yo no te vi

Con la música no se pagan los bills
Pero estamos dispuestos a morir
Fuimos desde el under, no wanna be
En los tiempos de antes, yo no te vi

Con la música no se pagan los bills
Pero estamos dispuestos a morir
Fuimos desde el under, no wanna be
En los tiempos de antes, yo no te vi

Panaqaaaaa real

Por los años en blanco y bolsillos vacíos
Por los tiempos sombríos
Esos tragos, los fallos, encuentros y ritmos
Cuando no había más que líos
La necesidad de desfogue y desquite
El dolor que te reprime
Porque quiero y porque puedo, yo, así de simple
Si no te gusta, no dudes en irte

Con la música no se pagan los bills
Pero estamos dispuestos a morir
Fuimos desde el under, no wanna be
En los tiempos de antes, yo no te vi

Con la música no se pagan los bills
Pero estamos dispuestos a morir
Fuimos desde el under, no wanna be
En los tiempos de antes, yo no te vi

Con la música no se pagan los bills
Pero estamos dispuestos a morir
Fuimos desde el under, no wanna be
En los tiempos de antes, yo no te vi

Jamás te vi, cabrónnnnn
Jamás te vi, cabrónnnnn"Dímelo ahora hijo de la reeeeppp"

Madafoooooo`
        },
        'préndelo': {
            title: 'Préndelo',
            youtubeId: 'mdYjkvVU4Qg', // Placeholder - reemplazar con el ID correcto
            lyrics: `Prende el fuego y déjalo arder
Porque todos van a correr
Prende el fuego y déjalo arder
Porque todos van a correr
Prende el fuego y déjalo arder
Porque todos van a correr
Prende el fuego y déjalo arder
Porque todos van a correr

Si yo no dudo, modo astuto
Yo soy la kriptonita dentro del arpón de Lex Luthor
Se armó el furor
Pongo a bailar sin flauta hasta las ratas
La sonrisa los delata, sé que les encanta
Llegó la hora, ajustar cerebros
Los últimos no siempre serán los primeros
Dime quién te dijo eso
Haciendo polvo hasta los huesos
Y esos sesos

Prende el fuego y déjalo arder
Porque todos van a correr
Prende el fuego y déjalo arder
Porque todos van a correr
Prende el fuego y déjalo arder
Porque todos van a correr
Prende el fuego y déjalo arder
Porque todos van a correr

Ya estoy aquí, frente a tu cara fría, dispuesto a morir
Mis pies se acercan y son más grandes que tu asqueroso poder
La sonrisa se asoma con odio al verme luchar y entregarles mi piel
Crece más fuerte la corriente, la llama viene por ti

Prende el fuego y déjalo arder
Porque todos van a correr
Prende el fuego y déjalo arder
Porque todos van a correr
Prende el fuego y déjalo arder
Porque todos van a correr
Prende el fuego y déjalo arder
Porque todos van a correr

Despierto, todo está opaco y se ve tan lento
Mi cerebro interpreta que estoy muriendo y solo escucho lamentos
Intento moverme y no encuentro reflejo, no lo entiendo
Son las tres AM y el frío comienza a recorrer mi cuerpo

No sé si estoy vivo o estoy muerto
No sé qué hacer

(Prende el fuego)

Despierto, todo está opaco y se ve tan lento
Mi cerebro interpreta que estoy muriendo, no lo entiendo
Despierto, todo está opaco y se ve tan lento
Mi cerebro interpreta que estoy muriendo, no lo entiendo

Prende el fuego y déjalo arder
Porque todos van a correr
Prende el fuego y déjalo arder
Porque todos van a correr
Prende el fuego y déjalo arder
Porque todos van a correr
Prende el fuego y déjalo arder
Porque todos van a correr`
        },
        'águila': {
            title: 'Águila',
            youtubeId: 'mdYjkvVU4Qg', // Placeholder - reemplazar con el ID correcto
            lyrics: `Están detrás, como un grano en el culo
Cansado de problemas que vienen en momento inoportuno
Let's goo
Gritan desde el fuego, jodido infierno
Quieren sacarme de este edén, no sé por qué, si…

Yo estoy bien
Tengo mis vicios y virtudes, ¿como todo el mundo, no?
Yo estoy bien
Si tienes algo contra mí, grita, ven, que aquí estoy yo
Yo estoy bien
Tengo mis vicios y virtudes, ¿como todo el mundo, no?
Yo estoy bien
Si tienes algo contra mí, grita, ven, que aquí estoy
Yo, yo, yo, yo, grita, ven que aquí estoy yo
Yo, yo, yo, yo, grita, ven que aquí estoy yo

La vida ya me tiene cansado (what)
Camino y me siento observado (yeah)
Otro anuncio que yo no he buscado
Y concuerda con lo que he pensado

Y no me digan que estoy loco (fuck that)
Yo observé sus ojos detrás de las sombras
Veo mierda abajo de la alfombra
Debo hacer limpieza, voy por esa bomba

Yo estoy bien
Tengo mis vicios y virtudes, ¿como todo el mundo, no?
Yo estoy bien
Si tienes algo contra mí, grita, ven, que aquí estoy yo
Yo estoy bien
Tengo mis vicios y virtudes, ¿como todo el mundo, no?
Yo estoy bien
Si tienes algo contra mí, grita, ven, que aquí estoy
Yo, yo, yo, yo, grita, ven que aquí estoy yo
Yo, yo, yo, yo, grita, ven que aquí estoy yo

Te dicen:
Para, despierta es tarde, la plata, la carne
Detrás estoy yo, no te alarmes
Te vemos, te oímos, olemos tu hambre
Después no te quejes, es nuestra tu sangre

Estás huyendo en una rueda de hámster
Si te observamos desde el día que naciste
Qué lindo, la ropa que te pusiste
Combina bien con la película que viste

Yo estoy bien
Tengo mis vicios y virtudes, ¿como todo el mundo, no?
Yo estoy bien
Si tienes algo contra mí, grita, ven, que aquí estoy yo
Yo estoy bien
Tengo mis vicios y virtudes, ¿como todo el mundo, no?
Yo estoy bien
Si tienes algo contra mí, grita, ven, que aquí estoy
Yo, yo, yo, yo, grita, ven que aquí estoy yo
Yo, yo, yo, yo, grita, ven que aquí estoy yo

Aquí estoy..., aquí estoy...
Yooooooooooooooooooooooooo

Yo estoy bien
Tengo mis vicios y virtudes, ¿como todo el mundo, no?
Yo estoy bien
Si tienes algo contra mí, grita, ven, que aquí estoy
Yo, yo, yo, yo, grita, ven que aquí estoy yo
Yo, yo, yo, yo, grita, ven que aquí estoy yo`
        }
    };

    // Variables del reproductor
    let currentSong = null;
    let isPlaying = false;

    // Elementos del DOM con verificación robusta
    const songCards = document.querySelectorAll('.song-card');
    const lyricsModal = document.getElementById('lyrics-modal');
    const modalTitle = document.getElementById('modal-song-title');
    const modalContent = document.getElementById('modal-lyrics-content');
    const modalClose = document.querySelector('.modal-close');
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const playerContainer = document.getElementById('youtube-player-container');

    // Debug: verificar que todos los elementos existen
    console.log('🔍 Elementos encontrados:');
    console.log('- songCards:', songCards ? songCards.length : 'NO ENCONTRADO');
    console.log('- lyricsModal:', lyricsModal ? 'SÍ' : 'NO ENCONTRADO');
    console.log('- modalTitle:', modalTitle ? 'SÍ' : 'NO ENCONTRADO');
    console.log('- modalContent:', modalContent ? 'SÍ' : 'NO ENCONTRADO');
    console.log('- modalClose:', modalClose ? 'SÍ' : 'NO ENCONTRADO');
    console.log('- playBtn:', playBtn ? 'SÍ' : 'NO ENCONTRADO');
    console.log('- playIcon:', playIcon ? 'SÍ' : 'NO ENCONTRADO');
    console.log('- playerContainer:', playerContainer ? 'SÍ' : 'NO ENCONTRADO');

    // Si algún elemento crítico no existe, mostrar error y salir
    if (!lyricsModal || !modalTitle || !modalContent || !playBtn) {
        console.error('❌ Error crítico: Elementos del modal no encontrados');
        console.error('Esto puede indicar que el HTML no está cargado correctamente');
        return;
    }

    // Función para extraer el ID de YouTube de una URL o devolver el ID si ya está limpio
    function extractYouTubeId(url) {
        if (!url) return null;
        
        // Si ya es solo el ID (11 caracteres), devolverlo
        if (url.length === 11 && !url.includes('/')) {
            return url;
        }
        
        // Extraer ID de diferentes formatos de URL de YouTube
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : null;
    }

    // Función para crear el reproductor de YouTube
    function createYouTubePlayer(videoId) {
        // Extraer el ID limpio
        const cleanVideoId = extractYouTubeId(videoId);
        
        if (!cleanVideoId) {
            console.error('ID de YouTube inválido:', videoId);
            return;
        }

        if (typeof YT !== 'undefined' && YT.Player) {
            if (player) {
                player.destroy();
            }
            
            player = new YT.Player('youtube-player', {
                height: '200',
                width: '100%',
                videoId: cleanVideoId,
                playerVars: {
                    'autoplay': 0,
                    'controls': 0,
                    'disablekb': 1,
                    'rel': 0,
                    'showinfo': 0,
                    'modestbranding': 1
                },
                events: {
                    'onReady': function(event) {
                        isPlayerReady = true;
                        console.log('Player ready for:', cleanVideoId);
                    },
                    'onStateChange': function(event) {
                        updatePlayButton(event.data);
                    }
                }
            });
        } else {
            // Reintentar después de un tiempo si la API no está lista
            setTimeout(() => createYouTubePlayer(videoId), 500);
        }
    }

    // Función para actualizar el botón de play
    function updatePlayButton(state) {
        if (state === YT.PlayerState.PLAYING) {
            playIcon.className = 'fas fa-pause';
            playBtn.classList.add('playing');
            isPlaying = true;
        } else {
            playIcon.className = 'fas fa-play';
            playBtn.classList.remove('playing');
            isPlaying = false;
        }
    }

    // Función para actualizar la barra de progreso
    function updateProgressBar() {
        if (player && typeof player.getCurrentTime === 'function') {
            setInterval(() => {
                if (isPlaying) {
                    const currentTime = player.getCurrentTime();
                    const duration = player.getDuration();
                    const progressPercentage = (currentTime / duration) * 100;
                    
                    const progressFill = document.getElementById('progress-fill');
                    const timeDisplay = document.getElementById('time-display');
                    
                    if (progressFill) {
                        progressFill.style.width = progressPercentage + '%';
                    }
                    
                    if (timeDisplay) {
                        timeDisplay.textContent = formatTime(currentTime) + ' / ' + formatTime(duration);
                    }
                }
            }, 1000);
        }
    }

    // Función para formatear tiempo
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
    }

    // Función para crear o verificar el botón de play
    function ensurePlayButton() {
        let playButton = document.getElementById('play-btn');
        let playIconEl = document.getElementById('play-icon');
        
        if (!playButton) {
            console.log('🔧 Creando botón de play manualmente...');
            
            // Buscar la sección del título
            const titleSection = document.querySelector('.modal-title-section');
            if (titleSection) {
                // Crear el botón
                playButton = document.createElement('button');
                playButton.id = 'play-btn';
                playButton.className = 'play-button';
                playButton.style.cssText = `
                    background: linear-gradient(45deg, #dc2626, #ff6b6b) !important;
                    border: none !important;
                    border-radius: 50% !important;
                    width: 50px !important;
                    height: 50px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    cursor: pointer !important;
                    color: white !important;
                    font-size: 1.2rem !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                `;
                
                // Crear el icono
                playIconEl = document.createElement('i');
                playIconEl.id = 'play-icon';
                playIconEl.className = 'fas fa-play';
                
                playButton.appendChild(playIconEl);
                titleSection.appendChild(playButton);
                
                console.log('✅ Botón de play creado manualmente');
            }
        }
        
        return { button: playButton, icon: playIconEl };
    }

    // Función para abrir el modal con las letras
    function openLyricsModal(songKey) {
        console.log('🎼 Abriendo modal para:', songKey);
        
        const song = lyricsData[songKey];
        if (!song) {
            console.error('❌ No se encontró la canción:', songKey);
            return;
        }

        // Verificar que los elementos existen antes de usarlos
        if (!modalTitle || !modalContent || !lyricsModal) {
            console.error('❌ Elementos del modal no disponibles');
            return;
        }

        currentSong = songKey;
        modalTitle.textContent = song.title;
        modalContent.textContent = song.lyrics;
        
        // Mostrar el modal
        lyricsModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Asegurar que el botón de play existe y es visible
        const { button: playButton, icon: playIconEl } = ensurePlayButton();
        
        if (playButton) {
            // Forzar estilos del botón para asegurar visibilidad
            playButton.style.display = 'flex';
            playButton.style.visibility = 'visible';
            playButton.style.opacity = '1';
            
            // Resetear clases y iconos
            if (playIconEl) {
                playIconEl.className = 'fas fa-play';
            }
            playButton.classList.remove('playing');
            
            console.log('✅ Botón de play configurado y visible');
            
            // Agregar event listener si no existe
            if (!playButton.hasAttribute('data-listener-added')) {
                playButton.addEventListener('click', handlePlayButtonClick);
                playButton.setAttribute('data-listener-added', 'true');
                console.log('� Event listener agregado al botón de play');
            }
            
        } else {
            console.error('❌ No se pudo crear/encontrar el botón de play');
        }
        
        // Resetear estado del reproductor
        isPlaying = false;
        isPlayerReady = false;
        
        // Ocultar el contenedor del reproductor inicialmente
        if (playerContainer) {
            playerContainer.style.display = 'none';
            console.log('📺 Contenedor del reproductor oculto inicialmente');
        }
        
        console.log('🎯 Modal abierto exitosamente para:', songKey, 'con YouTube ID:', song.youtubeId);
    }

    // Función separada para manejar el clic del botón de play
    function handlePlayButtonClick() {
        console.log('🎵 Play button clicked! Current song:', currentSong);
        
        if (!currentSong) {
            console.error('❌ No hay canción seleccionada');
            return;
        }
        
        const song = lyricsData[currentSong];
        if (!song || !song.youtubeId) {
            console.error('❌ No se encontró el ID de YouTube para la canción:', currentSong);
            return;
        }
        
        // Si el reproductor no está creado, crearlo
        if (!player || !isPlayerReady) {
            console.log('🔄 Creando reproductor para:', song.youtubeId);
            createYouTubePlayer(song.youtubeId);
            
            // Esperar a que el reproductor esté listo y luego reproducir
            const checkReady = setInterval(() => {
                if (isPlayerReady && player) {
                    clearInterval(checkReady);
                    console.log('▶️ Iniciando reproducción');
                    player.playVideo();
                    if (playerContainer) {
                        playerContainer.style.display = 'block';
                    }
                }
            }, 100);
            
            return;
        }
        
        // Si el reproductor ya existe, controlar reproducción
        if (isPlaying) {
            console.log('⏸️ Pausando reproducción');
            player.pauseVideo();
            if (playerContainer) {
                playerContainer.style.display = 'none';
            }
        } else {
            console.log('▶️ Reanudando reproducción');
            player.playVideo();
            if (playerContainer) {
                playerContainer.style.display = 'block';
            }
        }
    }

    // Función para cerrar el modal
    function closeLyricsModal() {
        lyricsModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        playerContainer.style.display = 'none';
        
        // Parar y destruir el reproductor
        if (player && typeof player.stopVideo === 'function') {
            player.stopVideo();
        }
        
        isPlaying = false;
        playIcon.className = 'fas fa-play';
        playBtn.classList.remove('playing');
    }

    // Event listeners para las tarjetas de canciones
    songCards.forEach(card => {
        const songBtn = card.querySelector('.song-btn');
        const songKey = card.getAttribute('data-song');
        
        console.log('🎵 Configurando evento para canción:', songKey);
        
        songBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🔘 Botón de canción clickeado:', songKey);
            openLyricsModal(songKey);
        });
        
        card.addEventListener('click', () => {
            console.log('🔘 Tarjeta de canción clickeada:', songKey);
            openLyricsModal(songKey);
        });
    });

    // Event listener para el botón de play con verificaciones mejoradas
    if (playBtn) {
        console.log('✅ Configurando event listener para el botón de play');
        
        playBtn.addEventListener('click', () => {
            console.log('🎵 Play button clicked! Current song:', currentSong);
            
            if (!currentSong) {
                console.error('❌ No hay canción seleccionada');
                return;
            }
            
            const song = lyricsData[currentSong];
            if (!song || !song.youtubeId) {
                console.error('❌ No se encontró el ID de YouTube para la canción:', currentSong);
                return;
            }
            
            // Si el reproductor no está creado, crearlo
            if (!player || !isPlayerReady) {
                console.log('🔄 Creando reproductor para:', song.youtubeId);
                createYouTubePlayer(song.youtubeId);
                
                // Esperar a que el reproductor esté listo y luego reproducir
                const checkReady = setInterval(() => {
                    if (isPlayerReady && player) {
                        clearInterval(checkReady);
                        console.log('▶️ Iniciando reproducción');
                        player.playVideo();
                        if (playerContainer) {
                            playerContainer.style.display = 'block';
                        }
                    }
                }, 100);
                
                return;
            }
            
            // Si el reproductor ya existe, controlar reproducción
            if (isPlaying) {
                console.log('⏸️ Pausando reproducción');
                player.pauseVideo();
                if (playerContainer) {
                    playerContainer.style.display = 'none';
                }
            } else {
                console.log('▶️ Reanudando reproducción');
                player.playVideo();
                if (playerContainer) {
                    playerContainer.style.display = 'block';
                }
            }
        });
        
        // Verificar estilos del botón
        const styles = window.getComputedStyle(playBtn);
        console.log('🎨 Estilos del botón de play:');
        console.log('- display:', styles.display);
        console.log('- visibility:', styles.visibility);
        console.log('- opacity:', styles.opacity);
        
    } else {
        console.error('❌ No se pudo configurar el event listener - botón no encontrado');
    }

    // Event listeners para controles del reproductor
    const playerPlayPause = document.getElementById('player-play-pause');
    if (playerPlayPause) {
        playerPlayPause.addEventListener('click', () => {
            if (player) {
                if (isPlaying) {
                    player.pauseVideo();
                } else {
                    player.playVideo();
                }
            }
        });
    }

    // Event listener para cerrar el modal
    modalClose.addEventListener('click', closeLyricsModal);

    // Cerrar modal al hacer clic fuera del contenido
    lyricsModal.addEventListener('click', (e) => {
        if (e.target === lyricsModal) {
            closeLyricsModal();
        }
    });

    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lyricsModal.style.display === 'block') {
            closeLyricsModal();
        }
    });

    // Animaciones de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animaciones a las tarjetas
    songCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});
