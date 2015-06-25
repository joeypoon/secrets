import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return $.getJSON("http://localhost:3000/posts.json");
  },

  actions: {
    newPost: function () {
      $.post( "http://localhost:3000/posts.json?token=025c4485d1f4710a", { post: { content: $('#whisper').val() } } );
    }
  }

});
