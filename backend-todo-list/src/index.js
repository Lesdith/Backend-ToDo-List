//importamos express para desde la dependencia que instalamos 
const Express = require ("express");

const RequestHandler = require("./lib/handlers/request-handlers");
//restringir el acceso
const CorsMiddleware = require("cors");

//importamos la funcion que creamos para inicializar la base de datos
const { initializeDB } =  require("./lib/db/index");



/*por medio de promesas como es una funcion asincrona le puedo decir 
como todo salio bien necesito que me pases un mensaje en consola que diga 
Database ready*/

//nos permite interactuar con la base de datos por medio de una API y Express
const Api = Express();

//Midleware o funcion con 3 parametros es el Express.json => return (request, response, next) =>
Api.use(Express.json());

//midleware de la libreria de express permite acceder al body cuando venga en formato x-wwww
//Tambien nos devolvera una funcion parseara el campo valor formulario en un json
Api.use(Express.urlencoded({ extended: false }));

//Middleware para seguridad cors
Api.use(CorsMiddleware());

//localhost:3000/v1/to-dos
Api.use("/v1", RequestHandler);


//Configurar la API para que este disponible para escuchar en un puerto elegido
Api.listen(3001, () =>{
    console.log("API IS RUNNING");

    //Si no esta escuchando mi API no se inicializa la Base de Datos
    initializeDB().then(()=>{
    console.log("DATABASE READY");
    });
});