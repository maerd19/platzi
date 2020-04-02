// Clase MediaPlayer
// Recibe como parametro un objeto dentro del cual se encuentra el control del video seleccionado mediante el querySelector.
function MediaPlayer(config) {
    // El objeto tiene una propiedad que almacenara el contenido del parametro
    // this guarda un valor en la instancia
    this.media = config.el;
    this.plugins = config.plugins || [];

    this._initPlugins();
}

// Metodos de MediaPlayer
MediaPlayer.prototype._initPlugins = function() {
    this.plugins.forEach(plugin => {
        plugin.run(this)
    })
}

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

MediaPlayer.prototype.toggleMute = function() {
    (this.media.muted) ? this.unmute() : this.mute();
}

// Metodo de mute
MediaPlayer.prototype.mute = function() {
    this.media.muted = true;
}

// Metodo de unmute
MediaPlayer.prototype.unmute = function() {
    this.media.muted = false;
}

export default MediaPlayer;