Page = require "../../lib/page"
Form = require "../../lib/components/form"
bescribe = require "../../bescribe"
{expect} = require "chai"

config =
  address: "http://localhost:8282"
  webdriver:
    address: "http://localhost:4444/wd/hub"
    config:
      platform: "MAC"
      browserName: "firefox"

bescribe "Form Component", config, (context, describe, it) ->
  describe "#fillInText", ->
    page = Page.extend
      pageRoot: '/form.html'
      forms:
        textForm:
          context: "#text-form"
          submit: ".submit"
          inputs:
            term: "#term"
    .with Form

    it "enters data into the text field", ->
      context.Page.build()
      .redirectTo page
      .enterInformation "textForm",
        term: "Behance"
      .find "#term"
      .getAttribute "value"
      .then (value) ->
        expect(value).to.equal "Behance"

    it "clears text before entering new text", ->
      context.Page.build()
      .redirectTo page
      .enterInformation "textForm",
        term: "Old Value Here"
      .enterInformation "textForm",
        term: "New Value Here"
      .find "#term"
      .getAttribute "value"
      .then (value) ->
        expect(value).to.equal "New Value Here"

  describe "#fillInSelect", ->
    it "selects the option with the specified value", ->
      page = Page.extend
        pageRoot: '/form.html'
        forms:
          selectForm:
            context: "#select-form"
            submit: ".submit"
            inputs:
              select:
                selector: "#select"
                type: 'select'
      .with Form

      context.Page.build()
      .redirectTo page
      .enterInformation "selectForm",
        select: "2"
      .find "#select [value='2']"
      .isSelected()
      .then (selected) ->
        expect(selected).to.be.true

  describe "#fillInRadio", ->
    it "clicks the radio with the specified value", ->
      page = Page.extend
        pageRoot: '/form.html'
        forms:
          radioForm:
            context: "#radio-form"
            submit: ".submit"
            inputs:
              rGroup:
                selector: "[name=r-group]"
                type: 'radio'
      .with Form

      context.Page.build()
      .redirectTo page
      .enterInformation "radioForm",
        rGroup: 2
      .runOnPage ->
        document.querySelector("#radio-2").checked
      .then (checked) ->
        expect(checked).to.be.true

  describe "#fillInCheckbox", ->
    it "clicks the checkbox with the specified value", ->
      page = Page.extend
        pageRoot: '/form.html'
        forms:
          checkboxForm:
            context: "#checkbox-form"
            submit: ".submit"
            inputs:
              checkboxes:
                selector: "[name=checkboxes]"
                type: 'checkbox'
      .with Form

      context.Page.build()
      .redirectTo page
      .enterInformation "checkboxForm",
        checkboxes: "2"
      .find "#checkbox-2"
      .isSelected()
      .then (selected) ->
        expect(selected).to.be.true

    it "checks the checkbox based on boolean values", ->
      page = Page.extend
        pageRoot: '/form.html'
        forms:
          checkboxForm:
            context: "#checkbox-form"
            submit: ".submit"
            inputs:
              checkbox1:
                selector: "#checkbox-1"
                type: 'checkbox'
              checkbox2:
                selector: "#checkbox-2"
                type: 'checkbox'
              checkbox3:
                selector: "#checkbox-3"
                type: 'checkbox'
              checkbox4:
                selector: "#checkbox-4"
                type: 'checkbox'
        verifyChecked: (selector, checked) ->
          @find(selector).isSelected().then((selected) ->
            expect(selected).to.equal(checked)
          )
          @
      .with Form

      context.Page.build()
      .redirectTo page
      .enterInformation "checkboxForm",
        checkbox1: true
        checkbox2: false
        checkbox3: true
        checkbox4: false
      .verifyChecked("#checkbox-1", true)
      .verifyChecked("#checkbox-2", false)
      .verifyChecked("#checkbox-3", true)
      .verifyChecked("#checkbox-4", false)

  describe "#submitForm", ->
    it "submits the form using the registerd submit button", ->
      page = Page.extend
        pageRoot: '/form.html'
        forms:
          textForm:
            context: "#text-form"
            submit: ".submit"
            inputs:
              term: "#term"
      .with Form

      context.Page.build()
      .redirectTo page
      .enterInformation "textForm",
        term: "Behance"
      .submitForm("textForm")
      .whenDisplayed ".success"
