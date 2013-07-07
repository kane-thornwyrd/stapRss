var StreamAggregatorView = Backbone.View.extend({

  template: templates['coverSlips/streamAggregator'],

  events: {
  "click .delete": "deleteItem",
  "click .edit": "editItem",
  "click .save": "saveItem",
  },

  initialize: function(){
    console.log('New StreamAggregatorView');
  },


  render: function(){
    var attributes = this.model.toJSON();
    this.$el.append(this.template(attributes));
    return this;
  },

  deleteItem: function(){
    this.model.destroy();
    this.remove();
  },

  editItem: function(){
    var attributes = this.model.toJSON();

    attributes.buttons = '';

    this.$el.html(this.template(attributes));
  },

  saveItem: function(){
    this.model.save({url: this.$('input.url').val()});
    this.$el.html(this.template(this.model.toJSON()));
  }
});
