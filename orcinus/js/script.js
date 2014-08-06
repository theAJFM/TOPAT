$(document).ready(function(){
	var canvas = document.getElementById("gameFrame");
    var ctx = canvas.getContext("2d");
    canvas.width = document.getElementById("desc").offsetWidth * 0.8;
    canvas.height = window.innerHeight * 0.4;
    canvas.style.width  = canvas.width.toString() + "px";
    canvas.style.height = canvas.height.toString() + "px";
    var bgReady = false;
    var bgImage = new Image();
    bgImage.src = "http://gamesloveres.com/wp-content/uploads/2014/04/minecraft-hd-grass-block-textureviewing-gallery-for-minecraft-grass-block-texture-pack-gamesloveres-jbihbn31.png";
    bgImage.onload = function () {
    	ctx.drawImage(bgImage, 0, 0, bgImage.width/1.5, bgImage.height/1.5);
    };
});