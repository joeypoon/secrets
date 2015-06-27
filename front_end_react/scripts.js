var Post = React.createClass({

  render: function() {
    return (
    <div className="panel panel-info">
      <div className="panel-heading">
        <h3 className="panel-title">{this.props.post.user.name}</h3>
      </div>
      <div className="panel-body">
        {this.props.post.content}
      </div>
    </div>
    );
  }

});

// var PostList = React.createClass({
//
//   render: function() {
//
//   }
//
// });

var post = {
  content: "This is some content",
  user: {
    id: 1,
    name: "bunnies12af"
  }
};

React.render(
  <Post post={post} />,
  document.getElementById('content')
);
