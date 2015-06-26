import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    newUser: function() {
      $.post( "http://localhost:3000/users.json", { user: { email: $('#email').val(), password: $('#password').val(), password_confirmation: $('#password_confirmation').val() } } );
    },

    login: function() {
      var data = {
        user: {
          email: $('#email').val(),
          password: $('#password').val()
        }
      }

      $.post( "http://localhost:3000/login.json", data).done((data) => {
          this.store.push('user', this.store.normalize('user', data));
          this.transitionTo('posts.newPost')
      })
    }

  }

});
