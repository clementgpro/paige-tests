/*global jasmine, describe, it, expect, beforeEach, afterEach, runs, waits, waitsFor */
define(['real/Model', 'nbd/Class'], function(Model, Class) {
  'use strict';

  describe('Model', function() {

    it('is a Class constructor', function() {
      expect(Model).toEqual(jasmine.any(Function));
      expect(Model.inherits(Class)).toBe(true);
    });

    describe('.init()', function() {

      it('initializes with data', function() {
        var rand = Math.random(),
        instance = new Model(1, {xyz: rand}),
        data;

        expect(instance.id()).toBe(1);
        expect(data = instance.data()).toEqual(jasmine.any(Object));
        expect(data.xyz).toBe(rand);
      });

      it('allows just an id', function() {
        var instance = new Model(42);
        expect(instance.id()).toBe(42);
        expect(instance.data()).toEqual(jasmine.any(Object));
      });

      it('supports numeric string ids', function() {
        var instance = new Model('42');
        expect(instance.id()).toBe(42);
        expect(instance.data()).toEqual(jasmine.any(Object));
      });

      it('supports non-numeric ids', function() {
        var instance = new Model("xyz", {});
        expect(instance.id()).toBe('xyz');

        instance = new Model(-1, {});
        expect(instance.id()).toBe(-1);
      });

      it('has optional id', function() {
        var foo = { bar: Infinity },
        instance = new Model(foo);

        expect(instance.id()).not.toBeDefined();
        expect(instance.data()).toBe(foo);
      });

      it('has optional data as well', function() {
        var instance = new Model();
        expect(instance.id()).not.toBeDefined();
        expect(instance.data()).toEqual(jasmine.any(Object));
      });

    });

    describe('.get()', function() {

      it('returns a value', function() {
        var rand = Math.random(), instance = new Model(1, {xyz: rand});
        expect(instance.get('xyz')).toBe(rand);
      });

      it('returns unepxected property names as undefined', function() {
        var instance = new Model(1, {xyz: 'xyz'});
        expect(instance.get('abc')).not.toBeDefined();
      });

      it('returns undefined values', function() {
        var instance = new Model(1, {xyz: undefined});
        expect(instance.get('xyz')).not.toBeDefined();
      });

    });

    describe('.set()', function() {
      var rand, instance;

      beforeEach(function() {
        rand = Math.random();
        instance = new Model(1, {xyz: null, foo: 'bar'});
      });

      it('accepts an object map', function() {
        expect(function(){ instance.set({xyz: 0}); }).not.toThrow();
        expect(instance.get('xyz')).toBe(0);
      });

      it('accepts a key/value pair', function() {
        expect(function(){ instance.set('xyz', rand); }).not.toThrow();
        expect(instance.get('xyz')).toBe(rand);
      });

      it('ignores any other arguments', function() {
        expect(function() { instance.set(); }).not.toThrow();
        expect(function() { instance.set(32, 64); }).not.toThrow();
        expect(function() { instance.set(function() {}); }).not.toThrow();
        expect(function() { instance.set(null); }).not.toThrow();
      });

      describe('announces changes to the data object', function() {
        var result = 0, cb;

        beforeEach(function() {
          cb = jasmine.createSpy('change catcher')
              .andCallFake(function() { result = 1; });
        });

        afterEach(function() {
          result = 0;
        });

        it('announces singular set() calls', function() {
          runs(function() {
            instance.on('foo', cb);
            instance.set('foo', 'baq');
          });

          waitsFor(function() {
            return !!result;
          }, "change notification", 10);

          runs(function() {
            expect(cb).toHaveBeenCalledWith('baq', 'bar');
            expect(instance.get('foo')).toBe('baq');
          });
        });

        it('mutes singular identical set() calls', function() {
          runs(function() {
            instance.on('foo', cb);
            instance.set('foo', 'bar');
          });

          waits(40);

          runs(function() {
            expect(cb).not.toHaveBeenCalled();
            expect(instance.get('foo')).toBe('bar');
          });
        });

        it('announces mapped set() calls', function() {
          runs(function() {
            instance.on('foo', cb);
            instance.on('xyz', cb);
            instance.set({ foo: 'baz', xyz: 42 });
          });

          waitsFor(function() {
            return !!result;
          }, "change notification", 10);

          runs(function() {
            expect(cb.callCount).toBe(2);
            expect(cb.argsForCall[1]).toEqual(['baz', 'bar']);
            expect(cb.argsForCall[0]).toEqual([42, null]);
            expect(instance.get('foo')).toBe('baz');
            expect(instance.get('xyz')).toBe(42);
          });
        });

        it('mutes identical mapped set() calls', function() {
          runs(function() {
            instance.on('foo', cb);
            instance.on('xyz', cb);
            instance.set({ foo: 'bar', xyz: null });
          });

          waits(40);

          runs(function() {
            expect(cb).not.toHaveBeenCalled();
            expect(instance.get('foo')).toBe('bar');
            expect(instance.get('xyz')).toBe(null);
          });
        });
      });
    });

    describe('.data()', function() {
      var data, instance;

      beforeEach(function() {
        data = { foo: 'bar', arr: [], obj: {} };
        instance = new Model(data);
      });

      it('returns the data object', function() {
        expect(instance.data()).toBe(data);
      });

      describe('watches for changes', function() {
        var result = 0, cb;

        beforeEach(function() {
          cb = jasmine.createSpy('change catcher')
              .andCallFake(function() { result = 1; });
        });

        afterEach(function() {
          result = 0;
        });

        it('announces property changes', function() {
          runs(function() {
            var d = instance.data();
            instance.on('foo', cb);
            d.foo = 'baz';
          });

          waitsFor(function() {
            return !!result;
          }, "change notification", 10);

          runs(function() {
            expect(cb).toHaveBeenCalledWith('baz', 'bar');
            expect(instance.get('foo')).toBe('baz');
          });
        });

        it('can mix calls to .set() before', function() {
          runs(function() {
            instance.on('foo', cb);
            instance.set('foo', 'goats');
            var d = instance.data();
            d.foo = 'baz';
          });

          waitsFor(function() {
            return !!result;
          }, "change notification", 10);

          runs(function() {
            expect(cb.callCount).toBe(1);
            expect(cb).toHaveBeenCalledWith('baz', 'bar');
            expect(instance.get('foo')).toBe('baz');
          });
        });

        it('can mix calls to .set() after', function() {
          runs(function() {
            var d = instance.data();
            instance.on('foo', cb);
            d.foo = 'baz';
            instance.set('foo', 'goats');
          });

          waitsFor(function() {
            return !!result;
          }, "change notification", 10);

          runs(function() {
            expect(cb.callCount).toBe(1);
            expect(cb).toHaveBeenCalledWith('goats', 'bar');
            expect(instance.get('foo')).toBe('goats');
          });
        });

      });

    });

    describe('.toJSON()', function() {
      var data = { foo: 'bar' },
      instance = new Model(0, data);

      it('returns the same data as .data()', function() {
        expect(instance.toJSON()).toBe(instance.data());
      });

      it('allows JSON.stringify of the model', function() {
        expect(JSON.stringify(instance)).toEqual(JSON.stringify(instance.data()));
      });
    });

    describe('.destroy()', function() {
      var data = { foo: 'bar' },
      instance = new Model(0, data);

      it('removes all event bindings', function() {
        var cb = jasmine.createSpy();
        instance.on('foo', cb);
        instance.destroy();
        instance.trigger('foo', 'baz');

        expect(cb).not.toHaveBeenCalled();
      });
    });

  });

  return Model;

});
