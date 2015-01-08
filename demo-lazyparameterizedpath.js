(function() {
    "use strict";
    Polymer("demo-lazyparameterizedpath", {
        domReady: function() {
            this.infoEl = document.getElementById("demo-lazyparameterizedpath-info");
        },
        get: function(year, month, day){
            this.infoEl.innerHTML = "demo-lazyparameterizedpath \"get\" handler was called with parameters" +
                "<br>year = " + year + "<br>month = " + month + "<br>day = " + day;
            console.log("demo-lazyparameterizedpath get called");
        },
        post: function(year, month, day){
            this.infoEl.innerHTML = "demo-lazyparameterizedpath \"post\" handler was called with parameters" +
                "<br>year = " + year + "<br>month = " + month + "<br>day = " + day;
            console.log("demo-lazyparameterizedpath post called");
        },
        put: function (year, month, day) {
            this.infoEl.innerHTML = "demo-lazyparameterizedpath \"put\" handler was called with parameters" +
                "<bryear = " + year + "<br>month = " + month + "<br>day = " + day;
            console.log("demo-lazyparameterizedpath put called");
        },
        del: function (year, month, day) {
            this.infoEl.innerHTML = "demo-lazyparameterizedpath \"delete\" handler was called with parameters" +
                "<br>year = " + year + "<br>month = " + month + "<br>day = " + day;
            console.log("demo-lazyparameterizedpath delete called");
        }
    });
}());
