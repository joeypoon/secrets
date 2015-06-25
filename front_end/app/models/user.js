import DS from 'ember-data';

export default DS.Model.extend({

  name: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  password_confirmation: DS.attr('string'),
  token: DS.attr('string')

});
