# BidHub

## Authors

### Eddie Bueno
### David Bolin
### Quonn Bernard


## Summary

A React / Express app to help developers connect and collaborate on their coding projects. Users create project descriptions and open them to bidders. Once accepted, collaboration can begin. The app allows for real time communication between collaborators on the project page.


## Live app

The live app is [here](https://bidhub.now.sh/).

## Screenshots
![Landing Page](screenshots/ScreenClip.png)

![Create Project](screenshots/ScreenClip2.png)

## Tech stack

The client uses CSS3 and JavaScript ES6 together with React.

The server is also in JavaScript (source at [https://github.com/thinkful-ei-bee/A-team-capstone-server]) and uses Express with PostgreSQL for the database.

We used [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) to allow the client to update immediately upon reception of messages from other users.

## Code base

The source folder has three sub-folders, "components," "services," and "user-context."

UserContext creates a context with username and homepage id so that the app can keep track of the current user.

The services folder contains files for communicating with the server, whether for login or for retreiving or posting information to or from the server.

The components folder contains files creating React components for the main app (App), each distinct page (EditPage, LandingPage, ListPage, NotFound, PersonalPage, RegistrationPage, SignIn), as well as several reusable components (NavBar, Emoji, List).

## Installation for Development

Clone the repo and run "npm install". Then "npm start" will start the local development server. Instructions for installing the server and database, along with API documentation, can be found at the [repo for the server.]
