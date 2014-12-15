(function(w){
    "use strict";
    var initCalled = false;
    Polymer("router-element", {
        ready: function(){
            document.addEventListener("location-changed", this.locationChangedHandler);
        },
        init: function(callback){
            callback();
            initCalled = true;
        },
        locationChangedHandler: function(evt) {
            console.log("router caught location-changed event", evt.detail);
        }
    });
}(window));
