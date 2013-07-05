define([
  'zepto',
  'underscore',
  'backbone',
], function($, _, Backbone) {
  var WidgetTypeModel = Backbone.Model.extend({

    defaults: function() {
      return {
        name            : "",
        defaultSettings : {}
      };
    },

    initialize: function() {
      if (!this.get("title")) {
        this.set({"title": this.defaults().title});
      }
    },

    clear: function() {
      this.destroy();
      this.view.remove();
    },

    toggle: function() {
      this.save({activated: !this.get("activated")});
    }

  });
  return WidgetTypeModel;
});
