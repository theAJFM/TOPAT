$(document).ready(function(){
	var canvas = document.getElementById("gameFrame");
    var ctx = canvas.getContext("2d");
    var x = 0;
    var y = 0;
    canvas.width = document.getElementById("desc").offsetWidth * 0.5 - ((document.getElementById("desc").offsetWidth * 0.5)%8);
    canvas.height = window.innerHeight * 0.4 - ((window.innerHeight * 0.4)%8);
    canvas.style.width  = canvas.width.toString() + "px";
    canvas.style.height = canvas.height.toString() + "px";
    
    
    var bgImage = new Image();
    var upDir = new Image();
    var downDir = new Image();
    var leftDir = new Image();
    var rightDir = new Image();
    upDir.src = "img/up.png";
    downDir.src = "img/down.png";
    leftDir.src = "img/left.png";
    rightDir.src = "img/right.png";

    window.onload = function() {
    	console.log("background");
    	$('#desc canvas').css('background-size', canvas.style.width + " " + canvas.style.height);
    	drawGrid(ctx);
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

    ctx.font = "1.5em Icomatic";

    var hitarea = document.getElementById("wrapper");
    var gestureControl = Hammer(hitarea);
    gestureControl.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    gestureControl.on("swipeleft", function(event) {
        ctx.drawImage(leftDir, x * canvas.width / 8, y * canvas.height / 8, canvas.width / 8, canvas.height / 8);
        x--;
        $('.icon-list').append("<span>Left\t["+ x + "," + y +"]</span>");
    });
    gestureControl.on("swiperight", function(event) {
        ctx.drawImage(rightDir, x * canvas.width / 8, y * canvas.height / 8, canvas.width / 8, canvas.height / 8);
        x++;
        $('.icon-list').append("<span>Right\t["+ x + "," + y +"]</span>");
    });
    gestureControl.on("swipeup", function(event) {
        ctx.drawImage(upDir, x * canvas.width / 8, y * canvas.height / 8, canvas.width / 8, canvas.height / 8);
        y--;
        $('.icon-list').append("<span>Up\t["+ x + "," + y +"]</span>");
    });
    gestureControl.on("swipedown", function(event) {
        ctx.drawImage(downDir, x * canvas.width / 8, y * canvas.height / 8, canvas.width / 8, canvas.height / 8);
        y++;
        $('.icon-list').append("<span>Down\t["+ x + "," + y +"]</span>");
    });
});