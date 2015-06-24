class PostsController < ApplicationController

  def index
    @posts = Post.all.includes(:user).order('created_at desc limit 20')
  end

end
