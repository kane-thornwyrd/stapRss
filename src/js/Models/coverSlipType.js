var CoverSlipTypeModel = Backbone.Model.extend({
  defaults: {
    name: 'Untilted',
    icon: '',
    viewName: ''
  },

  initialize: function(){
  },

  toDialogButton: function(options){
    var JSON = this.toJSON(options);
    return {
      text: options.t(JSON.name).ucfirst(),
      icons: { primary: JSON.icon },
      click: options.click.callback.call(options.click.context,JSON.name, this)
    };
  }
});
