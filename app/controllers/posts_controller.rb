class PostsController < ApplicationController

  def index
    @posts = get_posts
  end

  def create
    @post = Post.new post_params
    @post.user_id = find_user_by_token.id
    if @post.save
      @posts = get_posts
      render :index, status: 201
    else
      render json: { error: 'failed' }, status: 422
    end
  end

  private

    def get_posts
      Post.all.includes(:user).order('created_at desc limit 20')
    end

    def post_params
      params.require(:post).permit(:title, :content)
    end

end
