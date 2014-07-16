/*global jasmine, describe, it, expect, spyOn, mostRecentAjaxRequest */
define(['real/Controller', 'jquery', 'nbd/Class', 'nbd/View'], function(Controller, $, Class, View) {
  'use strict';

  describe('Controller', function() {
    var inst;

    beforeEach(function() {
      inst = new Controller();
    });

    it('is a class constructor', function() {
      expect(Controller).toEqual(jasmine.any(Function));
      expect(Controller.inherits(Class)).toBe(true);
      expect(inst).toEqual(jasmine.any(Controller));
    });

    describe('.destroy()', function() {

      it('is a function', function() {
        expect(inst.destroy).toEqual(jasmine.any(Function));
        expect(function() {
          inst.destroy();
        }).not.toThrow();
      });

    });

    describe('._initView()', function() {
      var Klass = function() {};

      beforeEach(function() {
        inst._initView(Klass);
      });

      it('creates ._view', function() {
        expect(inst._view).toEqual(jasmine.any(Klass));
      });

      it('attaches the controller to the ._view', function() {
        expect(inst._view._controller).toBe(inst);
      });
    });

    describe('.switchView()', function() {
      var Klass = function() {};

      it('creates ._view if nonexistant', function() {
        inst.switchView(Klass);
        expect(inst._view).toEqual(jasmine.any(Klass));
      });

      it('replaces ._view if existing', function() {
        Klass.prototype.$view = 'Klass $view';
        Klass.prototype.destroy = jasmine.createSpy('view destroy');
        inst.switchView(Klass);

        var View = function() {};
        View.prototype.render = jasmine.createSpy('view render');
        inst.switchView(View);

        expect(inst._view).toEqual(jasmine.any(View));
        expect(inst._view.render).toHaveBeenCalled();
        expect(inst._view.$view).toBe(Klass.prototype.$view);
        expect(Klass.prototype.destroy).toHaveBeenCalled();
      });
    });

  });

  return Controller;
});
