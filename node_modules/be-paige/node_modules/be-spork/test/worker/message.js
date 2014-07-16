process.on('message', function(data) {
  process.send('pong');
});
