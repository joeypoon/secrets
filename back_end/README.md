### Secrets API

#### User

    Login: post '/login.json'
    Create: post '/users.json' | required params: email, password, password_confirmation

    Response:
    {
      "id": 8,
      "name": "vixens3730",
      "token": "354f1x96a1ff4be8"
    }

#### Posts

    Get recent 20: get '/posts.json'
    Create: post '/posts.json?token={user_token}' | required params: title, content

    Response:
    [
      {
          "id": 21,
          "title": "This is a anot2342her titl23432e22342323434!",
          "content": "This is some more con2342tent!",
          "user": {
              "id": 8,
              "name": "cattled3d3"
          }
      },
      {
          "id": 20,
          "title": "This is a anot2342her title22342323434!",
          "content": "This is some more con2342tent!",
          "user": {
              "id": 8,
              "name": "cattled3d3"
          }
      },
      {
          "id": 19,
          "title": "This is a anot2342her title223434!",
          "content": "This is some more con2342tent!",
          "user": {
              "id": 8,
              "name": "cattled3d3"
          }
      }
    ]
