import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('request', 'Request', {
  // Specify the other units that are required for this test.
  needs: ['model:application']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
