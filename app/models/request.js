import DS from 'ember-data';
import EmberValidations from 'ember-validations';

var Request = DS.Model.extend(EmberValidations.Mixin, {
  name: DS.attr('string'),
  address: DS.attr('string'),
  email: DS.attr('string'),
  auftraggeber: DS.attr('number'),
  additional_info: DS.attr('string'),
  identity: DS.attr('string')
});

Request.reopen({
  validations: {
    name: {
      presence: true,
      length: { minimum: 3 }
    },
    address: {
      presence: true,
      length: { minimum: 5 }
    },
    auftraggeber: {
      presence: true
    },
    email: {
      presence: true,
      length: { minimum: 5 },
      // http://stackoverflow.com/a/46181
      format: {
        with: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      }
    },
    identity: {
      presence: true
    }
  }
});

export default Request;