//Worst lines of code I've ever written in my whole life. Sorry........
$(document).ready(function(){
	var canvas = document.getElementById("gameFrame");
    var ctx = canvas.getContext("2d");
    var x = 0;
    var y = 0;
    var iterator = 0;
    var commandStack = [];
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
    refillGrid = function(context){
        drawGrid(context);
        var tempX = 0;
        var tempY = 0;
        drawBox(0, 0);
        for(var i=0;i<commandStack.length;i++){
            if(commandStack[i] == "left"){
                ctx.drawImage(leftDir, tempX-- * canvas.width / 8, tempY * canvas.height / 8, canvas.width / 8, canvas.height / 8);
            }
            else if(commandStack[i] == "right"){
                ctx.drawImage(rightDir, tempX++ * canvas.width / 8, tempY * canvas.height / 8, canvas.width / 8, canvas.height / 8);
            }
            else if(commandStack[i] == "up"){
                ctx.drawImage(upDir, tempX * canvas.width / 8, tempY-- * canvas.height / 8, canvas.width / 8, canvas.height / 8);
            }
            else{
                ctx.drawImage(downDir, tempX * canvas.width / 8, tempY++ * canvas.height / 8, canvas.width / 8, canvas.height / 8);
            }
            drawBox(tempX, tempY);
        }
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

    var drawBox = function(parX, parY){
        ctx.globalAlpha=0.6;
        ctx.fillStyle = "#ffb403";
        ctx.fillRect(parX * canvas.width / 8, parY * canvas.height / 8, canvas.width / 8, canvas.height / 8);
        ctx.globalAlpha=1.0;
        console.log("Box: " + parX + ", " + parY);
    }

    drawBox(x, y);
    gestureControl.on("swipeleft", function(event) {
        ctx.drawImage(leftDir, x * canvas.width / 8, y * canvas.height / 8, canvas.width / 8, canvas.height / 8);
        x--;
        drawBox(x, y);
        commandStack[iterator++] = "left";
        $('.icon-list').append("<span class=\"ind" + iterator +"\">Left\t["+ x + "," + y +"]</span>");
    });
    gestureControl.on("swiperight", function(event) {
        ctx.drawImage(rightDir, x * canvas.width / 8, y * canvas.height / 8, canvas.width / 8, canvas.height / 8);
        x++;
        drawBox(x, y);
        commandStack[iterator++] = "right";
        $('.icon-list').append("<span class=\"ind" + iterator +"\">Right\t["+ x + "," + y +"]</span>");
    });
    gestureControl.on("swipeup", function(event) {
        ctx.drawImage(upDir, x * canvas.width / 8, y * canvas.height / 8, canvas.width / 8, canvas.height / 8);
        y--;
        drawBox(x, y);
        commandStack[iterator++] = "up";
        $('.icon-list').append("<span class=\"ind" + iterator +"\">Up\t["+ x + "," + y +"]</span>");
    });
    gestureControl.on("swipedown", function(event) {
        ctx.drawImage(downDir, x * canvas.width / 8, y * canvas.height / 8, canvas.width / 8, canvas.height / 8);
        y++;
        drawBox(x, y);
        commandStack[iterator++] = "down";
        $('.icon-list').append("<span class=\"ind" + iterator +"\">Down\t["+ x + "," + y +"]</span>");
    });


    $('#pop').on("click", function(){
        if(iterator > 0){
            $( ".ind" + iterator--).remove();
            var lastVal = commandStack.pop();
            console.log(lastVal);
            if(lastVal == "left"){
                x++;
            }
            else if(lastVal == "right"){
                x--;
            }
            else if(lastVal == "up"){
                y++;
            }
            else if(lastVal == "down"){
                y--;
            }
            console.log(commandStack);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            refillGrid(ctx);
        }
    });
});