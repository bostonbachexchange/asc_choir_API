# All Souls Choir API

## Deployment Link
Deplyed on Heroku 

## Link to frontend client
GitHub Client Repo 

## Pitch
CHORDIALLY YOURS is a choir app that will take your choir to the next level. 

## Premise
This platform allows choir members to connect to other members in their chorus. Users find choral works to practice and add to their repertoire list. Create an opportunity to connect and share ideas and build community.

## Installation and Technologies
1. This app uses dependencies with `npm install`, express, node.js, mongodb, mongoose and react.

## STRETCH GOALS…
* As a user, I want to be able to search ALL music through a search bar
* As a user, I want to add multiple comments to each post on the message board (subdocument)
* Only an admin can create and delete music/repertoire


ERD
<img src="./assets/ERD/erd.png" width="600px" alt="ERD" />

## ROUTE TABLES 

### USER route table

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-in`             | `users#signin`    |
| POST   | `/sign-up`             | `users#signup`    |
| PATCH  | `/change-password/`    | `users#changepw`  |
| DELETE | `/sign-out/`           | `users#signout`   |

### SONGS route table

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET    | `/view-song`        | `songs#view`   |
| POST   | `/create-song`      | `songs#create`    |
| PATCH  | `/edit-song/`       | `songs#edit`  |
| DELETE | `/delete-song/`     | `songs#delete`   |

### COMMUNITY MESSAGE BOARD route table

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET    | `/view-messageboard`        | `messageboard#view`   |
| POST   | `/create-messageboard`      | `messageboard#create`    |
| PATCH  | `/edit-messageboard/`       | `messageboard#edit`  |
| DELETE | `/delete-messageboard/`     | `messageboard#delete`   |

## API or Seed Data
* I will be using Seed Data to populate the Users and the repertoire
* I will be using 4 sample choir members, and will upload repertoire data.