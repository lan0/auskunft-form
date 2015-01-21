import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('request-form', 'RequestFormComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
  needs: ['component:em-form', 'component:em-input', 'template:components/em-form-group',
    'template:components/formgroup/form-group', 'component:em-form-label',
    'template:components/formgroup/form-group-control', 'component:em-text',
    'component:em-select', 'component:multiselect-checkboxes']
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});

test('it sets the provided input on the model', function() {
  expect(4);

  var component = this.subject();
  component.set('model', Ember.Object.create());

  var $component = this.append();

  Ember.run(function() {
    $component.find('input#name').val('Simpson');
    $component.find('textarea#address').val('Evergreen Terrace');
    $component.find('input#email').val('test@example.com');
    $component.find('textarea#additional_info').val('Some information');

    $component.find('input').change();
    $component.find('textarea').change();

    equal(component.get('model').get('name'), 'Simpson');
    equal(component.get('model').get('address'), 'Evergreen Terrace');
    equal(component.get('model').get('email'), 'test@example.com');
    equal(component.get('model').get('additional_info'), 'Some information');
  });
});

test('it sends the correct action on submit', function() {
  expect(6);

  var clients = [
    {id: 1, name: 'ACME Ltd.'},
    {id: 2, name: 'Blue Sun'}
  ];

  var identities = [
    {id: 'WAYNE', name: 'Bruce Wayne'},
    {id: 'DUCK', name: 'Darkwing Duck'}
  ];

  var component = this.subject();
  component.set('model', Ember.Object.create({
    isValid: function () {
      return true;
    }
  }));
  component.set('clients', clients);
  component.set('identities', identities);

  var $component = this.append();

  var targetObject = {
    download: function(object) {
      equal(object.get('name'), 'Simpson');
      equal(object.get('address'), 'Evergreen Terrace');
      equal(object.get('email'), 'test@example.com');
      equal(object.get('additional_info'), 'Some information');
      equal(object.get('auftraggeber'), 2);
      equal(object.get('identity'), 'DUCK');
    },
    select: function() {}
  };

  component.set('submitAction', 'download');
  component.set('targetObject', targetObject);

  Ember.run(function() {
    $component.find('input#name').val('Simpson');
    $component.find('textarea#address').val('Evergreen Terrace');
    $component.find('input#email').val('test@example.com');
    $component.find('textarea#additional_info').val('Some information');
    $component.find('select').first().val(2);
    $component.find('select').last().val('DUCK');

    $component.find('input').change();
    $component.find('textarea').change();
    $component.find('select').change();

    $component.find('button[type=submit]').click();
  });
});

test('it renders the clients', function() {
  expect(2);

  var clients = [
    {id: 1, name: 'ACME Ltd.'},
    {id: 2, name: 'Blue Sun'}
  ];

  var component = this.subject();
  component.set('clients', clients);

  var $component = this.append();

  Ember.run(function() {
    equal($component.find('option[value=1]').text(), 'ACME Ltd.');
    equal($component.find('option[value=2]').text(), 'Blue Sun');
  });
});

test('it sends an action on client select', function() {
  expect(1);

  var clients = [
    {id: 1, name: 'ACME Ltd.'},
    {id: 2, name: 'Blue Sun'}
  ];

  var component = this.subject();
  component.set('clients', clients);
  component.set('model', Ember.Object.create());

  var $component = this.append();

  var targetObject = {
    selected: function(value) {
      equal(value, 2);
    }
  };

  component.set('selectAction', 'selected');
  component.set('targetObject', targetObject);

  Ember.run(function() {
    $component.find('select').first().val('2');
    $component.find('select').change();
  });
});

test('it renders the applications', function() {
  expect(2);

  var apps = [
    {id: 1, description: 'An app.'},
    {id: 2, description: 'Another one.'}
  ];

  var component = this.subject();

  var $component = this.append();

  Ember.run(function() { component.set('applications', apps); });

  Ember.run(function() {
    console.log($component.find('li').first().parent().html());
    equal($component.find('li').first().text(), 'An app.');
    equal($component.find('li').last().text(), 'Another one.');
  });
});