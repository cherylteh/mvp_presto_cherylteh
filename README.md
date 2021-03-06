## Presto Choir Administration - Solo Project for CodeOp MYS03 Bootcamp
For this first solo project, we had to build our own webapp.

## Background
The Problem - The administrative side of running choirs often takes up a lot of time, time which choir leader could spend on more musical / artistic aspects of leading their choirs. Presto will save choir leaders time in administration and management of the choir.

Target Audience - Community choir leaders who run smaller choirs <200 pax with limited resources and budget. 

For this MVP, Basic Features (for the Administrator) include 2 components:
1) Music Score Management – Title, Parts, Composer, Arranger, Location (to ease tracking of scores (pdf and physical)
2) Event / Gig Management – Listing of event title, date, and location. In future, will extend to add singers list and song list

Future Extensions include:
1) Membership Management
2) Fees Tracker

## Objective of this Project
- Build a database with Tables
- Build a React app
- show the connection between database and React app

## Setup

### Dependencies

Run `yarn` in the project folder to install dependencies related to Express (the server).

`cd client` and run `yarn` install dependencies related to React (the client).

### Database Prep

Create `.env` file in project directory and add

```
DB_NAME=presto
DB_PASS=YOUR_PASSWORD
```
(replace `YOUR_PASSWORD` with your actual password)

Alternatively, you can rename the provided `.env.example` file to `.env`.

Type `mysql -u root -p` to access the MySQL CLI using your password.

In the MySQL CLI, type `create database presto;` to create a database in MySQL.

Run the following in the MySQL CLI: `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YOUR_PASSWORD';` (replace `YOUR_PASSWORD` with your actual password)

Run `node model/database.js` in your **TERMINAL**, in the **project** folder (not your MySQL CLI! Open a new terminal window for this). This will create a table called 'items' in your database.

### Run Your Development Servers

- Run `yarn start` in project directory to start the Express server on port 5000
- `cd client` and run `yarn start` to start client server in development mode with hot reloading in port 3000.
- Client is configured so all API calls will be proxied to port 5000 for a smoother development experience. Yay!
- You can test your client app in `http://localhost:3000`
- You can test your API in `http://localhost:5000`

## Basic Requirement

### 1. Database Schema
![MVP_Presto_Schema_20210901](https://user-images.githubusercontent.com/86417917/136499804-5b0de65a-b768-470d-ac4d-873f5f100024.png)

### 2. API route Plan
- to be updated - 

### 3. User Flow Chart Diagram
- to be updated - 

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp 03 in Malaysia._
