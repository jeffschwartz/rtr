(function() {
    "use strict";
    Polymer("demo-lazyparameterizedpath", {
        domReady: function() {
            this.infoEl = document.getElementById("demo-lazyparameterizedpath-info");
        },
        get: function(year, month, day){
            this.infoEl.innerHTML = "demo-lazyparameterizedpath \"get\" handler was called with parameters" +
                "<br>year = " + year + "<br>month = " + month + "<br>day = " + day;
            console.log("demo-lazyparameterizedpath \"get\" called");
        }
    });
}());
