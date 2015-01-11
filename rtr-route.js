/*
Copyright 2015 Jeffrey Schwartz. All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
*/
(function() {
    "use strict";
    Polymer("rtr-route", {
        /**
        * The `domReady` method is a lifecycle callback.
        *
        * @method domReady
        */
        domReady: function () {
            this.rtrRouter = this.parentElement;
            //rtr-history is the only element in the shadow-root
            this.rtrHistory = this.parentElement.shadowRoot.children[0];
        },
        method: "get", // A sensible daefault
        path: ""
    });
}());
