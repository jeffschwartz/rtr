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
                            q.push(nameValueHash(form.elements[i].name,
                                form.elements[
                                    i].value));
                            break;
                        case "checkbox":
                        case "radio":
                            if (form.elements[i].checked) {
                                q.push(nameValueHash(form.elements[i].name,
                                    form.elements[
                                        i].value));
                            }
                            break;
                        case "file":
                            break;
                    }
                    break;
                case "TEXTAREA":
                    q.push(nameValueHash(form.elements[i].name, form.elements[
                        i].value));
                    break;
                case "SELECT":
                    switch (form.elements[i].type) {
                        case "select-one":
                            q.push(nameValueHash(form.elements[i].name,
                                form.elements[
                                    i].value));
                            break;
                        case "select-multiple":
                            a = [];
                            for (j = form.elements[i].options.length -
                                1; j >= 0; j = j - 1) {
                                if (form.elements[i].options[j].selected) {
                                    a.push(form.elements[i].options[j].value);
                                }
                            }
                            if (a.length) {
                                q.push(nameValueHash(form.elements[i].name,
                                    a));
                            }
                            break;
                    }
                    break;
                case "BUTTON":
                    switch (form.elements[i].type) {
                        case "reset":
                        case "submit":
                        case "button":
                            q.push(nameValueHash(form.elements[i].name,
                                form.elements[
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
    Polymer("rtr-history", {
        ready: function() {
            //Verify browser supports pushstate
            console.log(history.pushState ?
                "history pushState is supported in your browser" :
                "history pushstate is not supported in your browser"
            );

            // Setup an anchor tag "click" event hanler
            document.addEventListener("click", this.anchorClickHandler
                .bind(this));
            // Setup a form tag "submit" event handler
            document.addEventListener("submit", this.formSubmitHandler
                .bind(this));
            // Setup a popstate event handler
            w.addEventListener("popstate", this.popstateHandler
                .bind(this));
        },
        domReady: function() {
            this.routerEl = document.querySelector("rtr-router");
            console.log(this.routerEl);
        },
        /**
         * Anchor tag "click" event hanler
         */
        anchorClickHandler: function(evt) {
            var method = "get" /* Allways a "get" */ ,
                href;
            if (historyStarted && evt.target.tagName.toUpperCase() ===
                "A") {
                href = evt.target.attributes.href.value;
                console.log("attribute href", href);
                if (href.indexOf("/") === 0) {
                    evt.preventDefault();
                    if (!evt.target.attributes.hasOwnProperty(
                            "data-rtr-nopushstate")) {
                        w.history.pushState({
                            verb: "get",
                            path: href
                        }, null, evt.target.href);
                    }
                    this.routerEl.route(method, href);
                }
            }
        },
        /**
         * Form tag "submit" event handler
         */
        formSubmitHandler: function(evt) {
            var action, method, valuesHash;
            if (historyStarted && evt.target.tagName.toUpperCase() ===
                "FORM") {
                action = evt.target.attributes.action.value;
                method = evt.target.attributes.method.value;
                console.log("attribute action", action);
                console.log("attribute method", method);
                if (action.indexOf("/") === 0) {
                    evt.preventDefault();
                    method = method ? method : "get"; // Defaults to "get" if method omitted
                    valuesHash = valuesHashFromSerializedArray(
                        serialize(evt.target));
                    console.log("valuesHash", valuesHash);
                    if (!evt.target.attributes.hasOwnProperty(
                            "data-rtr-nopushstate")) {
                        w.history.pushState({
                            verb: method,
                            path: action
                        }, null, action);
                    }
                    this.routerEl.route(method, action,
                        valuesHash);
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
            if (historyStarted && evt.state) {
                this.routerEl.route(evt.state.verb, w.location.pathname);
            }
        },
        /**
         * Start
         */
        start: function(pushState, trigger) {
            historyStarted = true;
            //TODO(JS): test with pushState false
            if (pushState) {
                w.history.replaceState({
                    verb: "get",
                    path: w.location.pathname
                }, null, w.location.pathname);
            }
            //TODO(JS): test with trigger false
            if (trigger) {
                this.routerEl.route("get", w.location.pathname);
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
                options.pushState = options.pushState || false;
                options.trigger = options.trigger || false;
                options.replace = options.replace || false;
                //TODO(JS): test with pushState false
                if (options.pushState) {
                    w.history[options.replace ? "replaceState" :
                        "pushState"](options.state,
                        options.title, options.url);
                }
                //TODO(JS): test with trigger false
                if (options.trigger) {
                    //TODO(JS): implement
                    // v.router.route(options.method, options.url);
                    this.routerEl.route(options.method, options
                        .url);
                }
            }
        }
    });
}(window));
