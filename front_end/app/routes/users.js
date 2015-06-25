import Ember from 'ember';


export default Ember.Route.extend({

  actions: {
    newUser: function () {
      $.post( "http://localhost:3000/users.json", { user: { email: $('#email').val(), password: $('#password').val(), password_confirmation: $('#password_confirmation').val() } } );
    }
  }

});
