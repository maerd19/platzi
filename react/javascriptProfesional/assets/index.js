import MediaPlayer from './MediaPlayer.js';

// querySelector toma un elemento para poder manipularlo
const video = document.querySelector('video');
// Mediante el player exponemos los metodos de la clase
const player = new MediaPlayer({ el: video });

// Boton que tendra funcionalidad
const button = document.querySelector('button');
button.onclick = () => player.togglePlay();