//= require Models/coverSlipType

var CoverSlipsTypesCollection = Backbone.Collection.extend({
  model: CoverSlipTypeModel,

  toDialogButton: function(options){
    return this.map(
      function(model){
        return model.toDialogButton(options);
      }
    );
  }
});
