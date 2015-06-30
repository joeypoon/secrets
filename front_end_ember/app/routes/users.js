import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    newUser: function() {
      $.post("http://secrets-back-end.herokuapp.com/users.json", { user: { email: $('#email').val(), password: $('#password').val(), password_confirmation: $('#password_confirmation').val() } } ).done(data, function() {
        this.store.createRecord('session', data);
        sessionStorage.setItem('token', data.token);
        this.session = true;
      });
    }

  }

});
