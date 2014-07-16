compose = if process.env.LCOV then require "../../lib-cov/utils/compose" else require "../../lib/utils/compose"
{expect} = require "chai"

describe "lib/utils/compose", ->
  describe "given components", ->
    form =
      selectors:
        textInput: "#some-text-input"
        button: "#some-button"
      enterInformation: ->
      submitForm: ->

    it "merges with selector-less component", ->
      signup =
        checkErrors: ->
      simpleForm = compose form, signup

      expect(simpleForm.enterInformation).to.equal form.enterInformation
      expect(simpleForm.submitForm).to.equal form.submitForm
      expect(simpleForm.checkErrors).to.equal signup.checkErrors
      expect(simpleForm.selectors).to.have.keys(["textInput", "button"])

    it "merges with an empty selector component", ->
      signup =
        selectors: {}
        checkErrors: ->
      simpleForm = compose form, signup

      expect(simpleForm.enterInformation).to.equal form.enterInformation
      expect(simpleForm.submitForm).to.equal form.submitForm
      expect(simpleForm.checkErrors).to.equal signup.checkErrors
      expect(simpleForm.selectors).to.have.keys(["textInput", "button"])

    it "merges with one component", ->
      simpleForm = compose form

      expect(simpleForm.enterInformation).to.equal form.enterInformation
      expect(simpleForm.submitForm).to.equal form.submitForm
      expect(simpleForm.selectors).to.have.keys(["textInput", "button"])

    it "merges with multiple non-overlapping components", ->
      selectmenu =
        selectors:
          menu: "#my-menu"
      compositeForm = compose form, selectmenu

      expect(compositeForm.enterInformation).to.equal form.enterInformation
      expect(compositeForm.submitForm).to.equal form.submitForm
      expect(compositeForm.selectors).to.have.keys(["textInput", "button", "menu"])

    it "merges with multiple overlapping components", ->
      selectmenu =
        selectors:
          menu: "#my-menu"
          textInput: "#overridden-input"
      overriddenCompositeForm = compose form, selectmenu

      expect(overriddenCompositeForm.enterInformation).to.equal form.enterInformation
      expect(overriddenCompositeForm.submitForm).to.equal form.submitForm
      expect(overriddenCompositeForm.selectors).to.have.keys(["textInput", "button", "menu"])
      expect(overriddenCompositeForm.selectors.textInput).to.equal(selectmenu.selectors.textInput)
