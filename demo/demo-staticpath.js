(function() {
    "use strict";
    Polymer("demo-staticpath", {
        domReady: function() {
            this.infoEl = document.getElementById("demo-staticpath-info");
        },
        get: function(){
            this.infoEl.textContent =  "demo-staticpath \"get\" handler was called";
            console.log("demo-staticpath \"get\" called");
        }
    });
}());
