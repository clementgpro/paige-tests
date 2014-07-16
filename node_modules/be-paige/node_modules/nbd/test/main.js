require.onError=function(err) {
  throw new Error([err.requireType, err.requireModules].join(' '));
};
require({
  baseUrl: '/base',
  paths: {
    'real' : '.',
    'nbd' : 'test/specs'
  },
  deps: [
    'test/lib/es5-shim'
  ]
}, ['build/all'], window.__karma__.start);
