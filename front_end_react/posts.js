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
      <form className="postForm col-md-6" idName="whisper-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label for="whisper">Whisper</label>
          <textarea className="form-control" idName="whisper" placeholder="share a secret..." rows="5" ref="content"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Whisper</button>
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
    $.ajax({
      url: "http://localhost:3000/posts.json?token=4012c9e1c0c04bb0",
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

React.render(
  <PostBox usersURL="http://localhost:3000/users.json" postsURL="http://localhost:3000/posts.json" pollInterval={10000} />,
  document.getElementById('content')
);
