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

var posts = [
  {
    content: "This is some content",
    user: {
      id: 1,
      name: "bunnies12af"
    }
  },
  {
    content: "This is some more content",
    user: {
      id: 2,
      name: "kittens12af"
    }
  }
]

React.render(
  <PostList posts={posts} />,
  document.getElementById('content')
);
