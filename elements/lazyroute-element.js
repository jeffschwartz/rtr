(function() {
	"use strict";
	Polymer("lazyroute-element", {
		handler: "routeHandler",
        ready: function () {
            this.isImported = false;
    		this.importPath = "";
    		this.name = "";
    		this.method = "";
    		this.path = "";
        },
		//Dynamically import element, flag it as loaded and call the handler
		routeHandler: function() {
			var self = this;
			//Dynamically mport the element and flag it imported
			if (!this.isImported) {
				Polymer.import([this.importPath], function() {
					var routerEl = document.querySelector("router-element"),
						customEl = document.createElement(self.name);
					self.isImported = true;
					customEl.setAttribute("method", "{{method}}");
					customEl.setAttribute("path", "{{path}}");
					customEl.setAttribute("handler", "{{handler}}");
					routerEl.appendChild(customEl);
                    // Polymer.register(customEl);
				});
			}
			//Call the element's handler
		}
	});
}());
