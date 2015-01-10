(function() {
    Polymer("demo-redirect", {
        //NOTE: You cannot use strict mode if calling this.super
        domReady: function() {
            this.super();
            this.infoEl = document.getElementById("demo-redirect-info");
        },
        get: function(){
            "use strict";
            this.infoEl.textContent =  "demo-redirect \"get\" handler was called " +
                "and is redirecting to /rtr/demo-redirecttarget";
            console.log("demo-redirect \"get\" called");
            this.rtrHistory.navigate({
                state: {
                    verb: "get",
                    path: "/rtr/demo-redirecttarget"
                },
                method: "get",
                url: "/rtr/demo-redirecttarget",
                pushState: true,
                trigger: true
            });
        }
    });
}());
