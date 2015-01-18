/*
Copyright 2015 Jeffrey Schwartz. All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
*/
(function() {
    "use strict";
    /**
    * @element rtr-route An element that reperesents a route.
    * @status alpha
    * @homepage https://github.com/jeffschwartz/rtr
    */
    Polymer("rtr-route", {
        /**
         * @method domReady A lifecycle callback. Adds rtrRouter and rtrHistory properties to itself.
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
