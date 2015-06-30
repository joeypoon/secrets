import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login', { path: '/login' });
  this.route('logout', { path: '/logout' });

  this.resource('posts', { path: '/' }, function(){
    this.route('newPost', { path: '/posts/new' });
  });

  this.resource('users', function(){
    this.route('newUser');
  });
});

export default Router;
