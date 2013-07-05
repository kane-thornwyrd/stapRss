define([
  'zepto',
  'underscore',
  'backbone',
  'app/models/Widget',
  'localstorage'
], function($, _, Backbone, WidgetModel) {
  var WidgetCollection = Backbone.Collection.extend({

    model: function(attrs, options){
      console.log(arguments);
      return new WidgetModel(attrs, options);
    },

    localStorage: new Backbone.LocalStorage("Widgets"),

    activateds: function(){
      return this.filter(function(widget){
        return widget.get('activated');
      });
    },

    inactivateds: function(){
      return this.without.apply(this, this.activateds());
    }
  });

  return new WidgetCollection();
});
