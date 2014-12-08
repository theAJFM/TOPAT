$(document).ready(function(){

    var hitarea = document.getElementById("wrapper");
    var gestureControl = Hammer(hitarea);
    gestureControl.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    var text = "";
    gestureControl.on("swipeleft", function(event) {
        text+= "arrowleft";
        $("#test").val("" + text);
    });
    gestureControl.on("swiperight", function(event) {
        text+= "arrowright";
        $("#test").val("" + text);
    });
    gestureControl.on("swipeup", function(event) {
        text+= "arrowup";
        $("#test").val("" + text);
    });
    gestureControl.on("swipedown", function(event) {
        text+= "arrowdown";
        $("#test").val("" + text);
    });
    gestureControl.on("tap", function(event) {
        text+= "circleoutline";
        $("#test").val("" + text);
    });
    gestureControl.on("rotate", function(event) {
        text+= "refresh";
        $("#test").val("" + text);
    });

});