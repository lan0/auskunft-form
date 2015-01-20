import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  address: DS.attr('string'),
  email: DS.attr('string'),
  auftraggeber: DS.attr('number'),
  additional_info: DS.attr('string'),
  identity: DS.attr('string'),

  additional_apps: DS.hasMany('application')
});
