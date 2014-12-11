(function(w) {
    "use strict";
    /**
     * Creates a hash from an array whose elements are hashes whose properties are 'name' and 'value'.
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
                    method = method ? method : 'get';
                    // valuesHash = valuesHashFromSerializedArray($form.serializeArray());
                    // FormData - see https://developer.mozilla.org/en-US/docs/Web/API/FormData for info
                    valuesHash = valuesHashFromSerializedArray(new FormData(this));
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
