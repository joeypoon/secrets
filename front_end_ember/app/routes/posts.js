import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return $.getJSON("http://localhost:3000/posts.json");
  },

  actions: {
    newPost: function () {
      var x = this.store.all('user')
      var user = null
      x.forEach((value) => {
        user = value.toJSON()
      })
      $.post( `http://localhost:3000/posts.json?token=${user.token}`, { post: { content: $('#whisper').val() } } ).done((data) => {
          window.location.reload(true);
      })
    }
  }

});
