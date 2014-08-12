$(document).ready(function(){
	var canvas = document.getElementById("gameFrame");
    var ctx = canvas.getContext("2d");
    canvas.width = document.getElementById("desc").offsetWidth * 0.9 - ((document.getElementById("desc").offsetWidth * 0.9)%20);
    canvas.height = window.innerHeight * 0.4 - ((window.innerHeight * 0.4)%10);
    canvas.style.width  = canvas.width.toString() + "px";
    canvas.style.height = canvas.height.toString() + "px";
    var bgImage = new Image();
    var stImage = new Image();
    var boarImage = new Image();
    bgImage.src = "http://gamesloveres.com/wp-content/uploads/2014/04/minecraft-hd-grass-block-textureviewing-gallery-for-minecraft-grass-block-texture-pack-gamesloveres-jbihbn31.png";
    stImage.src = "img/Rock.png";
    boarImage.src = "img/boar.png"
    window.onload = function() {
    	console.log("background");
    	ctx.drawImage(bgImage, 0, 0, bgImage.width/1.5, bgImage.height/1.5);
	    for (var x = 0.5; x < canvas.width; x += canvas.width / 20) {
		  ctx.moveTo(x, 0);
		  ctx.lineTo(x, canvas.height);
		}

		for (var y = 0.5; y < canvas.height; y += canvas.height / 10) {
		  ctx.moveTo(0, y);
		  ctx.lineTo(canvas.width, y);
		}

		ctx.strokeStyle = "#fff";
		ctx.stroke();
		ctx.drawImage(stImage, 8 * canvas.width / 20, 4 * canvas.height / 10, canvas.width / 20, canvas.height / 10);
	    ctx.drawImage(stImage, 12 * canvas.width / 20, 2 * canvas.height / 10, canvas.width / 20, canvas.height / 10);
	    ctx.drawImage(boarImage, 0 * canvas.width / 20, 0 * canvas.height / 10, canvas.width / 20, canvas.height / 10);
    };
});