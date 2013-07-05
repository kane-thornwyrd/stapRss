define([
  //Libraries
  'zepto',
  'underscore',
  'backbone',
  //Collections
  'app/collections/Widgets',
  //Templates
  'text!templates/home/homeTemplate.html',
], function($, _, Backbone, WidgetCollection, homeTemplate){

  var HomeView = Backbone.View.extend({
    el: $("body"),

    initialize: function(){
      this.collection = WidgetCollection;
      this.collection.fetch();
    },

    render: function(){
      this.collection.create();



      this.el.innerHTML = homeTemplate;
    }

  });

  return HomeView;

});
