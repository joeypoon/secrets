import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    newUser: function() {
      $.post("http://secrets-back-end.herokuapp.com/users.json", { user: { email: $('#email').val(), password: $('#password').val(), password_confirmation: $('#password_confirmation').val() } } ).done(data, function() {
        sessionStorage.setItem('token', data.token);
      });
    },

    logout: function() {
      sessionStorage.removeItem('token');
    },

    login: function() {
      var data = {
        user: {
          email: $('#email').val(),
          password: $('#password').val()
        }
      }

      $.post("http://secrets-back-end.herokuapp.com/login.json", data).done((data) => {
          sessionStorage.setItem('token', data.token);
          this.transitionTo('posts.newPost')
      })
    }

  }

});
