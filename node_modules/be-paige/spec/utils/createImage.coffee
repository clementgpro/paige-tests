{ createImage } = require "../../index"
fs = require 'fs',
{ expect } = require 'chai'

describe "lib/utils/createImage", ->
  path = "/var/tmp/dummy_image.png"

  it "creates an image", (done) ->
    createImage({})
    .then (buffer) ->
      fs.writeFileSync path, buffer

      fs.stat path, (err, stat) ->
        expect(err).to.equal(null)
        expect(stat.isFile()).to.be.true

        fs.unlinkSync path
        done()
