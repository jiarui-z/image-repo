# image-repo
This is an image repository with functionalities to add, search, download and delete images, created with MongoDB, ExpressJS and ReactJS.

## Setup
### Environment
`node 14+` and `npm`

### Client
Go to the client folder and run
```
npm i && npm start
```

### Server
Go to the server folder, create a `.env` file and copy your API keys
```
// this is the url used to connect to MongoDB
ATLAS_URI=

// this is a sceret used to sign the jwt token
SECRET_OR_KEY=
```
and run
```
npm i && node index.js
```

After this, open a web browser at http://localhost:3000. That's it🙂!

## Possible features
### Access control
User registration/login and authentication are already set up on the server with jwt. Any future features requiring access control can be easily created with the exsiting setup. Examples can be found at `server/routes/users.js`. With this, we could easily add image buy/sell feature (accessible to respective image owners) in the future.

### S3 integration
My AWS account is out of the free tier for this month🥲. In the future, we can store the images into S3 to reduce the server load.



