(function() {
    "use strict";
    Polymer("demo-staticpath", {
        domReady: function() {
            this.infoEl = document.getElementById("demo-staticpath-info");
        },
        get: function(){
            this.infoEl.textContent =  "demo-staticpath \"get\" handler was called";
            console.log("demo-staticpath get called");
        },
        post: function(){
            this.infoEl.textContent =  "demo-staticpath \"post\" handler was called";
            console.log("demo-staticpath post called");
        },
        put: function () {
            this.infoEl.textContent =  "demo-staticpath \"put\" handler was called";
            console.log("demo-staticpath put called");
        },
        del: function () {
            this.infoEl.textContent =  "demo-staticpath \"delete\" handler was called";
            console.log("demo-staticpath delete called");
        }
    });
}());
