merge = require "../../lib/utils/merge"
{ expect } = require("chai")

describe "lib/utils/merge", ->
  it "returns obj when called with one parameter", ->
    expect(merge({ a: "one", b: "two" })).to.deep.equal({ a: "one", b: "two" })

  it "returns a composite object when called with n parameters", ->
    objA = { a: "one", b: "two" }
    objB = { c: "three", d: "four" }
    composite = { a: "one", b: "two", c: "three", d: "four" }

    expect(merge(objA, objB)).to.deep.equal(composite)

  it "ignores non-objects passed in", ->
    objA = { a: "one", b: "two" }

    expect(merge(objA, undefined)).to.deep.equal(objA)

  describe "when called with objects that have the same keys", ->
    it "returns a composite with keys overridden in the order passed", ->
      objA = { a: "one", b: "two" }
      objB = { c: "three", b: "four" }
      compositeA = { a: "one", b: "four", c: "three" }
      compositeB = { a: "one", b: "two", c: "three" }

      expect(merge(objA, objB)).to.deep.equal(compositeA)
      expect(merge(objB, objA)).to.deep.equal(compositeB)

    it "overrides similar keys when one is complex and the other is simple", ->
      objA = { a: "one", b: { a: "two", b: "three" } }
      objB = { c: "three", b: "four" }
      compositeA = { a: "one", b: "four", c: "three" }
      compositeB = { a: "one", b: { a: "two", b: "three" }, c: "three" }

      expect(merge(objA, objB)).to.deep.equal(compositeA)
      expect(merge(objB, objA)).to.deep.equal(compositeB)

    it "recursively merges keys when both are mapped to objects", ->
      objA = { a: "one", b: { a: "two", b: "three" } }
      objB = { c: "four", b: { b: "five", c: "six" } }
      compositeA = { a: "one", c: "four", b: { a: "two", b: "five", c: "six" } }
      compositeB = { a: "one", c: "four", b: { a: "two", b: "three", c: "six" } }

      expect(merge(objA, objB)).to.deep.equal(compositeA)
      expect(merge(objB, objA)).to.deep.equal(compositeB)
