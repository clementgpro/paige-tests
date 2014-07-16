if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['../util/construct',
       '../Controller',
       '../View/Entity',
       '../Model'
], function(construct, Controller, View, Model) {
  'use strict';

  var constructor = Controller.extend({
    init : function() {
      this._model = this.Model = construct.apply(this.constructor.MODEL_CLASS, arguments);
      this._initView(this.constructor.VIEW_CLASS, this._model);
    },

    render : function($parent, ViewClass) {
      ViewClass = ViewClass || this.constructor.VIEW_CLASS;

      this.requestView(ViewClass);
      this._view.render($parent);
    },

    destroy : function() {
      this._view.destroy();
      this._model.destroy();
      this._model = this._view = null;
    },

    requestView : function(ViewClass) {
      if (this._view instanceof ViewClass) { return; }
      this.switchView(ViewClass, this._model);
    }
  },{
    // Corresponding Entity View class
    VIEW_CLASS : View,

    // Corresponding Entity Model class
    MODEL_CLASS : Model
  });

  return constructor;

});
