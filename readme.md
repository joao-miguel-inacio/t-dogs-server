Routes Planning

| Route           | HTTP Verb | Description                          | View                                               |
| --------------- | :-------: | ------------------------------------ | -------------------------------------------------- |
| /               |    GET    | shows Homepage                       | HomePage                                           |
| auth/signup     |   POST    | creates user                         | redirect to signin                                 |
| auth/signin     |   POST    | signs in                             | redirect to ownList if owner or to browse if buyer |
| OWNER           |           |                                      |                                                    |
| /dogs/ownList   |    GET    | show dogs list                       | OwnDog List                                        |
| /dogs           |   POST    | creates dog                          | redirect to OwnDogList                             |
| /dogs/:id       |    PUT    | edits dog                            | redirect to DogDetails                             |
| OWNER && BUYER  |           |                                      |                                                    |
| /dogs/:id       |    GET    | show dog details and option to edit  | DogDetails                                         |
| /profile        |    GET    | show buyer/owner profile             | OwnProfile                                         |
| /profile        |    PUT    | edits profile                        | redirect to OwnProfile                             |
| BUYER           |           |                                      |                                                    |
| /dogs/browse    |    GET    | show available dog                   | BuyerDogView                                       |
| /dogs/:id/match |    PUT    | adds dogs to buyers matches list     | BuyerDogView + notification                        |
| /dogs/matchList |    GET    | show matched dogs                    | MatchedList                                        |
