var MyTestPage = require('./File.js');

MyTestPage.Page.build()
  .redirectTo(MyTestPage)
  .enterEmail('clement.guet@gmail.com');