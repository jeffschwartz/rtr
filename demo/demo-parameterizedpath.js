(function() {
    "use strict";
    Polymer("demo-parameterizedpath", {
        domReady: function() {
            this.infoEl = document.getElementById("demo-parameterizedpath-info");
        },
        get: function(year, month, day){
            this.infoEl.innerHTML = "demo-parameterizedpath \"get\" handler was called with parameters" +
            "<br>year = " + year + "<br>month = " + month + "<br>day = " + day;
            console.log("demo-parameterizedpath \"get\" called");
        }
    });
}());
