# MEAN Stack Sample Application

This is a simple CRUD application built using the MEAN (MongoDB, Express, Angular, Node.js) stack. You can also follow the step-by-step [tutorial](https://www.mongodb.com/languages/mean-stack-tutorial) for building this application.

![Demonstration of the web application](demo.gif)

## How To Run

 Set your [Atlas URI connection string](https://docs.atlas.mongodb.com/getting-started/) as a parameter in `server/.env`.

```
ATLAS_URI=mongodb://localhost:27017/mean-stack-example
```

Note: Before starting the application, make sure mongo service is running locally on port 27017. If not check in windows services or start it explicitly with command prompt. Refer [this](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/) for more information.


Start the server application:
```
cd server
```
```
npm install
```
```
npm start
```

Start the client application:
```
cd client
```
```
npm install
```
```
npm start
```
When both applications are built and running, open your browser on http://localhost:4200/.