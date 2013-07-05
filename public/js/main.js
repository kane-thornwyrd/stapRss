require.config({
  baseUrl: 'node_modules',
  shim: {
    'zepto'      : {
      exports    : '$'
    },
    'backbone'   : {
        deps     : ['underscore', 'zepto'],
        exports  : 'Backbone'
    },
    'underscore' : {
        exports  : '_'
    },
  },
  paths: {
    zepto        : 'zepto/zepto.min',
    underscore   : 'underscore/underscore-min',
    backbone     : 'backbone/backbone-min',
    localstorage : '../public/js/vendor/backbone.localStorage-min',
    app          : '../public/js',
    templates    : '../public/templates',
    text         : '../public/js/vendor/text'
  }
});


require([
  "app/app"
], function(app) {
  app.initialize();
});
