var StreamAggregatorModel = Backbone.Model.extend({
  defaults: {
    title: false,
    lastUpdate: null,
    url: ''
  },

  initialize: function(){
    console.log('new streamAggregator');
    this.on("change:url", function(model){
      console.log('URL Changed', model);
    });
  }
});
