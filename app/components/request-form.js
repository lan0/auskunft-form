import Ember from 'ember';

// Ember component for a form
//
// usage: {{request-form
//          model=model             (required)
//          submitAction=action     (default "submit")
//          selectAction=action     (default "select")
//          clients=list
//        }}
export default Ember.Component.extend({
  model: null,
  submitAction: 'submit',
  selectAction: 'select',
  clients: [],
  selectedApps: [],
  applications: [],
  identities: [{id: 'AUSWEIS', name: 'Kopie eines amtlichen Lichtbildausweises'},
               {id: 'MELDEZE', name: 'Kopie eines aktuellen Meldezettels'}],

  updateApps: function() {
    if (this.get('model').get('auftraggeber') !== null) {
      this.sendAction('selectAction', this.get('model').get('auftraggeber'));
    }
  }.observes('model.auftraggeber'),

  submit: function() {
    var model = this.get('model');
    if(! model.get('isValid')) {
      return false;
    }
    if(this.get('selectedApps')) {
      var relevant = [];
      this.get('selectedApps').forEach(function (item) {
        relevant.push(item.id);
      });
      model.set('relevant_apps', relevant);
    }
    this.sendAction('submitAction');
  }
});
