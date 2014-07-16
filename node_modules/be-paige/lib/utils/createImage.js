var phantom = require('phantom'),
    Promise = require('nbd').trait.promise;

function _createCanvas(attributes) {
  var attribute,
      canvas = document.createElement("canvas");

  for (attribute in attributes) {
    if (attributes.hasOwnProperty(attribute)) {
      canvas.setAttribute(attribute, attributes[attribute]);
    }
  }

  return canvas.toDataURL();
}

function createImage(attributes) {
  var promise = new Promise();

  phantom.create(function(ph) {
    ph.createPage(function(page) {
      page.evaluate(_createCanvas, function(result) {
        var buffer = new Buffer(result.split(',')[1], 'base64');
        ph.exit();

        promise.resolve(buffer);
      }, attributes);
    });
  });

  return promise;
}

module.exports = createImage;
