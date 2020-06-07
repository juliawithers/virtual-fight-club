# Virtual Fight Club

Link to live app: https://virtual-fight-club.now.sh/

## Description
In Virtual Fight Club you can create a character to do battle with other users. 
![Fight Page](FightPage.PNG)

Characters have four attributes: strength, intelligence, charisma, and agility.
![Character Page](CharacterPage.PNG)

Level up by reaching 50 points (2 points per match). Once you reach a new level you can update your character attributes.

Matches are determined by attribute points and chance. 

## Technology Used
React, NodeJs, PostgreSQL

## API documentation
Please see the endpoints and schemas below: 
##  SCHEMAS:
### /login 
__.post__: 
request body: 
    {
        "username": username, 
        "password": passw
    }
returns: 
    {
        "login": true,
        "user": [
            {
                "id": 3,
                "auth": "b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1",
                "username": "lydiaMartin",
            }
        ]
    }

### /users
__.get__:
query params:
    {
        "login": true,
        "userId": users unique id
    }
returns:
    {
        "users": [{
            "auth": user auth,
            "username": "",
            "passw": "",
        },...  ]
    }

__.post__: 
body:  
    {
        "auth": user auth,
        "username": "",
        "passw": "",
    }
returns: 
    {
        "id": user.id,
        "auth": auth,
        "username": username
    }

__.delete__:
body: 
    {
        "user_id": user.id
    }
returns:
    {
        "userId": user.id
    }

### /characters
__.get__:
returns: 
    {
        "characters": [{
            "id": character id,
            "auth": "",
            "username": "",
            "user_id": ,
            "char_name": "",
            "strength": ,
            "intelligence": ,
            "charisma": ,
            "agility": ,
            "current_level": ,
            "current_points": ,
            "wins": ,
            "losses": ,
            "attrpoints": 
        }, ...]
    }

__.post__:
body: 
    {
        "auth": "",
        "username": "",
        "user_id": ,
        "char_name": "",
        "strength": ,
        "intelligence": ,
        "charisma": ,
        "agility": ,
        "current_level": ,
        "current_points": ,
        "wins": ,
        "losses": ,
        "attrpoints": 
    }
returns: 
    {
        "character": {
            "id": character id
            "auth": "",
            "username": "",
            "user_id": ,
            "char_name": "",
            "strength": ,
            "intelligence": ,
            "charisma": ,
            "agility": ,
            "current_level": ,
            "current_points": ,
            "wins": ,
            "losses": ,
            "attrpoints": 
        }
    }

TEST CHARACTER OBJECT:
    {
        "auth": "0810bd3e-6112-4c27-a63f-c533e885495c",
        "username": "testcharacter",
        "user_id": 3,
        "char_name": "testy",
        "strength": 5,
        "intelligence": 2,
        "charisma": 2,
        "agility": 1,
        "current_level": 0,
        "current_points": 0,
        "wins": 1,
        "losses": 0,
        "attrpoints": 0
    }

__.delete__:
body:
    {
        "id": character id
    }
returns:
    success status or error

### /matches
__.get__:
returns: 
    {
        "matches":[{
            "char_1_id": current user id,
            "char_2_id": opponent id,
            "winner": ,
            "loser": ,
            "points": 
        },...]
    }

__.post__:
body: 
    {
        "char_1_id": current user id,
        "char_2_id": opponent id,
        "winner": ,
        "loser": ,
        "points": 
    }
returns: 
    {
        "match": {
            "id": match id
            "char_1_id": current user id,
            "char_2_id": opponent id,
            "winner": ,
            "loser": ,
            "points": 
        }
    }

### /characters/:id
__.get__:
query params: 
    {
        "login": true,
        "userId": users id
    }
returns:
    {
        "character": {
            "id": character id
            "auth": "",
            "username": "",
            "user_id": ,
            "char_name": "",
            "strength": ,
            "intelligence": ,
            "charisma": ,
            "agility": ,
            "current_level": ,
            "current_points": ,
            "wins": ,
            "losses": ,
            "attrpoints": 
        }
    }