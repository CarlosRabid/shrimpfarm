# React Farming App

Farming with ponds inside each farm. Built with React  

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

You need to have installed Node/npm, React and MongoDB. Rest of dependencies come with npm install command.

Install Node/npm from official documentation here

```
https://en.reactjs.org/docs/getting-started.html
```


Install React from here

```
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
```

and MongoDB here --> 

```
https://docs.mongodb.com/manual/installation
```


Once set up React and MongoDB continue installation...


### Installing

All dependencies included. Once in the project folder, run :

```
### `npm install`
```

This will install all necessary packages. Wait with a cup of coffee.

While installing, in the command shell, or system CMD 
(command prompt) you can start the command 'mongod',
necessary for mongodb connection.

Once command 'mongod' is executing and npm install has finished
then you can run in the project directory the command

Simultaneously run also the command

```
### `node server.js`
```

Runs the server for testing data persistency
and CRUD operations .

```
### `npm start`
```

This runs the app in development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



Initially you will see empty: you can  
start creating farms and ponds saved to mongodb with persistency. 
![Initial](http://localhost:3000/somepicture.PNG "Initial Desktop")

## Running the tests: Add Farm

![somepicture](http://localhost:3000/somepicture.PNG "Initial ")

You can add a new farm. Click the Floating button with the plus icon.
A prompt will appear where you can input corresponding info 
wether you would like to create a new Farm or Pond. 
When you create a pond you can select from a list to assign it to a Farm,
and corresponding size in hectares, detail showed as a tooltip. 

![somepicture](https://localhost:3000/somepicture.PNG "somepicture")

Before saving a confirmation is needed.
Save if ready, discard if not. 

![somepicture](https://localhost:3000/somepicture.PNG "somepicture")

## Update and delete ponds or Farms containing ponds.

![crud](https://localhost:3000/somepicture.PNG "CRUD Ops")

Simply select either pond or farm.
A prompt appears showing available info for 
updating input fields, or deleting  either selected pond,
or corresponding Farm for pond clicked.
If you did any changes make
sure to save them with the "Update" button.

### Delete everything

![end](https://localhost:3000/somepicture.PNG "end1")

On top of the screen there's a red button with "EMPTY" label,
this allows the removal of all farms. 

![confirm](https://localhost:3000/somepicture.PNG "end")

*webApp includes confirmation for creating, updating or deleting farms.*

### Known bugs



## Built With

* [React](https://en.reactjs.org) - The web framework used,
* [MongoDB](https://mongodb.com/) - State manager, backend handler,

* [Material UI](https://material-ui.com/) - Library for UI and light components.

## Contributing

CCN.

## Versioning

Versioning available in Github with proper tags. 

## Authors

* **Carlos Cornejo N.** [CarlosRabid ](https://github.com/CarlosRabid)

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

* Bugs described in 'Known bugs'
* Excellent for knowledge/experience practice.
* Developed for testing purposes.
