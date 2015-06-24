class User < ActiveRecord::Base

  has_secure_password

  validates :email, presence: true
  validates :token, uniqueness: true

end
