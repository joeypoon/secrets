var baseurl = "https://secrets-back-end.herokuapp.com";
var postsURL = baseurl + "/posts.json";
var usersURL = baseurl + "/users.json";
var loginURL = baseurl + "/login.json";

React.initializeTouchEvents(true);

var Post = React.createClass({

  render: function() {
    return (
    <div className="panel panel-info">
      <div className="panel-heading">
        <h3 className="panel-title">{this.props.username}</h3>
      </div>
      <div className="panel-body">
        {this.props.children}
      </div>
    </div>
    );
  }

});

var PostList = React.createClass({

  render: function() {
    var postNodes = this.props.posts.map(function(post) {
      return (
        <Post username={post.user.name}>
          {post.content}
        </Post>
      );
    });

    return (
      <div className="postList">
        {postNodes}
      </div>
    );
  }

});

var PostForm = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var content = React.findDOMNode(this.refs.content).value.trim();
    if (!content) {
      return;
    }
    this.props.onPostSubmit({post: {content: content}});
    React.findDOMNode(this.refs.content).value = '';
  },

  render: function() {
    return (
      <div className="modal fade" id="new-post-modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">New Whisper</h4>
            </div>
            <div className="modal-body" id="new-post-modal-body">
              <form className="postForm" id="whisper-form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label for="whisper">Whisper</label>
                  <textarea className="form-control" id="whisper" placeholder="share a secret..." rows="5" ref="content" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Whisper</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

var PostBox = React.createClass({

  getInitialState: function() {
    return {posts: []};
  },

  handlePostSubmit: function(post) {
    var posts = this.state.posts;
    var newPosts = posts.concat([post]);
    this.setState({post: newPosts});
    $.ajax({
      url: this.props.postsURL + "?token=" + sessionStorage.token,
      dataType: 'json',
      type: 'POST',
      data: post,
      success: function(posts) {
        this.setState({posts: posts});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.postsURL, status, err.toString());
      }.bind(this)
    });
    $('#new-post-modal').modal('hide');
  },

  loadPostsFromServer: function() {
    $.ajax({
      url: this.props.postsURL,
      dataType: 'json',
      cache: false,
      success: function(posts) {
        this.setState({posts: posts});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(postsURL, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.loadPostsFromServer();
    setInterval(this.loadPostsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <div className="postBox">
        <h1 className="page-header">Secrets</h1>
        <PostForm onPostSubmit={this.handlePostSubmit} />
        <div className="clearfix"></div>
        <PostList posts={this.state.posts} />
      </div>
    );
  }

});

var NavBar = React.createClass({

  render: function() {
    if(sessionStorage.token){
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a href="http://joeypoon.com/secrets/" className="navbar-brand">Secrets</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#" data-toggle="modal" data-target="#new-post-modal">New Post</a></li>
              <li><a href="#" id="logout">Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
    } else {
      return (
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a href="http://joeypoon.com/secrets/" className="navbar-brand">Secrets</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#" data-toggle="modal" data-target="#signup-modal">Sign Up</a></li>
                <li><a href="#" data-toggle="modal" data-target="#login-modal">Login</a></li>
              </ul>
            </div>
          </div>
        </nav>
      )
    }
  }

});

var LoginForm = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var email = React.findDOMNode(this.refs.email).value.trim();
    var password = React.findDOMNode(this.refs.password).value.trim();
    if (!email || !password) {
      return;
    }
    React.findDOMNode(this.refs.email).value = '';
    React.findDOMNode(this.refs.password).value = '';
    this.handleLoginSubmit({user:{email: email, password: password}});
  },

  handleLoginSubmit: function(loginInfo) {
    $.ajax({
      url: this.props.loginURL,
      dataType: 'json',
      type: 'POST',
      data: loginInfo,
      statusCode: {
        401: function() {
          $('#login-form-alert').html('Invalid email/password combination');
          $('#login-form-alert').show();
        }
      },
      success: function(user) {
        sessionStorage.setItem('token', user.token);
        renderNav();
        $('#login-modal').modal('hide');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.loginURL, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div className="modal fade" id="login-modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Login</h4>
            </div>
            <div className="modal-body" id="login-modal-body">
              <form className="loginForm" onSubmit={this.handleSubmit}>
                <div className="alert alert-danger" id="login-form-alert"></div>
                <div className="form-group">
                  <label for="email">Email</label>
                  <input type="email" className="form-control" id="email" ref="email" required />
                </div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input type="password" className="form-control" id="password" ref="password" required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

var SignUpForm = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var email = React.findDOMNode(this.refs.email).value.trim();
    var password = React.findDOMNode(this.refs.password).value.trim();
    var password_confirmation = React.findDOMNode(this.refs.password_confirmation).value.trim();
    if (!email || !password) {
      return;
    } else if (password != password_confirmation) {
      $('#signup-form-alert').html('Passwords must match');
      $('#signup-form-alert').show();
      return;
    }
    React.findDOMNode(this.refs.email).value = '';
    React.findDOMNode(this.refs.password).value = '';
    React.findDOMNode(this.refs.password_confirmation).value = '';
    this.handleLoginSubmit({user:{email: email, password: password, password_confirmation: password_confirmation}});
  },

  handleLoginSubmit: function(loginInfo) {
    $.ajax({
      url: this.props.signupURL,
      dataType: 'json',
      type: 'POST',
      data: loginInfo,
      statusCode: {
        422: function() {
          $('#signup-form-alert').html('Email is taken');
          $('#signup-form-alert').show();
        }
      },
      success: function(user) {
        sessionStorage.setItem('token', user.token);
        $('#signup-modal').modal('hide');
        renderNav();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.signupURL, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div className="modal fade" id="signup-modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Sign Up</h4>
            </div>
            <div className="modal-body" id="signup-modal-body">
              <form className="signUpForm" onSubmit={this.handleSubmit}>
                <div className="alert alert-danger" id="signup-form-alert"></div>
                <div className="form-group">
                  <label for="email">Email</label>
                  <input type="email" className="form-control" id="email" ref="email" required />
                </div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input type="password" className="form-control" id="password" ref="password" required />
                </div>
                <div className="form-group">
                  <label for="password-confirmation">Password Confirmation</label>
                  <input type="password" className="form-control" id="password-confirmation" ref="password_confirmation" required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Start whispering...</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

var renderNav = function() {
  React.render(
    <NavBar />,
    document.getElementById('nav')
  );
}

React.render(
  <PostBox postsURL={postsURL} pollInterval={120000} />,
  document.getElementById('content')
);

React.render(
  <LoginForm loginURL={loginURL} />,
  document.getElementById('login')
);

React.render(
  <SignUpForm signupURL={usersURL} />,
  document.getElementById('signup')
);

renderNav();

$(document).ready(function() {
  $('#logout').on('click', function(e){
    e.preventDefault();
    sessionStorage.removeItem('token');
    renderNav();
  });

  $('#signup-form-alert').hide();

  $('#login-form-alert').hide();

});
