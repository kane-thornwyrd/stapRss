define([
  'zepto',
  'underscore',
  'backbone',
], function($, _, Backbone) {
  var WidgetModel = Backbone.Model.extend({

    defaults: function() {
      return {
        coordinates : null,
        width       : null,
        settings    : null,
        activated   : false,
        type        : null
      };
    },

    initialize: function() {
    },

    clear: function() {
      this.destroy();
      this.view.remove();
    },

    toggle: function() {
      this.save({activated: !this.get("activated")});
    }

  });
  return WidgetModel;
});
