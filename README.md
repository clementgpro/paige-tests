Glassful-Paige-Tests
=====================
Functionnal tests on the web application Glassful.

# Installation
- Download [selenium-server](http://www.seleniumhq.org/download/)
- Then `package.json` will do the work for you :).

```
$ npm install
```

# Usage

It mainly uses 
- [Be-paige](https://github.com/behance/Paige)
- [Mocha](http://visionmedia.github.io/mocha/)
- [Chai](http://chaijs.com/)

To run paige tests, 
- open a first console and run `$ java  -jar /your/path/to/selenium-server-standalone-2.42.2.jar`
- then open an anther console and run `$ npm test`. The reports of the tests are write in reports/test-reports.xml
