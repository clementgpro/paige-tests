var client = {
  // FireBug's getXPath implementation
  getXPath: function() {
    var paths = [],
        element = arguments[0];

    for (; element && element.nodeType === 1; element = element.parentNode) {
      var index = 0;

      for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
        if (sibling.nodeType === Node.DOCUMENT_TYPE_NODE) { continue; }
        if (sibling.nodeName === element.nodeName) { ++index; }
      }

      var tagName = element.nodeName.toLowerCase();
      var pathIndex = (index ? "[" + (index+1) + "]" : "");
      paths.splice(0, 0, tagName + pathIndex);
    }

    return paths.length ? "/" + paths.join("/") : null;
  },

  getCssProperties: function() {
    var element = arguments[0],
        styles = {},
        computedStyles = window.getComputedStyle(element);

    Array.prototype.slice.call(computedStyles).forEach(function (style) {
      styles[style] = computedStyles.getPropertyValue(style);
    });

    return styles;
  },

  makeElementVisible: function() {
    var element = arguments[0];

    element.style.top = 0;
    element.style.left = 0;
    element.style.position = 'absolute';
    element.style.visibility = 'visible';
    element.style.display = 'block';
    element.style.height = '1px';
    element.style.width = '1px';
  },

  hover: function() {
    var element = arguments[0],
        event = document.createEvent('MouseEvents');

    event.initEvent('mouseover', true, false);
    element.dispatchEvent(event);
  },

  unhover: function() {
    var element = arguments[0],
        event = document.createEvent('MouseEvents');

    event.initEvent('mouseout', true, false);
    element.dispatchEvent(event);
  },

  getTextAreaInput: function() {
    var element = arguments[0];

    return element.value;
  }
};

module.exports = client;
