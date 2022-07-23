## Trello
https://trello.com/b/VrglkNq4/t-dogs

## Routes Planning

| Route           | HTTP Verb | Description                          | View                                               |
| --------------- | :-------: | ------------------------------------ | -------------------------------------------------- |
| index.routes    |           |                                      |                                                    |
| /               |    GET    | shows Homepage                       | HomePage                                           |
|                 |           |                                      |                                                    |
| auth.routes     |           |                                      |                                                    |
| signup          |   POST    | creates user                         | redirect to signin                                 |
| signin          |   POST    | signs in                             | redirect to ownList if owner or to browse if buyer |
|                 |           |                                      |                                                    |
| common.routes   |           |                                      |                                                    |
| /:id            |    GET    | show dog details and option to edit  | DogDetails                                         |
| /               |    GET    | show buyer/owner profile             | OwnProfile                                         |
| /               |    PUT    | edits profile                        | redirect to OwnProfile                             |
|                 |           |                                      |                                                    |
| owner.routes    |           |                                      |                                                    |
| /               |    GET    | show owns dogs list                  | OwnDog List                                        |
| /               |   POST    | creates dog                          | redirect to OwnDogList                             |
| /:id            |    PUT    | edits dog                            | redirect to DogDetails                             |
|                 |           |                                      |                                                    |
| buyer.routes    |           |                                      |                                                    |
| /               |    GET    | show available dog                   | BuyerDogView                                       |
| /:id/match      |    PUT    | adds dogs to buyers matches list     | BuyerDogView + notification                        |
| /matchList      |    GET    | show matched dogs                    | MatchedList                                        |
