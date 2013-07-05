define([
  "zepto",
  "underscore",
  "backbone",
  "app/views/home/HomeView",
  "app/views/widgets/WidgetView",
  "app/views/configurationView",
], function($, _, Backbone, HomeView, WidgetView, configurationView) {

  var AppRouter = Backbone.Router.extend({
    routes: {
      // Default
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(){

    var app_router = new AppRouter;

    app_router.on('route:defaultAction', function (actions) {
      var homeView = new HomeView();
      homeView.render();
    });


    Backbone.history.start();
  };

  return {
    initialize: initialize
  };

});
