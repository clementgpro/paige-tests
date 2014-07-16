bescribe = require "../bescribe"
{expect} = require "chai"

config =
  address: "http://localhost:8282"
  webdriver:
    address: "http://localhost:4444/wd/hub"
    config:
      platform: "MAC"
      browserName: "firefox"

bescribe "WebElement", config, (context, describe, it) ->
  describe "#getXPath", ->
    it "resolves with the XPath for the given element", ->
      context.Page.build()
      .find('a')
      .getXPath()
      .then((xpath) ->
        expect(xpath).to.equal("/html/body/div/p[2]/a")
      )

  describe "#getCssProperties", ->
    it "resolves with the computed styles for the given element", ->
      context.Page.build()
      .find('a')
      .getCssProperties()
      .then((styles) ->
        expect(styles.width).to.equal("auto")
      )

  describe "#makeVisible", ->
    it "makes an element visible", ->
      context.Page.build()
      .find('#hidden-element')
      .makeVisible()
      .then((element) ->
        element.click()
      )

  describe "#hasClass", ->
    it "returns true if the element has the supplied class", ->
      context.Page.build()
      .find('#classy')
      .hasClass('active')
      .then((hasClass) ->
        expect(hasClass).to.be.true
      )

    it "returns false if the element does not have the supplied class", ->
      context.Page.build()
      .find('#classy')
      .hasClass('foobar')
      .then((hasClass) ->
        expect(hasClass).to.be.false
      )

    it "does not support partial class matching", ->
      context.Page.build()
      .find('#classy')
      # Has class 'active' but not 'act'
      .hasClass('act')
      .then((hasClass) ->
        expect(hasClass).to.be.false
      )

  describe "#hover", ->
    describe "when given a css selector", ->
      it "executes without errors", ->
        context.Page.build()
        .find('a')
        .hover()

  describe "#unhover", ->
    describe "when given a css selector", ->
      it "executes without errors", ->
        page = context.Page.build()

        page.find('a')
        .hover()
        .then(->
          page.find('a')
          .unhover()
        )

  describe "#clickable", ->
    it "returns true when element is clickable", ->
      context.Page.build()
      .find("a").clickable()
      .then((clickable) ->
        expect(clickable).to.be.true
      )

    it "returns false when element is not clickable", ->
      page = context.Page.build()

      page.runOnPage("document.querySelector('a').setAttribute('disabled', 'disabled')")
      .then(->
        page.find("a").clickable()
        .then((clickable) ->
          expect(clickable).to.be.false
        )
      )
