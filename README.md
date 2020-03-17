# MES WEB
### Installation

Requires [Node.js](https://nodejs.org/) v7+ to run.

```sh
$ cd mes_frontend
$ npm install or yarn install
$ nmp start or yarn start for starting dev server
```

Starting on http://localhost:3000/

If you have problems with @babel/runtime 

```sh
$ npm install --save-exact @babel/runtime@7.0.0-beta.55 or yarn add @babel/runtime@7.0.0-beta.55 --exact
```
### Development

Check "baseUrl" in \src\stores\api.js. Here is the url of the backend server
