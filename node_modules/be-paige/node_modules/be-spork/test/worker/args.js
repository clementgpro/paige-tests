var args = process.argv.slice(2);

process.on('message', function(data) {
  process.send(args);
});
