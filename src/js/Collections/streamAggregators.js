//= require Models/streamAggregator

var storeVar = localStorage.getItem('streamAggregators');

var StreamAggregatorsCollection = Backbone.Collection.extend({
  model: StreamAggregatorModel,
  localstorage: new Store('streamAggregators')
});
