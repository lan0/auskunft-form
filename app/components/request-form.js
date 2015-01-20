import Ember from 'ember';

// Ember component for a form
//
// usage: {{request-form
//          model=request model     (required)
//        }}
export default Ember.Component.extend({
  model: null,

  _init: function() {
    console.log('component loaded');
  }
});
