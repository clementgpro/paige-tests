function lookupFillIn(obj, type) {
  var pascalCaseType = type.replace(/\w\S*/g, function(word) {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      }).replace(/\s+/g, ''),
      fillInFunc = obj['fillIn' + pascalCaseType];

  if (!fillInFunc) {
    throw new Error('There is no function "fillIn' + pascalCaseType + '" for type "' + type + '"');
  }

  return fillInFunc;
}

// Common component for filling in and submitting forms
//
// Currently is restricted to filling in simple inputs.
var Form = {
  /**
   * The `forms` map defines the selectors for the various forms on
   * a given page. The first level keys are the short names for the
   * forms (which can be passed to `enterInformation` and `submitForm`.
   * Each of these inner maps have two keys: context - the selector for
   * the form itself, and inputs - the selector map for the inputs in the
   * given form.
   *
   * Example
   * ==============================================================
   * forms: {
   *   signup: {
   *     context: "#gbqf",
   *     submit: "[name=btnG]",
   *     inputs: {
   *       search: "[name=q]"
   *     }
   *   }
   * }
   */
  forms: {},

  enterInformation: function(formKey, data) {
    if (!(this.forms && this.forms[formKey])) {
      throw new Error('The page does not have a form defined for "' + formKey +'"');
    }

    var form = this.forms[formKey],
        $form = this.find(form.context);

    Object.keys(data).forEach(function(dataKey) {
      var input = form.inputs[dataKey];

      if (!input) {
        throw new Error('"' + form + '" has no key defined for "' + dataKey + '"');
      }

      if (typeof input === 'string') {
        input = { selector: input, type: 'text' };
      }

      lookupFillIn(this, input.type).call(this, $form, input.selector, data[dataKey]);
    }.bind(this));

    return this;
  },

  submitForm: function(formKey) {
    if (!(this.forms && this.forms[formKey])) {
      throw new Error('The page does not have a form defined for "' + formKey +'"');
    }

    var form = this.forms[formKey],
        $form = this.find(form.context);

    $form.find(this.forms[formKey].submit).click();
    return this;
  },

  // Default fill in functions for common input types
  // <input type="text"></input>
  fillInText: function($form, selector, data) {
    this.whenDisplayed(selector).then(function() {
      $form.find(selector).clear();
      $form.find(selector).sendKeys('');
      $form.find(selector).sendKeys(data);
    });
  },

  // <input type="select">
  //   <options value="1">1</options>
  //   <options value="2">2</options>
  //   <options value="3">3</options>
  // </input>
  fillInSelect: function($form, selector, data) {
    this.whenDisplayed(selector).then(function() {
      $form.find(selector + ' [value="' + data + '"]').click();
    });
  },

  // <input type="checkbox"></input>
  fillInCheckbox: function($form, selector, data) {
    this.whenDisplayed(selector).then(function() {

      if (typeof data === 'string') {
        $form.find(selector + '[value="' + data + '"]').click();
      }
      else if (typeof data === 'boolean') {
        $form.find(selector).isSelected().then(function (selected) {
          if (selected !== data) {
            $form.find(selector).click();
          }
        });
      }
    });
  },

  // <input type="radio"></input>
  fillInRadio: function($form, selector, data) {
    this.whenDisplayed(selector).then(function() {
      $form.find(selector + '[value="' + data + '"]').click();
    });
  }
};

module.exports = Form;
