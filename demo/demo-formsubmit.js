(function() {
    "use strict";
    Polymer("demo-formsubmit", {
        domReady: function() {
            this.infoEl = document.getElementById("demo-formsubmit-info");
        },
        post: function(valuesHash){
            this.infoEl.innerHTML = "demo-formsubmit \"post\" handler was called with a form's valuesHash" +
            "<br>name = " + valuesHash.txtName + "<br>occupation = " + valuesHash.selOccupation.toString();
            console.log("demo-formsubmit \"post\" called");
        }
    });
}());
