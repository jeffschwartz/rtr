(function(w) {
    "use strict";
    var historyStarted = false;
    /**
     * Creates a hash with properties 'name' and "value"
     */
    function nameValueHash(name, value) {
            var obj = {};
            obj.name = name;
            obj.value = value;
            return obj;
        }
        /**
         * Modified from OS/MIT code found at https://code.google.com/p/form-serialize/
         * Serialize a form
         */
    function serialize(form) {
            var a, i, j, q = [];
            if (!form || form.nodeName !== "FORM") {
                return;
            }
            for (i = form.elements.length - 1; i >= 0; i = i - 1) {
                if (form.elements[i].name === "") {
                    continue;
                }
                switch (form.elements[i].nodeName) {
                    case "INPUT":
                        switch (form.elements[i].type) {
                            case "text":
                            case "hidden":
                            case "password":
                            case "button":
                            case "reset":
                            case "submit":
                                q.push(nameValueHash(form.elements[i].name, form.elements[
                                    i].value));
                                break;
                            case "checkbox":
                            case "radio":
                                if (form.elements[i].checked) {
                                    q.push(nameValueHash(form.elements[i].name, form.elements[
                                        i].value));
                                }
                                break;
                            case "file":
                                break;
                        }
                        break;
                    case "TEXTAREA":
                        q.push(nameValueHash(form.elements[i].name, form.elements[i].value));
                        break;
                    case "SELECT":
                        switch (form.elements[i].type) {
                            case "select-one":
                                q.push(nameValueHash(form.elements[i].name, form.elements[
                                    i].value));
                                break;
                            case "select-multiple":
                                a = [];
                                for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                                    if (form.elements[i].options[j].selected) {
                                        a.push(form.elements[i].options[j].value);
                                    }
                                }
                                if (a.length) {
                                    q.push(nameValueHash(form.elements[i].name, a));
                                }
                                break;
                        }
                        break;
                    case "BUTTON":
                        switch (form.elements[i].type) {
                            case "reset":
                            case "submit":
                            case "button":
                                q.push(nameValueHash(form.elements[i].name, form.elements[
                                    i].value));
                                break;
                        }
                        break;
                }
            }
            return q;
        }
        /**
         * Creates a hash from an array whose elements are hashes whose properties are "name" and "value".
         */
    function valuesHashFromSerializedArray(valuesArray) {
        var valuesHash = {};
        for (var i = 0, len = valuesArray.length; i < len; i++) {
            valuesHash[valuesArray[i].name] = valuesArray[i].value;
        }
        return valuesHash;
    }
    Polymer("history-element", {
        ready: function() {
            //Verify browser supports pushstate
            console.log(history.pushState ?
                "history pushState is supported in your browser" :
                "history pushstate is not supported in your browser");

            // Setup an anchor tag "click" event hanler
            document.addEventListener("click", this.anchorClickHandler.bind(this));
            // Setup a form tag "submit" event handler
            document.addEventListener("submit", this.formSubmitHandler.bind(this));
            // Setup a popstate event handler
            w.addEventListener("popstate", this.popstateHandler.bind(this));
        },
        /**
         * Anchor tag "click" event hanler
         */
        anchorClickHandler: function(evt) {
            var method = "get" /* Allways a "get" */ ,
                href;
            if (historyStarted && evt.target.tagName.toUpperCase() === "A") {
                href = evt.target.attributes.href.value;
                console.log("attribute href", href);
                if (href.indexOf("/") === 0) {
                    evt.preventDefault();
                    w.history.pushState({
                        verb: "get",
                        path: href
                    }, null, evt.target.href);
                    this.fire("location-changed", {
                        method: method,
                        path: href,
                        event: evt
                    });
                }
            }
        },
        /**
         * Form tag "submit" event handler
         */
        formSubmitHandler: function(evt) {
            var action, method, valuesHash;
            if (historyStarted && evt.target.tagName.toUpperCase() === "FORM") {
                action = evt.target.attributes.action.value;
                method = evt.target.attributes.method.value;
                console.log("attribute action", action);
                console.log("attribute method", method);
                if (action.indexOf("/") === 0) {
                    evt.preventDefault();
                    method = method ? method : "get"; // Defaults to "get" if methdo omitted
                    // valuesHash = valuesHashFromSerializedArray($form.serializeArray());
                    // FormData - see https://developer.mozilla.org/en-US/docs/Web/API/FormData for info
                    // var fd = new FormData(document.getElementById(evt.target.id));
                    // console.log(fd);
                    valuesHash = valuesHashFromSerializedArray(serialize(evt.target));
                    console.log("valuesHash", valuesHash);
                    //TODO(JS): pushState should only be called if the form has the attribute
                    // pushstate and it is true.
                    // w.history.pushState({
                    //     verb: method,
                    //     path: action
                    // }, null, event.target.href);
                    this.fire("location-changed", {
                        method: method,
                        path: action,
                        valuesHash: valuesHash,
                        event: evt
                    });
                }
            }
        },
        /**
         * History "popstate" event handler
         */
        popstateHandler: function(evt) {
            console.log("popstate event caught");
            console.log("event", evt);
            // Ignore 'popstate' events without state and until history.start is called.
            // if (evt.originalEvent && evt.originalEvent.state && historyStarted()) {
            if (historyStarted && evt.state) {
                // v.router.route(evt.originalEvent.state.verb , w.location.pathname);
                this.fire("location-changed", {
                    method: evt.state,
                    path: w.location.pathname,
                    event: evt
                });
            }
        },
        /**
         * Start
         */
        start: function(trigger /*, controllers*/ ) {
            historyStarted = true;
            w.history.replaceState({
                verb: "get"
            }, null, w.location.pathname);
            if (trigger) {
                // v.router.route('get', w.location.pathname);
            }
            console.log("history started!");
        },
        /**
         * Navigate
         */
        navigate: function(options) {
            if (historyStarted) {
                options = options || {};
                options.state = options.state || null;
                options.title = options.title || document.title;
                options.method = options.method || "get";
                options.url = options.url || w.location.pathname;
                options.trigger = options.trigger || false;
                options.replace = options.replace || false;
                w.history[options.replace ? "replaceState" : "pushState"](options.state,
                    options.title, options.url);
                if (options.trigger) {
                    // v.router.route(options.method, options.url);
                }
            }
        }
    });
}(window));
