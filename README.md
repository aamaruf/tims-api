# Backend Task By Wander Women: Travel Itinerary Management System

## Objective: 
`Develop a backend system for a Travel Itinerary Management application. The system will allow users to create, update, delete, and retrieve travel itineraries.`

# TIMS API

## Project Dependency

- Node v18.15.0
- MongoDB
- Mongoose

## Project Initiate

1. Clone the project.
2. Update environments in the `.env` file (copy from `.env.example`).
   N.B: Choose an available port for the project.
3. Run the following commands:
   ```bash
   yarn install
   yarn start
   yarn run seed

## Project Structure

- `src` - Contains all source code of the project.
  - `config` - Contains all configuration files.
  - `controllers` - Contains all controllers of the project.
  - `helpers` - Contains all helper functions of the project.
  - `middlewares` - Contains all middlewares of the project.
  - `models` - Contains all models of the project.
  - `routes` - Contains all routes of the project.
  - `services` - Contains all services of the project.
  - `utils` - Contains all utility functions of the project.
  - `validations` - Contains all validation functions of the project.


## API Documentation

  - Swagger UI
    N.B: Swagger UI is used for API documentation. It will be available in the following url: http://localhost:4002/docs

# CI/CD

- Github Actions
N.B: Github actions is used for CI/CD. It will run the test cases and deploy the application in Digital Ocean by docker containerization.

# API Endpoints

## Users - API operations related to user

POST
/api/users/register
Register a new user

POST
/api/users/verify
Verify a user with OTP

PUT
/api/users/resend-verification
Resend verification code to a user

POST
/api/users/login
User login

GET
/api/users/list
Get a list of users

GET
/api/users/{id}
Get user details by ID with itineraries

PUT
/api/users/force-verify
Force verify an user

## Itineraries - Operations related to itineraries

POST
/api/itineraries
Create a new itinerary

GET
/api/itineraries
Get logged in user's itineraries

GET
/api/itineraries/all
Get all itineraries [ accessed by admin only ]

GET
/api/itineraries/single/{id}
Get a single itinerary by ID

GET
/api/itineraries/user/{userId}
Get a speciic users itinerary by user ID

PUT
/api/itineraries/{id}
Update an existing itinerary

DELETE
/api/itineraries/delete/{id}
Delete an itinerary by ID


## NB: use GITHUB SECRETS for SENSETATIVE INFORFOMATIONS instead of .ENV
## NB: DO NOT USE MONGO ROOT USER. CEATE USER FOR EACH PROJECT WITH NECESSARY PERMISSIONS