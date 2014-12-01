$(document).ready(function(){
	
	var hitarea = document.getElementById("wrapper");
    var gestureControl = Hammer(hitarea);
    gestureControl.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    gestureControl.on("swipeleft", function(event) {
        $('.icon-list').append("<span>Left</span>");
    });
    gestureControl.on("swiperight", function(event) {
        $('.icon-list').append("<span>Right</span>");
    });
    gestureControl.on("swipeup", function(event) {
        $('.icon-list').append("<span>Up</span>");
    });
    gestureControl.on("swipedown", function(event) {
        $('.icon-list').append("<span>Down</span>");
    });


	var canvas = document.getElementById("gameFrame");
    var ctx = canvas.getContext("2d");
    canvas.width = document.getElementById("desc").offsetWidth * 0.5 - ((document.getElementById("desc").offsetWidth * 0.5)%8);
    canvas.height = window.innerHeight * 0.4 - ((window.innerHeight * 0.4)%8);
    canvas.style.width  = canvas.width.toString() + "px";
    canvas.style.height = canvas.height.toString() + "px";
    
    var character = {
    	x: 0,
    	y: 0
    }
    
    var bgImage = new Image();
    var stImage = new Image();
    var finImage = new Image();
    var charImage = new Image();
    var splatImage = new Image();
    var targetX = 0;
    var targetY = 0;
    var count = 0;
    var varName;
    
    finImage.src = "http://www.clker.com/cliparts/u/J/w/w/T/H/checkered-flag.svg"
    stImage.src = "img/Rock.png";
    splatImage.src = "img/blood.png"
    
    window.onload = function() {
    	console.log("background");
    	$('#desc canvas').css('background-size', canvas.style.width + " " + canvas.style.height);
    	drawGrid(ctx);
		ctx.drawImage(stImage, 8 * canvas.width / 8, 4 * canvas.height / 8, canvas.width / 8, canvas.height / 8);
	    ctx.drawImage(stImage, 12 * canvas.width / 8, 2 * canvas.height / 8, canvas.width / 8, canvas.height / 8);
	    ctx.drawImage(finImage, 19 * canvas.width / 8, 9 * canvas.height / 8, canvas.width / 8, canvas.height / 8);
    };
    drawGrid = function(context){
    	console.log("drawgrid");
    	context.beginPath(); 
	    for (var x = 0.5; x < canvas.width; x += canvas.width / 8) {
		  	context.moveTo(x, 0);
		  	context.lineTo(x, canvas.height);
		}

		for (var y = 0.5; y < canvas.height; y += canvas.height / 8) {
		  context.moveTo(0, y);
		  context.lineTo(canvas.width, y);
		}
		context.strokeStyle = "#fff";
		context.stroke();
		context.closePath();
    }
    $("#showlist").click(function(){
        $(".menu-wrap").animate({
            left: "+=300",
        }, 400);
    });

    $("#closelist").click(function(){
        $(".menu-wrap").animate({
            left: "-=300",
        }, 400);
    });

});