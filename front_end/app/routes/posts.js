import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return $.getJSON("http://localhost:3000/posts.json");
  },

  actions: {
    newPost: function () {
      $.post( "http://localhost:3000/posts.json?token=" + this.store.token, { post: { content: $('#whisper').val() } } );
    }
  }

});
