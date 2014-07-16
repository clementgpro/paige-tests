/*global jasmine, describe, it, expect, spyOn */
define(['real/util/media'], function(media) {
  'use strict';

  describe('util/media', function() {

    it('is a function', function() {
      expect(media).toEqual(jasmine.any(Function));
    });

    it('depends on matchMedia', function() {
      var expectation = expect(function() {
        media('test', '(orientation: portrait)');
      });

      ((window.matchMedia || window.msMatchMedia) ?
        expectation.not :
        expectation).toThrow();
    });

    if (window.matchMedia || window.msMatchMedia) {

      it('fires a breakpoint from media queries', function() {
        var spy = jasmine.createSpy('onepixel');
        media.on('onepx', spy);

        media('onepx', '(min-width: 1px)');
        expect(spy).toHaveBeenCalled();
      });

      it('takes an object map of breakpoints to queries', function() {
        expect(function() {
          media({
            'foo': '(min-width: 1px)',
            'bar': '(max-width: 0px)'
          });
        }).not.toThrow();
      });

      it('does not fire non-matching breakpoints', function() {
        var spy = jasmine.createSpy('zeropixel');
        media.on('zeropx', spy);

        media('zeropx', '(max-width: 0px)');
        expect(spy).not.toHaveBeenCalled();
      });

      describe('is()', function() {

        it('reports breakpoint states', function() {
          expect(media.is('onepx')).toBe(true);
          expect(media.is('zeropx')).toBe(false);
        });

      });

      describe('getState()', function() {

        it('reports all currently active breakpoints', function() {
          var states = media.getState();
          expect(states).toEqual(jasmine.any(Array));
          expect(states.length).toBe(2);
          expect(states.indexOf('onepx')).not.toBe(-1);
          expect(states.indexOf('foo')).not.toBe(-1);
          expect(states.indexOf('zeropx')).toBe(-1);
          expect(states.indexOf('bar')).toBe(-1);
        });

        it('reports breakpoint states', function() {
          expect(media.getState('onepx')).toBe(true);
          expect(media.getState('zeropx')).toBe(false);
        });

      });
    }

  });

  return media;

});
