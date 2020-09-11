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

Open [http://localhost:3000](http://localhost:3000) for ckecking the webApp in browser.



Initially you will see empty: you can  
start creating farms and ponds saved to mongodb with persistency. 
![initialdesk](https://raw.githubusercontent.com/CarlosRabid/shrimpfarm/master/public/initialdesk.png "Landing Screen")

## Running the tests: Add Farm

![createnew](https://raw.githubusercontent.com/CarlosRabid/shrimpfarm/master/public/createfarm.png "Create New")

You can add a new farm. Click the Floating button with the plus icon.
A prompt will appear where you can input corresponding info 
wether you would like to create a new Farm or Pond. 
When you create a pond you can select from a list to assign it to a Farm,
and corresponding size in hectares, detail showed as a tooltip. 

![createponds](https://raw.githubusercontent.com/CarlosRabid/shrimpfarm/master/public/createponds.png "Create Ponds")

Before saving a confirmation is needed.
Save if ready, discard if not. 

![pondcreated](https://raw.githubusercontent.com/CarlosRabid/shrimpfarm/master/public/pondcreated.png "Pond and Farm Created")

## Update and delete ponds or Farms containing ponds.

![updatefarm](https://raw.githubusercontent.com/CarlosRabid/shrimpfarm/master/public/updatefarm.png "Update Operations")

Simply select the EDIT FARM OR PONDS button.
A prompt appears showing available info for 
updating input fields, or deleting  either selected Farm,
or Ponds inside Farm.
If you want to save your changes make
sure to click the "Update" button.

![updatedpond](https://raw.githubusercontent.com/CarlosRabid/shrimpfarm/master/public/updatedpond.png "Update Pond")

### Delete Item

![deletecurrent](https://raw.githubusercontent.com/CarlosRabid/shrimpfarm/master/public/deletecurrent.png "Delete Current")

Once you have selected the EDIT button for farm or pond, you can also delete in the same action.
After selecting either Farm or Pond from the dropdown list, a button appears with label 
"Delete Current" farm or pond depending what you selected previously.

### Delete everything

![deleteall](https://raw.githubusercontent.com/CarlosRabid/shrimpfarm/master/public/delete%20all.png "Delete All")

On top of the screen there's a red button with "EMPTY" label,
this allows the removal of all farms. 

### Summatory of Ponds' sizes.

![sumshow](https://raw.githubusercontent.com/CarlosRabid/shrimpfarm/master/public/sumshow.png "Show Sum")

The summatory of sizes of all ponds within each Farm is shown in Landing Page, next to Size. 
This aggregattion happens in the backend server.


*webApp includes confirmation for creating, updating or deleting farms.*

### Known bugs

Minor clickable events. Improving UI.

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
