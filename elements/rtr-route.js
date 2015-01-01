(function() {
    "use strict";
    Polymer("rtr-route", {
        ready: function () {
            this.rtrRouter = this.parentElement;
            //rtr-history is the only element in the shadow-root
            this.rtrHistory = this.parentElement.shadowRoot.children[0];
        },
        method: "get", // A sensible daefault
        path: ""
    });
}());
