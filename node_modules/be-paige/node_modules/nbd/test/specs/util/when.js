/*global jasmine, describe, it, expect, runs, waitsFor, beforeEach, waits */
define(['real/util/when', 'nbd/trait/promise'], function(when, Promise) {
  'use strict';

  describe('util/when', function() {

    var promise, sentinel;

    beforeEach(function() {
      promise = new Promise();
      sentinel = jasmine.createSpy('then callback');
    });

    it('is a function', function() {
      expect(when).toEqual(jasmine.any(Function));
    });

    it('resolves immediate values', function() {
      var o = {}, f = function() {}, n = null, u;
      when(o, f, n, u).then(sentinel);

      waits(10);
      runs(function() {
        expect(sentinel).toHaveBeenCalledWith([o,f,n,u]);
      });
    });

    it('resolves when promise resolves', function() {
      when(promise).then(sentinel);

      promise.resolve('original');

      waits(10);
      runs(function() {
        expect(sentinel).toHaveBeenCalledWith(['original']);
      });
    });

    it('resolves when last promise resolves', function() {
      var last = new Promise();

      when('a', last, promise).then(sentinel);

      waits(10);
      runs(function() {
        expect(sentinel).not.toHaveBeenCalled();
        promise.resolve('original');
      });

      waits(10);
      runs(function() {
        expect(sentinel).not.toHaveBeenCalled();
        last.resolve('netflix');
      });

      waits(10);
      runs(function() {
        expect(sentinel).toHaveBeenCalledWith(['a', 'netflix', 'original']);
      });
    });

    it('rejects when any promise rejects', function() {
      var last = new Promise(),
      fail = jasmine.createSpy('then failback');
      when(promise, last).then(sentinel, fail);

      promise.reject('nok');

      waits(10);
      runs(function() {
        expect(fail).toHaveBeenCalledWith('nok');
        expect(sentinel).not.toHaveBeenCalled();
        last.resolve('ok');
      });

      waits(10);
      runs(function() {
        expect(sentinel).not.toHaveBeenCalled();
      });
    });

    it('resolves empty calls immediately', function() {
      when().then(sentinel);

      waits(10);
      runs(function() {
        expect(sentinel).toHaveBeenCalledWith([]);
      });
    });

  });

  return when;

});
