import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('request-form', 'RequestFormComponent', {
  needs: [
    // ember-idx-form components & templates
    'component:em-form', 'component:em-input', 'component:em-select', 'component:em-text', 'component:em-form-label', 'template:components/em-form-group', 'template:components/formgroup/form-group', 'template:components/formgroup/form-group-control',
    // ember-multiselect-checkboxes components & templates
    'component:multiselect-checkbox-option', 'template:components/multiselect-checkbox-option', 'template:components/multiselect-checkboxes'
  ]
});

var clients = [
  {id: 1, name: 'ACME Ltd.'},
  {id: 2, name: 'Blue Sun'}
];

var apps = [
  {id: 1, description: 'An app.'},
  {id: 2, description: 'Another one.'}
];

var identities = [
  {id: 'WAYNE', name: 'Bruce Wayne'},
  {id: 'DUCK', name: 'Darkwing Duck'}
];

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});

test('it renders the clients', function() {
  expect(2);

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
    $component.find('select').first().val(2);
    $component.find('select').change();
  });
});

test('it renders the applications', function() {
  expect(2);

  var component = this.subject();

  var $component = this.append();

  Ember.run(function() {
    component.set('applications', apps);
  });

  Ember.run(function() {
    equal($component.find('li:first').text().trim(), 'An app.');
    equal($component.find('li:last').text().trim(), 'Another one.');
  });
});

test('it sends the correct action on submit', function() {
  expect(1);

  var component = this.subject();
  component.set('model', Ember.Object.create({
    isValid: function () {
      return true;
    }
  }));

  var $component = this.append();

  var targetObject = {
    submit: function() {
      ok(true);
    }
  };

  component.set('targetObject', targetObject);

  Ember.run(function() {
    $component.find('button[type=submit]').click();
  });
});

test('it sets the provided input on the model after submit', function() {
  expect(7);

  var component = this.subject();
  component.set('model', Ember.Object.create({
    isValid: function () {
      return true;
    }
  }));

  var targetObject = {
    submit: function() {
      equal(component.get('model').get('name'), 'Simpson');
      equal(component.get('model').get('address'), 'Evergreen Terrace');
      equal(component.get('model').get('email'), 'test@example.com');
      equal(component.get('model').get('additional_info'), 'Some information');
      equal(component.get('model').get('auftraggeber'), '2');
      equal(component.get('model').get('identity'), 'DUCK');
      deepEqual(component.get('model').get('relevant_apps'), [1,2]);
    },
    selected: function() {
      component.set('applications', apps);
    }
  };

  component.set('selectAction', 'selected');
  component.set('targetObject', targetObject);

  var $component = this.append();

  Ember.run(function() {
    component.set('clients', clients);
    component.set('identities', identities);
  });

  Ember.run(function() {
    $component.find('select:first').val(2);
    $component.find('select:last').val('DUCK');
    $component.find('select').change();

    $component.find('input#name').val('Simpson');
    $component.find('textarea#address').val('Evergreen Terrace');
    $component.find('input#email').val('test@example.com');
    $component.find('textarea#additional_info').val('Some information');
    $component.find('input[type=checkbox]').prop('checked', true);

    $component.find('input').change();
    $component.find('textarea').change();

    $component.find('button[type=submit]').click();
  });
});