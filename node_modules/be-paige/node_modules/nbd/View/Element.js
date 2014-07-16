if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['../View'], function(View) {
  "use strict";

  var constructor = View.extend({

    $parent: null,

    init : function($parent) {
      this.$parent = $parent;
    },

    render : function(data) {
      var $existing = this.$view;

      this.trigger('prerender', $existing);

      this.$view = this.template(data || this.templateData());

      if ($existing && $existing.length) {
        $existing.replaceWith(this.$view);
      }
      else {
        this.$view.appendTo(this.$parent);
      }

      this.trigger('postrender', this.$view);

      if(this.rendered) {
        this.rendered(this.$view);
      }

      return this.$view;
    }

  });

  return constructor;

});
