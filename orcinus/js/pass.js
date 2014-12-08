$(document).ready(function(){

    var hitarea = document.getElementById("wrapper");
    var gestureControl = Hammer(hitarea);
    gestureControl.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    gestureControl.get('pinch').set({ enable: true });
    gestureControl.get('rotate').set({ enable: true });
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
    gestureControl.on("pinchend", function(event) {
        text+= "expand";
        $("#test").val("" + text);
    });
    gestureControl.on("rotateend", function(event) {
        text+= "refresh";
        $("#test").val("" + text);
    });

});