(function() {
    "use strict";
    Polymer("demo-redirecttarget", {
        domReady: function() {
            this.infoEl = document.getElementById("demo-redirect-info");
        },
        get: function(){
            this.infoEl.innerHTML = this.infoEl.textContent +
                " and demo-redirecttarget get called";
            console.log("demo-redirecttarget get called");
        }
    });
}());
