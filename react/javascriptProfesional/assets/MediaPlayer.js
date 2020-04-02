// Clase MediaPlayer
// Recibe como parametro un objeto dentro del cual se encuentra el control del video seleccionado mediante el querySelector.
function MediaPlayer(config) {
    // El objeto tiene una propiedad que almacenara el contenido del parametro
    // this guarda un valor en la instancia
    this.media = config.el;
}

// Metodos de MediaPlayer
MediaPlayer.prototype.togglePlay = function() {
    (this.media.paused) ? this.play() : this.pause();
};      

// Metodo de reproduccion
MediaPlayer.prototype.play = function() {        
    this.media.play();
};

// Metodo de pausa
MediaPlayer.prototype.pause = function() {
    this.media.pause();
};

export default MediaPlayer;