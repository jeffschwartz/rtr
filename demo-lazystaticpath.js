(function() {
    "use strict";
    Polymer("demo-lazystaticpath", {
        domReady: function() {
            this.infoEl = document.getElementById("demo-lazystaticpath-info");
        },
        get: function(year, month, day){
            this.infoEl.innerHTML = "demo-lazystaticpath \"get\" handler was called with parameters" +
            "<br>year = " + year + "<br>month = " + month + "<br>day = " + day;
            console.log("demo-lazystaticpath \"get\" called");
        }
    });
}());
