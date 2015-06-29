import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return $.getJSON("http://secrets-back-end.herokuapp.com/posts.json");
  },

  actions: {
    newPost: function () {
      $.post("http://secrets-back-end.herokuapp.com/posts.json?token=" + sessionStorage.token, { post: { content: $('#whisper').val() } } ).done((data) => {
      })
    }
  }

});
