{ Page, createImage } = require "../index"
bescribe = require "../bescribe"
fs = require "fs"
request = require "request"
chai = require "chai"
chaiAsPromised = require "chai-as-promised"
util = require "util"
expect = chai.expect

chai.use chaiAsPromised

config =
  address: "http://localhost:8282"
  webdriver:
    address: "http://localhost:4444/wd/hub"
    config:
      platform: "MAC"
      browserName: "firefox"

bescribe "Base Page Object", config, (context, describe, it) ->
  describe "inheritence", ->
    describe "through extension", ->
      it "maintains parent's selectors", ->
        pageA = Page.extend
          selectors:
            a: 'foo',
            b: 'bar'
        pageB = pageA.extend
          selectors:
            c: 'baz'
        page = new pageB

        expect(page.selectors.a).to.equal "foo"
        expect(page.selectors.b).to.equal "bar"
        expect(page.selectors.c).to.equal "baz"

    describe "through composition", ->
      it "merges selectors of one component", ->
        compA =
          selectors:
            a: 'foo',
            b: 'bar'
        compPage = Page.extend().with compA
        page = new compPage

        expect(page.selectors.a).to.equal "foo"
        expect(page.selectors.b).to.equal "bar"

      it "merges selectors of n components", ->
        compA =
          selectors:
            a: 'foo1',
            b: 'bar1'
        compB =
          selectors:
            c: 'baz1',
        compPage = Page.extend().with compA, compB
        page = new compPage

        expect(page.selectors.a).to.equal "foo1"
        expect(page.selectors.b).to.equal "bar1"
        expect(page.selectors.c).to.equal "baz1"

    describe "through extension and composition", ->
      it "merges selectors of one component", ->
        pageA = Page.extend
          selectors:
            a: 'foo',
            b: 'bar'
        pageB = pageA.extend
          selectors:
            b: 'bar1'
        compA =
          selectors:
            c: 'baz2',
        compPage = pageB.with compA
        page = new compPage

        expect(page.selectors.a).to.equal "foo"
        expect(page.selectors.b).to.equal "bar1"
        expect(page.selectors.c).to.equal "baz2"

      it "merges selectors of n components", ->
        pageA = Page.extend
          selectors:
            a: 'foo',
            b: 'bar'
        pageB = pageA.extend
          selectors:
            c: 'baz1'
        compA =
          selectors:
            c: 'baz2',
        compB =
          selectors:
            a: 'foo3'
            d: 'fuu3',
        compPage = pageB.with compA, compB
        page = new compPage

        expect(page.selectors.a).to.equal "foo3"
        expect(page.selectors.b).to.equal "bar"
        expect(page.selectors.c).to.equal "baz1"
        expect(page.selectors.d).to.equal "fuu3"

  describe "Key", ->
    it "returns escape sequence for key", ->
      page = context.Page.build()

      expect(page.Key.ENTER).to.equal "\uE007"

  describe "#uploadFile", ->
    it "transfers a local file to the grid server", ->
      kittenPath = '/var/tmp/kitten.jpg'
      page = context.Page.build()

      request.get('http://placekitten.com/200/300', (err, response, body) ->
        fs.writeFileSync kittenPath, body

        page.uploadFile(kittenPath)
        .then (fileLocation) ->
          contents = fs.readFileSync fileLocation

          fs.stat fileLocation, (err, stat) ->
            expect(err).to.equal null
            expect(stat.isFile()).to.be.true
            expect(body).to.equal contents.toString()

          fs.unlinkSync kittenPath
      )

    it "transfers a buffer to the grid server", ->
      page = context.Page.build()

      createImage({})
      .then (buffer) ->
        page.uploadFile(buffer)
        .then (fileLocation) ->
          contents = fs.readFileSync fileLocation

          fs.stat fileLocation, (err, stat) ->
            expect(err).to.equal null
            expect(stat.isFile()).to.be.true
            expect(contents.toString()).to.equal buffer.toString()

  describe "#exists", ->
    it "throws an error if given undefined", ->
      expect(() ->
        context.Page.build()
        .exists(undefined)
        .then((present) ->
          expect(present).to.be.true
        )
      ).to.throw(Error)

    it "returns true if the element is on the page", ->
      context.Page.build()
      .exists("h1")
      .then((present) ->
        expect(present).to.be.true
      )

    it "returns false if the element is not on the page", ->
      context.Page.build()
      .exists("#i-dont-exist")
      .then((present) ->
        expect(present).to.be.false
      )

  describe "#find", ->
    it "throws an error if given undefined", ->
      expect(() ->
        context.Page.build()
        .find(undefined)
        .then((present) ->
          expect(present).to.be.true
        )
      ).to.throw(Error)

    it "correctly finds an element given a selector string", ->
      context.Page.build()
      .find("h1")
      .then((element) ->
        expect(element).to.not.equal(null)
      )

    it "correctly finds an element given a selector tuple", ->
      context.Page.build()
      .find(["More information...", "link text"])
      .then((element) ->
        expect(element).to.not.equal(null)
      )

    it "returns a selector that can be chained", ->
      context.Page.build()
      .find('#main-element')
      .find('p')

  describe "#findAll", ->
    it "throws an error if given undefined", ->
      expect(() ->
        context.Page.build()
        .findAll(undefined)
        .then((present) ->
          expect(present).to.be.true
        )
      ).to.throw(Error)

    it "resolves with all elements matching a query", ->
      context.Page.build()
      .findAll("p")
      .then((elements) ->
        expect(elements).to.have.length(2)
      )

  describe "#findInList", ->
    describe "given a list of WebElements", ->
      describe "and a sync filter", ->
        it "returns an element that fulfills a content criteria", ->
          elementsSeen = 0
          threshold = 1
          page = context.Page.build()

          page
          .findAll("p")
          .then((list) ->
            page.findInList(list, (element, cb) ->
              if elementsSeen is threshold
                cb element
                return

              elementsSeen++
              cb()
            )
            .then((element) ->
              element.getText().then((text) ->
                expect(text).to.match(/More info/)
              )
            )
          )

      describe "and an async filter", ->
        it "returns an element that fulfills a content criteria", ->
          page = context.Page.build()

          page
          .findAll("p")
          .then((list) ->
            page.findInList(list, (element, cb) ->
              element.getText().then((innerText) ->
                if !innerText.indexOf "This domain is"
                  cb element
                  return

                cb()
              )
            )
            .then((element) ->
              element.getText().then((text) ->
                expect(text).to.match(/This domain is/)
              )
            )
          )

        it "returns an element that fulfills a structure criteria", ->
          page = context.Page.build()

          page
          .findAll("p")
          .then((list) ->
            page.findInList(list, (element, cb) ->
              element.exists('a').then((present) ->
                elem = if present then element else null
                cb elem
              )
            )
            .then((element) ->
              element.find('a')
            )
          )

  describe "#verifyContent", ->
    describe "given a selector string", ->
      it "tests if the content matches the given string" , ->
        context.Page.build()
        .verifyContent('h1', 'EXAMPLE DOMAIN')

    describe "given a webElement", ->
      it "tests if the content matches the given string", ->
        page = context.Page.build()
        page.verifyContent(page.find('h1'), 'Example Domain')

  describe "#runOnPage", ->
    it "runs a function in the context of the session", ->
      context.Page.build()
      .runOnPage(-> 5)
      .then((returnVal) ->
        expect(returnVal).to.equal(5)
      )

  describe "#whenDisplayed", ->
    it "waits for an element to be displayed", ->
      context.Page.build()
      .whenDisplayed('h1')

  describe "#whenNotDisplayed", ->
    page = Page.extend
      pageRoot: "/"
      enterSearch: ->
        @find('a').click()
        @

    it "waits for an element to not be displayed", ->
      context.Page.build()
      .switchTo(page)
      .enterSearch()
      .whenNotDisplayed('[href="http://www.iana.org/domains/example"]')

  describe "#onPage", ->
    describe "for the simple case", ->
      page = Page.extend
        pageRoot: "/"

      it "verifies using the pathname", ->
        context.Page.build()
        .switchTo(page)
        .onPage()

    describe "for the complex case", ->
      page = Page.extend
        pageRoot: "/"
        onPage: ->
          @_super [
            "h1"
            ["main-header", "id"]
            {selector: "p a", isDisplayed: true, getText: 'More information...'},
          ]
          @

      it "verifies using test defined rules", ->
        context.Page.build()
        .switchTo(page)
        .onPage()

  describe "#awaits", ->
    page = Page.extend
      passed: false
      pageRoot: "/"
      waitForAsyncThing: ->
        @awaits((promise) =>
          setTimeout(=>
            @passed = true
            promise.fulfill()
          , 1000)
        )
        .then =>
          expect(@passed).to.be.true

      it "waits for a promise to be resolved", ->
        context.Page.build()
        .switchTo(page)
        .waitForAsyncThing()

  describe '#wait', ->
    page = Page.extend
      passed: false
      pageRoot: "/"
      waitForAsyncThing: (promise) ->
        # The element is already invisible, so this
        # should return true immediately
        @wait(() ->
          return @find("#hidden-element").isDisplayed().then((visible) ->
            return !visible
          );
        )

        # Fulfillment of the promise waits until the
        # previous wait has finished/resolved
        @wait(() ->
          promise.fulfill()
          return true;
        )
      waitForFailingThing: () ->
        # The element is invisible and won't be visible
        return @wait(() ->
          return @find("#hidden-element").isDisplayed().then((visible) ->
            return visible
          );
        , 500)

    it "waits until a given function returns/resolves to true", ->
      expected = 'foobar'

      p = context.Page.build()
        .switchTo(page)

      p.awaits((promise) ->
        p.waitForAsyncThing(promise)
      )

    it "throws when the timer is reached and the function hasn't resolved to true", ->
      p = context.Page.build()
        .switchTo(page)

      expect(p.waitForFailingThing()).to.be.rejectedWith Error

  describe "#uploadImage", ->
    it "creates an image and uploads", ->
      context.Page.build()
      .uploadImage('').then((filePath) ->
        fs.stat filePath, (err, stat) ->
          expect(err).to.equal null
          expect(stat.isFile()).to.be.true
      )

  describe "#getTextAreaInput", ->
    it "gets the text input", ->
      testString = 'hello world!'

      page = context.Page.build()

      page.find("#textarea")
      .sendKeys(testString)

      page.find("#textarea")
      .getTextAreaInput().then((input) ->
        expect(input).to.equal(testString)
      )


  describe.skip "debugger", ->
    it "is so boss", ->
      context.Page.build()
      .debugger()
