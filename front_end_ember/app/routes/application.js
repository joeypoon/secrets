import Ember from 'ember';

export default Ember.Route.extend({

  session: false,

  actions: {

    login: function() {
      var data = {
        user: {
          email: $('#email').val(),
          password: $('#password').val()
        }
      }

      $.post("http://secrets-back-end.herokuapp.com/login.json", data).done((data) => {
          sessionStorage.setItem('token', data.token);
          this.session = true;
          this.transitionTo('posts')
      })
    },

    logout: function() {
      sessionStorage.removeItem('token');
      this.session = false;
    }
  }
});
