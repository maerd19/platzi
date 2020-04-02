import MediaPlayer from './MediaPlayer.js';
import AutoPlay from './plugins/AutoPlay.js';
// querySelector toma un elemento para poder manipularlo
const video = document.querySelector('video');
// Mediante el player exponemos los metodos de la clase
const player = new MediaPlayer({ el: video, plugins: [ 
    // new AutoPlay() 
] });

// Boton de reproduccion/pausa
const button = document.querySelector('button');
button.onclick = () => player.togglePlay();

// Boton de mute/unmute
const mute = document.getElementById('mute');
mute.onclick = () => player.toggleMute();