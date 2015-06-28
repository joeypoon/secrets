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
      <form className="postForm col-md-6" id="whisper-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label for="whisper">Whisper</label>
          <textarea className="form-control" id="whisper" placeholder="share a secret..." rows="5" ref="content"></textarea>
        </div>
        <button type="submit" className="btn btn-primary btn-block">Whisper</button>
      </form>
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
    console.log(this.state.token);
    $.ajax({
      url: "http://localhost:3000/posts.json?token=" + sessionStorage.token,
      dataType: 'json',
      type: 'POST',
      data: post,
      success: function(posts) {
        this.setState({posts: posts});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(postsURL, status, err.toString());
      }.bind(this)
    });
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
            <a href="#" className="navbar-brand">Secrets</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">New Post</a></li>
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
              <a href="#" className="navbar-brand">Secrets</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">Sign Up</a></li>
                <li><a href="" data-toggle="modal" data-target="#login-modal">Login</a></li>
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
    var email = React.findDOMNode(this.refs.email).value.trim();
    var password = React.findDOMNode(this.refs.password).value.trim();
    this.handleLoginSubmit({user:{email: email, password: password}});
  },

  handleLoginSubmit: function(loginInfo) {
    $.ajax({
      url: this.props.loginURL,
      dataType: 'json',
      type: 'POST',
      data: loginInfo,
      success: function(user) {
        sessionStorage.setItem('token', user.token);
        $('#login-modal').modal('hide');
        renderNav();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.loginURL, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <form className="loginForm" onSubmit={this.handleSubmit}>
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
  <PostBox postsURL="http://localhost:3000/posts.json" pollInterval={100000} />,
  document.getElementById('content')
);

React.render(
  <LoginForm loginURL="http://localhost:3000/login.json" />,
  document.getElementById('login-modal-body')
);

renderNav();

$(document).ready(function() {
  $('#logout').on('click', function(e){
    e.preventDefault();
    sessionStorage.removeItem('token');
    renderNav();
  })
})
