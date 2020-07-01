# StatisticsCounter
---
Create your own counters and track progress on beautiful graphs.  

This fullstack project was made as my first application using the MERN stack.  
*MERN - MongoDB, ExpressJS, ReactJS, NodeJS*

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need [Node.js](https://github.com/nodejs) installed on your machine  

```
$  node -v
v12.16.3
```

### Installing

Install all dependencies:

```
root$  npm install
root$  cd client && npm install
```

### Run project

1) Create mongodb database [here](https://www.mongodb.com/).

2) Change line in *root/config/default.json*:
```
"dbUri": "<past here your mongodb uri>",
```
3) Then run server and client via one command:
```
root$  npm run dev
```

## Author

* **Ivanov Daniil** [s3nPy](https://github.com/s3nPy)

## Acknowledgments

This project was created to learn new technologies:

* MongoDB 
* ExpressJS 
* ReactJS
* NodeJS