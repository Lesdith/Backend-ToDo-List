# Backend-ToDo-List
This repository is the backend of an application that simulates the operation of a to-do list known as a ToDo List.

In my profile you can find the <a href="https://github.com/Lesdith/Frontend-ToDo-List">frontend-todo-list</a> repository to complement it.

## SETUP
### Requirements to use this project:

<ul>
<li>
<a href="https://nodejs.org/es/download/"> Node.js </a>
</li>
<li>
<a href="https://www.npmjs.com/package/package"> npm </a> (Node Package Manager, it comes with node.js installation)
</li>
</ul>
In case you're not with the latest version of npm:


``` javascript
$ npm install npm -g

```


## Install NPM Dependencies

Once you clone this repository, run this command on your terminal to install all needed dependencies:

```
$ npm install 

or 

$ npm install -force
```

## Start the project

In order to start the project, you need to open the terminal and in your project run the following commands

This command works as a tool to create a project's package.json file. Once you run the npm init steps, a package.json file will be generated and saved to the current directory.

```
$ npm init -y 
```

### Install Express
Fast, unopinionated, minimalist web framework for node.


```
$ npm install --save -d express
```

### Install SQLite
SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine. SQLite is the most used database engine in the world. SQLite is built into all mobile phones and most computers and comes bundled inside countless other applications that people use every day

```
$ npm install -d sqlite

and

$ npm install -d sqlite3
```

### Install cors
CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

```
$ npm install -d cors
```
### Install UUID
UUID stands for Universally Unique IDentifier, which literally means 'universally unique identifier'. As such, the UUID is a standard identifier code used in the software building process. It is used to create universal unique identifiers that allow recognizing and distinguishing an object within a system, or the same object in different contexts.

```
$ npm install -d uuid
```

### Install nodemon
nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

Either through cloning with git or by using npm (the recommended way):

```
$ npm install -g nodemon
```
And nodemon will be installed globally to your system path.

You can also install nodemon as a development dependency:

```
$ npm install --save-dev nodemon
```

## Configure file Packaje.json

Following the instructions your Package.json file should look similar to the following:

```
{
  "name": "backend-todo-list",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon ./src"
  },
  "keywords": [],
  "author": "Nombre del autor",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.1",
    "node": "^18.4.0",
    "npm": "^8.13.2",
    "save": "^2.5.0",
    "sqlite": "4.0.23",
    "sqlite3": "^5.0.8",
    "uuid": "^8.3.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.18"
  }
}

```


### Run the Project 

```
$ npm start
```
