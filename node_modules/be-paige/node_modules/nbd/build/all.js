if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
       'nbd/Class',
       'nbd/Model',
       'nbd/View',
       'nbd/View/Entity',
       'nbd/View/Element',
       'nbd/Controller',
       'nbd/Controller/Entity',
       'nbd/event',
       'nbd/trait/promise',
       'nbd/trait/pubsub',
       'nbd/util/async',
       'nbd/util/construct',
       'nbd/util/deparam',
       'nbd/util/diff',
       'nbd/util/extend',
       'nbd/util/media',
       'nbd/util/pipe',
       'nbd/util/when'
], function(Class, Model, View, EntityView, ElementView, Controller, Entity, event, promise, pubsub, async, construct, deparam, diff, extend, media, pipe, when) {
  'use strict';

  var exports = {
    Class : Class,
    Model : Model,
    View : View,
    Controller : Controller,
    event : event,
    trait : {
      promise : promise,
      pubsub : pubsub
    },
    util : {
      async : async,
      construct : construct,
      deparam : deparam,
      diff : diff,
      extend : extend,
      media : media,
      pipe : pipe,
      when : when
    }
  };

  exports.View.Element = ElementView;
  exports.View.Entity = EntityView;
  exports.Controller.Entity = Entity;

  return exports;
});
