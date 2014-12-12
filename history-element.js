(function(w) {
    "use strict";

    function serialize(form) {
        if (!form || form.nodeName !== "FORM") {
            return;
        }
        var i, j, q = [];
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
                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[
                                    i]
                                .value));
                            break;
                        case "checkbox":
                        case "radio":
                            if (form.elements[i].checked) {
                                q.push(form.elements[i].name + "=" + encodeURIComponent(
                                    form.elements[
                                        i].value));
                            }
                            break;
                        case "file":
                            break;
                    }
                    break;
                case "TEXTAREA":
                    q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i]
                        .value));
                    break;
                case "SELECT":
                    switch (form.elements[i].type) {
                        case "select-one":
                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[
                                    i]
                                .value));
                            break;
                        case "select-multiple":
                            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                                if (form.elements[i].options[j].selected) {
                                    q.push(form.elements[i].name + "=" + encodeURIComponent(
                                        form.elements[
                                            i].options[j].value));
                                }
                            }
                            break;
                    }
                    break;
                case "BUTTON":
                    switch (form.elements[i].type) {
                        case "reset":
                        case "submit":
                        case "button":
                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[
                                    i]
                                .value));
                            break;
                    }
                    break;
            }
        }
        return q.join("&");
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
            // Setup an anchor tag "click" event hanler
            document.addEventListener("click", this.anchorClickHandler);
            // Setup a form tag "submit" event handler
            document.addEventListener("submit", this.formSubmitHandler);
            // Setup a popstate event handler
            window.addEventListener("popstate", this.popstateHandler);
        },
        /**
         * Anchor tag "click" event hanler
         */
        anchorClickHandler: function(evt) {
            var href;
            if (evt.target.tagName.toUpperCase() === "A") {
                href = evt.target.attributes.href.value;
                console.log("attribute href", href);
                if (href.indexOf("/") === 0) {
                    evt.preventDefault();
                }
            }
        },
        /**
         * Form tag "submit" event handler
         */
        formSubmitHandler: function(evt) {
            var action, method, valuesHash;
            if (evt.target.tagName.toUpperCase() === "FORM") {
                action = evt.target.attributes.action.value;
                method = evt.target.attributes.method.value;
                console.log("attribute action", action);
                console.log("attribute method", method);
                if (action.indexOf("/") === 0) {
                    evt.preventDefault();
                    method = method ? method : "get";
                    // valuesHash = valuesHashFromSerializedArray($form.serializeArray());
                    // FormData - see https://developer.mozilla.org/en-US/docs/Web/API/FormData for info
                    // var fd = new FormData(document.getElementById(evt.target.id));
                    // console.log(fd);
                    valuesHash = valuesHashFromSerializedArray(serialize(evt.target));
                    console.log("valuesHash", valuesHash);
                }
            }
        },
        /**
         * History "popstate" event handler
         */
        popstateHandler: function(evt) {
            console.log("popstate event caught");
            console.log("event", evt);
        }
    });
}(window));
