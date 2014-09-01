$(document).ready(function(){
	var canvas = document.getElementById("gameFrame");
    var ctx = canvas.getContext("2d");
    canvas.width = document.getElementById("desc").offsetWidth * 0.9 - ((document.getElementById("desc").offsetWidth * 0.9)%20);
    canvas.height = window.innerHeight * 0.4 - ((window.innerHeight * 0.4)%10);
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
		ctx.drawImage(stImage, 8 * canvas.width / 20, 4 * canvas.height / 10, canvas.width / 20, canvas.height / 10);
	    ctx.drawImage(stImage, 12 * canvas.width / 20, 2 * canvas.height / 10, canvas.width / 20, canvas.height / 10);
	    ctx.drawImage(finImage, 19 * canvas.width / 20, 9 * canvas.height / 10, canvas.width / 20, canvas.height / 10);
    };
    drawGrid = function(context){
    	console.log("drawgrid");
    	context.beginPath(); 
	    for (var x = 0.5; x < canvas.width; x += canvas.width / 20) {
		  	context.moveTo(x, 0);
		  	context.lineTo(x, canvas.height);
		}

		for (var y = 0.5; y < canvas.height; y += canvas.height / 10) {
		  context.moveTo(0, y);
		  context.lineTo(canvas.width, y);
		}
		context.strokeStyle = "#fff";
		context.stroke();
		context.closePath();
    }
	$('body').on('keydown', '.command', function (event) {
		console.log("Called");
	    if (event.which == 13) {
	    	event.preventDefault();
	    	var name = document.getElementsByName("command")[0].value;
	    	$('#arrow').replaceWith("<div id = \"arrow\"> >></div>");
	    	$('.terminal').append("<span>" + name + "</span><br/>");
	    	if(count == 0){
	    		$('.terminal').append("<div class = \"terminal-text\">Hello, " + name + ". In this game, we want to move our character from the starting point to finish line. We start with creating the character first. Type <b>var = object.new()</b> in the terminal. Put the URL of the sprite that you want to use inside the bracket, surrounded by \"\".</div>");
	    		$('#player').append(name);
	    		count++;
	    	}
	    	else if(count == 1){
	    		var com = document.getElementsByName("command")[0].value;
	    		var regex = /(\w+)(\s*)=(\s*)object.new\(\"(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?\"\)/;
	    		if(com.match(regex)){
	    			console.log(regex)
	    			var str = regex.exec(com);
	    			$('.terminal').append("<div class = \"terminal-text\">Object named " + str[1] + " created. Image is taken from " + str[5] + "." + str[6] + "<br/>Now let's make the object move. Type (name of variable).move(x,y) and see the object teleport. Move the object to the finish line, and avoid the stones.</div>");
	    			charImage.src = str[4] + str[5] + "." + str[6] + str[7]
	    			charImage.onload = function(){
	    				ctx.drawImage(charImage, targetX * canvas.width / 20, targetY * canvas.height / 10, canvas.width / 20, canvas.height / 10);
	    			}
	    			varName = str[1];
	    			count++;
	    		}
	    		else{
	    			$('.terminal').append("<div class = \"error-text\">Syntax Error. Did you create an actual object?</div>");
	    		}
	    	}
	    	else if(count == 2){
	    		var com = document.getElementsByName("command")[0].value;
	    		var regex = new RegExp(varName + "(\\s*)\.(\\s*)move(\\s*)\\((\\s*)(-|)(\\d+)(\\s*)\,(\\s*)(-|)(\\d+)(\\s*)\\)");
	    		console.log(regex);
	    		console.log(com);
	    		if(com.match(regex)){
	    			var str = regex.exec(com);
	    			//window.onload = function(){
	    				console.log("canvas")
			    		ctx.save();
			    		ctx.clearRect(character.x * canvas.width/20 , character.y * canvas.height/10,canvas.width / 20,canvas.height/10);
			    		targetX = str[5] + str[6];
	    				targetY = str[9] + str[10];
	    				character.x += parseInt(targetX);
	    				character.y += parseInt(targetY);
	    				if((character.x == 12 && character.y == 2) || (character.x == 8 && character.y == 4)){
	    					ctx.clearRect(character.x * canvas.width/20 , character.y * canvas.height/10,canvas.width / 20,canvas.height/10);
	    					ctx.drawImage(splatImage, character.x * canvas.width / 20, character.y * canvas.height / 10, canvas.width / 16, canvas.height / 6);
	    					ctx.drawImage(stImage, character.x * canvas.width / 20, character.y * canvas.height / 10, canvas.width / 20, canvas.height / 10);
	    					drawGrid(ctx);
	    					alert("You got squished by a rock. Game over!");
	    					count++;
	    					$('.terminal').append("<div class = \"error-text\">GAME OVER.</div>");
	    				}
	    				else if(character.x == 19 && character.y == 9){
	    					ctx.clearRect(character.x * canvas.width/20 , character.y * canvas.height/10,canvas.width / 20,canvas.height/10);
	    					ctx.drawImage(charImage, character.x * canvas.width / 20, character.y * canvas.height / 10, canvas.width / 20, canvas.height / 10);
	    					drawGrid(ctx);
	    					alert("You've reached the destination. You won!!");
	    					count++;
	    				}
	    				else{
			    			ctx.drawImage(charImage, character.x * canvas.width / 20, character.y * canvas.height / 10, canvas.width / 20, canvas.height / 10);
			    			drawGrid(ctx);
			    		}
			    		ctx.restore();
	    			//}	
	    				$('#position').html("Position: (" + character.x + ", " + character.y + ")");
	    		}
	    		else{
	    			$('.terminal').append("<div class = \"error-text\">Syntax Error. Did you create an actual object?</div>");
	    		}
	    	}
	    	else{
	    		$('.terminal').append("<div class = \"error-text\">GAME OVER. To restart playing, please reload the page.</div>");
	    	}
	    	$('.command').remove();
	        $('.terminal').append("<div id = \"arrow\"> >>&nbsp;</div><input class = \"command\" type = \"text\" name = \"command\" autofocus=\"autofocus\"/>");
	    }
	});
});