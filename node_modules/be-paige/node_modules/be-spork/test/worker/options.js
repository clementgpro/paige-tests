process.on('message', function(data) {
  process.send(process.env.MY_KEY);
});
