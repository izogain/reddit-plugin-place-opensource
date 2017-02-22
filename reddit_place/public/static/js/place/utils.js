!r.placeModule('utils', function(require) {
  return {
    /**
     * Utility for linear interpolation between to values
     * Useful as a cheap and easy way to ease between to values
     *
     *    lerp(0, 10, .5);
     *    // 5
     *
     * @function
     * @param {number} startVal The current value
     * @param {number} endVal The target value
     * @param {number} interpolationAmount A float between 0 and 1, usually
     *    amount of passed time * some interpolation speed
     * @returns {number} The interpolated value
     */
    lerp: function(startVal, endVal, interpolationAmount) {
      return startVal + interpolationAmount * (endVal - startVal);
    },

    /**
     * Utility for binding a bunch of events to a single element.
     * @function
     * @param {HTMLElement} target
     * @param {Object<function>} eventsDict A dictionary of event handling functions.
     *    Each key should be the name of the event to bind the handler to.
     * @param {bool} [useCapture] Whether to use event capturing.  Defaults to true.
     */
    bindEvents: function(target, eventsDict, useCapture) {
      useCapture = useCapture === undefined ? true : useCapture;

      for (var event in eventsDict) {
        // If useCapture changes from true to false,
        // CanvasEvents.mouseup will stop working correctly
        target.addEventListener(event, eventsDict[event], true);
      }
    },

    /**
     * Utility for wrapping a method with a sort of decorator function
     * Used specifically from admin tools to inject behavior into some other modules
     * @function
     * @param {Object} target
     * @param {string} methodName
     * @param {function} fn
     */
    hijack: function(target, methodName, fn) {
      var targetMethod = target[methodName];
      // Overwrite the original function.  The fn function can access
      // the original function as this.targetMethod
      target[methodName] = function() {
        // Give the context object a special key that points to the original function
        target.targetMethod = targetMethod;
        var res = fn.apply(target, arguments);
        delete target.targetMethod;
      };
    },
  };
});
