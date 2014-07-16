bescribe = require "../bescribe"
fs = require "fs"
sauce = JSON.parse(fs.readFileSync("./sauce-config.json"))

config =
  address: "http://localhost:8282"
  webdriver:
    address: "http://ondemand.saucelabs.com/wd/hub"
    config:
      platform: "MAC"
      browserName: "firefox"
      javascriptEnabled: true
      username: sauce.username
      accessKey: sauce.accessKey

bescribe "Sauce Labs", config, (context, describe, it) ->
  it.skip "can connect", ->
    context.Page.build()
    .open("http://www.google.com")
    .whenDisplayed('#lga')
