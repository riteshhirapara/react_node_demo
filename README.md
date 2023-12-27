# Movie Management App

## Getting Started

1. Create .env file and provide URI from Mongo Atlas. Ex.

bash

# .env file in the root of the project

MONGODB_URI=mongodb+srv://<username>:<password>@<Cluster-Name>/?retryWrites=true&w=majority

## Routes:

### 1. /sign-in

- The Sign In page with email and password validation.

#### Password criteria:

- At least one Upprcase letter
- At least one number
- At least one special character
- Minimun length of 8

#### Note:

- _Create a demo user in users table manually to test sign in._

### 2. /movie/list

- List all the created movies
- Click on plus button to create a new movie
- Click on logout button to redirect to Sign in page
- Click on a movie card to edit the movie

### 3. /movie/create

- Create a movie with all mandatory fields:
  - Title
  - Poster Image
  - Publish Year
- Click on cancel button to abort

### 4. /movie/edit

- Edit any of the fields of the movie
- Click on Cancel button to abort
