class User < ActiveRecord::Base

  has_secure_password
  has_many :posts

  validates :email, presence: true, uniqueness: true
  validates :token, uniqueness: true

end
