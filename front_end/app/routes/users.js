import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    newUser: function() {
      $.post( "http://localhost:3000/users.json", { user: { email: $('#email').val(), password: $('#password').val(), password_confirmation: $('#password_confirmation').val() } } );
    },

    login: function() {
      reponse = $.post( "http://localhost:3000/login.json", { user: { email: $('#email').val(), password: $('#password').val() } })
      .done(function(data) {
        if (data) {
          //save token for session
        }
      });
    }

  }

});
