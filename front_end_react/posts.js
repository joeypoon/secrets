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

  loadPostsFromServer: function() {
    $.ajax({
      url: "http://localhost:3000/posts.json",
      dataType: 'json',
      cache: false,
      success: function(posts) {
        this.setState({posts: posts});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
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
        <PostForm />
        <div className="clearfix"></div>
        <PostList posts={this.state.posts} />
      </div>
    );
  }

});

React.render(
  <PostBox pollInterval={10000} />,
  document.getElementById('content')
);
