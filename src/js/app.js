/*
  //Libs

  = require underscore/underscore
  = require backbone/backbone
  = require backbone.localstorage/backbone.localStorage
  = require jade/runtime
  = require helpers
  = require wording
  = require templates
*/

// require Collections/subscriptions
// require Views/subscription
//= require Collections/coverSlipsTypes
//= require Views/streamAggregator

var StapRssView = Backbone.View.extend({
  t: i18n(),
  events: {
      "click #add-coverSlip button": "addCoverSlipDialogOpen"
  },
  initialize: function(){
    this.t = this.options.t || this.t;

    // MENY START
    this.menyConf = {
        menuElement: this.$( '.meny' )[0],
        contentsElement: this.$( '.content' )[0],
        width: 64,
        position: 'left',
        threshold: 20,
        overlap: 6,
        mouse: true,
        touch: true
    };
    // MENY END

    //ADD COVERSLIP START
    this.coverSlipTypesCollection = new CoverSlipsTypesCollection([
      {name: 'streamAggregator',icon: "ui-icon-signal-diag"},
      {name: 'clock',icon: "ui-icon-clock"},
      {name: 'image',icon: "ui-icon-image"},
    ]);

    this.addCoverSlipConf = {
      button: {
        template: templates['forms/addCoverSlipButton'],
        data: { add:this.t('add').ucfirst() }
      },
      dialog: {
        template: templates['forms/addCoverSlipDialog'],
        data: {
          hint: this.t('Choose which kind of Cover Slip you want to add.'),
          hint2: this.t('You can close this dialog by pressing the ESC key on your keyboard.')
        },
        autoOpen: false,
        draggable: false,
        resizable: false,
        title: this.t('addNewCoverSlip').ucfirst(),
        width: 'auto',
        height: 'auto',
        modal: true,
        closeOnEscape: true,
        closeText: null,
        show: {
          effect: "explode",
          duration: 200
        },
        hide: {
          effect: "explode",
          duration: 100
        },
        appendTo: this.$el,
        buttons: this.coverSlipTypesCollection.toDialogButton({
          t: this.t,
          click: {
            callback: this.addCoverSlipCallbackFactory,
            context: this
          }
        })
      }
    };
    //ADD COVER SLIP END

    return this;
  },

  render: function(){
    this.Meny = Meny.create(this.menyConf);
    this.Meny.arrow = (function(options){
      var
        arrow = document.createElement('span'),
        parentDiv = options.menuElement.parentNode
      ;
      arrow.className = 'meny-arrow meny-arrow-'+options.position;
      return parentDiv.insertBefore(arrow, options.menuElement.nextSibling);
    })(this.menyConf);


    this.$('.content').append(
      this.addCoverSlipConf.button.template(this.addCoverSlipConf.button.data)
    );
    this.addTileForm = $(
      this.addCoverSlipConf.dialog.template(this.addCoverSlipConf.dialog.data)
    ).dialog(this.addCoverSlipConf.dialog);

    return this;
  },

  addCoverSlipDialogOpen: function(){
    this.addTileForm.dialog( "open" );
  },

  addCoverSlipCallbackFactory: function(type, obj){
    return function(event){
      this[type] = new window[(type + 'View').ucfirst()]({
        el: this.$el
      });
      $(this).dialog('close');
    };
  },

  // ToDo Backbone Router that destroy+relaunch the whole app.
  // changeLocal: function(newLocal){
  //   this.initialize({t:i18n(newLocal)}).render();
  //   return this;
  // }
});

var StapRss = new StapRssView({
  t: i18n('fr'),
  el: $('#StapRss')
});

StapRss.render();
