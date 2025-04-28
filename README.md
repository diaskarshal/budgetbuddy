# BudgetBuddy

## Introduction
BudgetBuddy is an interactive web platform that helps to manage your transactions. Developed with MERN tech stack, BudgetBuddy offers users a tool to keep all transactions and analyze them in one place.

## Features
* User authentication and secure account management  
* Transaction tracking with categorization (income/expense)  
* Interactive dashboard with financial statistics and visualizations  
* AI-powered financial analysis using Hugging Face models
* Filtering and sorting transactions by various criteria
* Responsive design for desktop and mobile devices

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
3. Create .env file in server folder:  
```
PORT=5000  
MONGO_URL="your connection string from mongodb atlas"  
SECRET_KEY=somestring  
HUGGINGFACE_API_KEY="from https://huggingface.co/"
```
in client folder:  
```
REACT_APP_API_URL=http://localhost:5000  
```
4. Start the development server:
```
cd ../server
npm start
cd ../client
npm start
```
The application should now be running on http://localhost:3000

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

## Compromises
1. The navbar logic was moved to client/src/pages/Main.js and Stats.js due to an issue in displaying categories in the add transaction form. 
2. The category values were hardcoded. The future improvements will be aimed to fix it, so that the user will be able to add own categories.

## Errors/bugs
1. The filters on the category side bar and top bar are not working  
2. Setting the custom data in the amount and frequency filters are not implemented yet  
3. Pagination

## Technologies
- **Frontend**: React.js, React Bootstrap, Mobx, Axios
- **Backend**: Node.js, Express.js, Mongoose, JWT Authentication
- **Other**: MongoDB, Hugging Face: gpt2

This tech stack was used for its popularity and diversity. Everything is written in JavaScript, so it provides uniformity and a better understanding in the development process.