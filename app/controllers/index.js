import Ember from 'ember';

export default Ember.ObjectController.extend({
  clients: [],
  applications: [],

  init: function() {
    this._super();
    var that = this;
    Ember.$.get('http://192.168.1.125:8000/auftraggeber', function(result) {
      that.set('clients', result);
    });
  },

  actions: {
    submit: function() {
      var model = this.get('model');
      // since this needs a redirection for the download, params have to be in
      // the url. $.param(DS.Model) exceeds max call stack size, hence the
      // weird workaround here.
      var param = Ember.$.param({
        name: model.get('name'),
        address: model.get('address'),
        email: model.get('email'),
        auftraggeber: model.get('auftraggeber'),
        additional_info: model.get('additional_info'),
        identity: model.get('identity'),
        relevant_apps: model.get('relevant_apps')
      });
      window.location = 'http://192.168.1.125:8000/generate?' + param;
    },
    select: function(value) {
      Ember.$.get('http://192.168.1.125:8000/applications',
        { auftraggeber: value },
        function(result) {
          this.set('applications', result);
        }.bind(this)
      );
    }
  }
});
