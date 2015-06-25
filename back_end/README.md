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
          "id": 20,
          "title": "mobile",
          "content": "Use the bluetooth XSS feed, then you can compress the digital alarm!",
          "user": {
              "id": 7,
              "name": "sheep02af"
          }
      },
      {
          "id": 19,
          "title": "primary",
          "content": "If we navigate the feed, we can get to the IB matrix through the digital FTP bus!",
          "user": {
              "id": 7,
              "name": "sheep02af"
          }
      },
      {
          "id": 18,
          "title": "haptic",
          "content": "If we bypass the circuit, we can get to the EXE protocol through the digital SMS circuit!",
          "user": {
              "id": 6,
              "name": "elephants692e"
          }
      }
    ]
