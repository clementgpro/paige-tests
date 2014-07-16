var Pool = require('../lib/pool'),
    expect = require('chai').expect;

describe('Pool', function() {
  it('is instantiable', function() {
    expect(new Pool(process.cwd() + '/test/worker/message.js')).to.not.equal(null);
  });

  describe('children', function() {
    it('sends messages to the parent', function(done) {
      var pool = new Pool(process.cwd() + '/test/worker/message.js');

      pool.push('ping', function(error, message) {
        expect(message.stdout).to.equal('pong');
        done();
      });
    });

    it('receives args from the parent', function(done) {
      var pool = new Pool(process.cwd() + '/test/worker/args.js', ['my_arg']);

      pool.push('', function(error, message) {
        expect(message.stdout[0]).to.equal('my_arg');
        done();
      });
    });

    it('is configured with options from the parent', function(done) {
      var pool = new Pool(process.cwd() + '/test/worker/options.js', null, { env: { MY_KEY: 'an option' } });

      pool.push('', function(error, message) {
        expect(message.stdout).to.equal('an option');
        done();
      });
    });
  });

});
