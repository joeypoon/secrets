7.times do

  user = User.create name: Faker::Team.creature + SecureRandom.hex(2), token: SecureRandom.hex(8), email: Faker::Internet.email, password: 'password', password_confirmation: 'password'

  2.times do
    Post.create title: Faker::Hacker.adjective, content: Faker::Hacker.say_something_smart, user_id: user.id
  end

end
