# T-DOGS

IronHack Project 3 - [Find your perfect dog!](https://t-dogs.netlify.app/)

<img src="https://res.cloudinary.com/dvru7nv6q/image/upload/v1660846590/T-Dogs/homepage_slezt4.png" alt="homepage" width="100%"/>

## Introduction :dog:

Nearing the end of the Ironhack's Web Development Bootcamp the ask was that we built a simple website using at least, 3 models, all CRUD operations, full authentication and authorization processes.

The Back End was to be developed with Node and Express.

The Front End was to be developed with React.

## The Idea :bulb:

An application for dog owners looking to sell or give a dog for adoption or for potential dog owners looking to adopt or to buy a dog.

### Dog Owners

Dog onwers can create as many dogs as they want and then manage each dog individually.

<div style="display: flex; justify-content:space-between; width=100%">
<img src="https://res.cloudinary.com/dvru7nv6q/image/upload/v1660426577/T-Dogs/dog-create_anxcfh.png" alt="homepage" width="45%"/>
<img src="https://res.cloudinary.com/dvru7nv6q/image/upload/v1660426584/T-Dogs/owned-dogs_tqqae8.png" alt="homepage" width="45%"/>
</div>

### Potential Owners

Buyers or users looking to adopt can browse through all the dogs available and can expect to be matched with the dogs we think would be perfect for them!

This will be based on what the buyers and the dog's needs are.

<div style="display: flex; justify-content:space-between; width=100%">
<img src="https://res.cloudinary.com/dvru7nv6q/image/upload/v1660426591/T-Dogs/profile_ucu9sz.png" alt="homepage" width="45%"/>
<img src="https://res.cloudinary.com/dvru7nv6q/image/upload/v1660426726/T-Dogs/match_fgrtul_zfhpxj.png" alt="homepage" width="45%"/>
</div>

## User Stories

- 404: As an anon/user, I can see a 404 page if I try to reacg a page that doesn't exist so that I know it is my fault;

- SignUp as Owner: As an anon, I can sign up in the platform as an owner so that I can start creating and managing my dogs;
- SignUp as Buyer: As an anon, I can sign up in the platform as a buyer so that I can find the perfect dog to buy or adopt;

- Login: As an anon, I can login as a buyer or as an owner;
- Logout: As a user, I can logout from the platform;

- Read profile: Both as an owner and buyer, I can see my own profile;
- Update profile as Owner: As an owner, I can edit my details and choose how the buyers can contact me;
- Update profile as Buyer: As a buyer, I can edit my details as my circunstances change to find a dog that suits my family's needs;

- Create Dogs as Owner: As an Owner, I can create new dogs;
- Read Dogs as Owner: As an Owner, I can see a list with all my dogs;
- Update dogs as Owner: As an Onwer, I can edit my dogs and mark them as adopted;
 
- Read Dogs: Both as owner and buyer, I can see a single dog's details;
 
- Read Dogs as Buyer: As a buyer, I can see all available dogs and choose to like them or not;
- Read Dogs as Buyer: As a buyer, I can see a list of all the dogs I matched with;

## Backlog

- Delete Dogs: As a buyer, I can delete dogs from my matchList adding them to a rejectedList;
- Read Dogs: Both as buyer and as owner, I can see a list with the 10 most right swipped dogs and see their individual details;
- Read Dogs: As a buyer, I can see a map with the location of all dogs available and change what dogs appear to me as available depending on their location;

# Client

## Routes

| Path          | Element    | Permissions              | Behaviour                                          |
| ------------- | :-------:  | ------------------------ | -------------------------------------------------- |
| /             |    Home    | public <Route>           | HomePage                                           |
| /about        |    About   | public <Route>           | Shows a welcome page with information on who is the app designed to and  how to use it.|
|               |            |                          |                                                    |
| /signup       |   Signup   | anon only <Route>        | Sign up form, link to sign in, navigate to signin after signup.|
| /signin       |   Signin   | anon only <Route>         | Sign in form, link to sign up, navigate to homepage after login.|
|               |            |                           |                                                    |
| Common        |            |                           |                                                    |
| /:id          |    Dog     | user only <PrivateRoute>  | Shows a page with all the dog details. If user is the dog owner, a button to edit this dog is shown. If user is a buyer a section with the dog owner's details is shown. |
| /profile      |Profile     | user only <PrivateRoute>  | Shows the user own profile and a link to edit.     |
| /profile-edit |ProfileEdit | user only <PrivateRoute>  | Profile edit form, navigate to profile after editing. |
|               |            |                           |                                                    |
| Owner         |            |                           |                                              |
| /own-list     |  OwnList   | user only <PrivateRoute>  | Shows a list with all the dogs owned by the logged in owner. Each dog has a link to a page displaying its own details and a link to edit. |
| /dog-create   |  DogCreate | user only <PrivateRoute>  | Shows a list with all the dogs owned by the logged in owner. Each dog has a link to a page displaying its own details and a link to edit. |
| /:id/dog-edit |  DogEdit   | user only <PrivateRoute>  | Dog edit form, navigate to dog own list after editing. |
|               |            |                           |                                                    |
| Buyer         |            |                           |                                              |
| /browse       |  Browse    | user only <PrivateRoute>  | Shows all available dogs, one at a time. User can drag left (desktop) or swipe left (mobile) or click the left button to dislike a dog. User can drag right (desktop) or swipe right (mobile) or click the right button to like a dog. Liking a dog is following by testing the compability between the dog and the user logged in and if they are deemed compatible a message pops up saying "It is a Match". If is it a Match, the dog is added to the logged in user's matchList. |
| /match-list   |  MatchList | user only <PrivateRoute>  | Shows a list with all the dogs matched with the logged in buyer. Each dog has a link to a page displaying its own details. |
| /no-more-dogs |  NotFound  | user only <PrivateRoute>  |  Shows a page with a message saying there are no more dogs to display in browse.|
|               |            |                           |                |
| Common        |            |                           |                                                    |
| /*            | NotFound   | public <Route>            | Shows a page with a Not Found Message and a link to homepage. |

## Components
 
- DogDetails
- DogList
- Forms
 -- Form Dog Create
 -- Form Dog Edit
 -- Form Profile Edit
 -- Form Sign In
 -- Form Sign Up
- NavBar
- NavBar2
- PopOver

## Services

### Auth service
- service.signup
- service.signin
- service.isLoggedIn

### API service

#### Common
- service.getDogInfo
- service.getUserInfo
- service.editProfile

#### Owners 
- service.getOwnList
- service.dogCreate
- service.dogEdit

#### Buyer
- service.getAvailableDogs
- service.getMatchList

# Server

## Models

### Buyer

```
userType - String // required // enum: ["isBuyer"]
name - String // required
email - String // required & unique
password - String // required
profilePicture - String
description - String 
address - String
hasChildren - Boolean
hasExperience - Boolean
hasPets - Boolean
willingToPay - Boolean
matches - Schema.Types.ObjectId // ref: "Dog"
```

### Dog
```
image - String // required
name - String // required
breed - String // required
age - Number // required
gender - String // required // enum: ["male", "female"]
size - String // required // enum: ["small", "medium", "large"]
shortDescription - String
description - String
alreadyAdopted - Boolean
openToStrangers - Boolean
playful - Boolean
chippedAndVaccinated - Boolean
childFriendly - Boolean
requiresExperience - Boolean
goodWithOtherDogs - Boolean
price - Boolean
owner - Schema.Types.ObjectId // ref: "Owner"
```

### Owner

```
userType - String // required // enum: ["isOwner"]
name - String // required
email - String // required & unique
password - String // required
profilePicture - String
description - String 
address - String // required
phoneNumber - Number
dog - Schema.Types.ObjectId // ref: "Dog"
```

## API Endpoints/Backend Routes

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


## Links

### Trello

[Trello](https://trello.com/b/VrglkNq4/t-dogs)

### Git

- [Client repository Link](https://github.com/joaoMiguelInacio/t-dogs-client)
- [Server repository Link](https://github.com/joaoMiguelInacio/t-dogs-server)

### Prezi

[Presentation](https://prezi.com/view/N8jrYmsjNqUHke415YG0/)
