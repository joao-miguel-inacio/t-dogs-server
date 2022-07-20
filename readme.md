Routes Planning

AUTH

| Route        | HTTP Verb | Description                     | View                                         |
| ------------ | --------- | ------------------------------- | -------------------------------------------- |
| auth/signup  | GET       | shows signin form               | auth>signup                                  |
| auth/signup  | POST      | checks user input, creates user | redirect to signin                           |
| auth/signin  | GET       | shows signin form               | auth>signin                                  |
| auth/signin  | POST      | check user data                 | if signin is successful, redirect to profile |
| auth/verify  | GET       | get currentUser Object          | auth>verify                                  |
| auth/signout | GET       | signout user                    | redirect to auth>signin                      |

DOG OWNER
| Route | HTTP Verb | Description | View |
| ----- | --------- | --------------- | --------- |
| /dogs | GET | show dogs list | dogs>list |
| /dogs/offer | GET | show sell dog form | dogs>owner-form|
| dogs/offer | POST | create dog offer| redirect to /dogs after successful creation|
/dogs/:id/edit|GET| show edit | dogs>edit-dogs|
/dogs/:id/edit|POST| edit dog info | rediredt to created dog|
|

USER ROUTES
| Route | HTTP Verb | Description | View |
| ----- | --------- | --------------- | --------- |
| /dogs/browse | GET | show available dogs, swipe left and right buttons, check if there's a match, if yes, move Dog to savedList | dogs>browse |
|dogs/matchList|GET|show matched dogs|dogs>matchList
| dogs/:id | GET | get details | dogs>details|

PROFILE
| Route | HTTP Verb | Description | View |
| ----- | --------- | --------------- | --------- |
| /profile | GET | show user/owner profile | profile>profile |
|profile/profile-edit|GET|show edit form|profile>profile-edit|
|profile/profile-edit|POST|edit information, upload profileImage|redirect user/owner to profile|
