(function() {
    "use strict";
    Polymer("demo-lazyformsubmit", {
        domReady: function() {
            this.infoEl = document.getElementById("demo-lazyformsubmit-info");
        },
        post: function(valuesHash){
            this.infoEl.innerHTML = "demo-lazyformsubmit \"post\" handler was called with a form's valuesHash" +
            "<br>name = " + valuesHash.txtName2 + "<br>occupation = " + valuesHash.selOccupation2.toString();
            console.log("demo-lazyformsubmit get called");
        }
    });
}());
