# BudgetBuddy

## Introduction
BudgetBuddy is an interactive web platform that helps to manage your transactions. Developed with MERN tech stack, BudgetBuddy offers users a tool to keep all transactions and analyze them in one place.

## Setup and Installation
To set up BudgetBuddy locally:
1. Clone the repository:
```
git clone https://github.com/diaskarshal/budgetbuddy.git
```
2. Install dependencies:
```
cd budgetbuddy/server
npm install
cd ../client
npm install
```
3. Create .env file in: server folder and add  
PORT=5000  
MONGO_URL=""  
SECRET_KEY=  
in client folder and add  
REACT_APP_API_URL=http://localhost:5000  
4. Start the development server:
```
cd client
npm start
cd ../server
npm start
```

## Development process
1. Setup the development enironment, install packages, create database, and .env files.
2. Make a diagram of the database.
3. Create models.
4. Create routes and endpoints.
5. Create error handling middleware.
6. Implement CRUD, filtration, and pagination logic.
7. Registration, authorization, jwt, bcrypt, authMiddleware.
8. Start client side with writing the app routing.
9. Code the main, stats, and login pages.
10. Create the connection with the server.

## Methodology

## Compromises

## Errors/bugs
the categories are not listed in the create transaction form, yet they are in the update form 
the filters on the category side bar are not working  
the selectors of period and amount are not working  
the date in the table should be edited in a year-month-dateThour:minute:second, leaving .millisecondZ  
setting the custom data in the amount and frequency filters should be handled  
the selector of time period is not refreshed after logging out, it keeps the same setting and cannot be changed to the default
error in updating the transaction
## Technologies
- **Frontend**: React.js, Bootstrap
- **Backend**: Node.js, Express.js
- **Other**: MongoDB

This tech stack was used for its popularity and diversity. Everything is written in JavaScript, so it provides a better understanding in the development process.