/**
 * lazyroute-element acts as a delegate for routing requests. On receiving the 1st request
 * for any lazy loaded route it will dynamically import and create the appropriate route-element as
 * defined by its attributes. It then calls the route handler (also defined in its attributes)
 * associated with the request.
 */
(function() {
    "use strict";
    Polymer("rtr-lazyroute", {
        ready: function() {
            this.rtrRouter = this.parentElement;
            //rtr-history is the only element in the shadow-root
            this.rtrHistory = this.parentElement.shadowRoot.children[0];
            this.targetEl = null;
        },
        routeHandler: function() {
            var self = this,
                args = arguments;
            if (!this.targetEl) {
                //Dynamically import, construct and insert the element into the DOM
                //and then call its handler
                Polymer.import([this.importPath], function() {
                    var routerEl = document.querySelector("rtr-router");
                    self.targetEl = document.createElement(self.tagname);
                    self.targetEl.setAttribute("method", self.method);
                    self.targetEl.setAttribute("path", self.path);
                    self.targetEl.setAttribute("handler", self.handler);
                    routerEl.appendChild(self.targetEl);
                    self.callTarget(args);
                });
            } else {
                //Call the target's handler
                this.callTarget(arguments);
            }
        },
        //Calls the target element's handler passing it arguments
        callTarget: function (args) {
            this.targetEl[this.handler].apply(this.targetEl, args);
        }
    });
}());
