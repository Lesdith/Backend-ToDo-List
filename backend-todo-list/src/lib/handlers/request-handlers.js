// volvemos a importar el paquete de expres para tener acceso a todas sus funciones 
const Express = require("express");
const { getDBHandler } = require("../db");

//Router permite separar la logica y me da los metodos para poder interactuar
const Requesthandler = Express.Router();

// request por objetos en este caso seria para todos mis ToDos
//A un handler se le pasa una funcion que interactue con la base de Datos
//Se hace asincrono para que no tarde en responder de mas 
// la funcion recibe dos parametros especiales Request=  trae informacion de la peticion  Response= 
Requesthandler.get("/to-dos", async (request, response) => {
    //Se usa try-catch para manejar errores
    try{
        //mando llamar la utilidad a la base de datos
        const  dbHandler = await getDBHandler();

        //mando a llamar todos los to-dos usando la funcion all
        const todos = await dbHandler.all("SELECT * FROM todos");

        //Cerrar conexion a BD
        await  dbHandler.close();

        //Si encuentra algun problema devolver este mesnaje al usuario 
        if(!todos || !todos.length){
            return  response.status(404).send({mensaje: "ToDos Not found"}).end();
        }
        //Si no hay ningun problema devolver los ToDos
        response.send({ todos });

    }catch(error){
        //Para que nos indique de que se tratas el error
        response.status(500).send({
            error: `Somethings went wrong when trying to get the to dos list:`,
        errorInfo: error.message,
    });
    }
});

Requesthandler.post("/to-dos", async (request, response)=>{
    //Se usa try-catch para manejar errores
    try{
        const {title, description, isDone: is_done} = request.body;

        // mantenemos el dbhandler
        const dbHandler = await getDBHandler();

        const newTodo = await dbHandler.run(`
            INSERT INTO todos (title, description, is_done)
            VALUES (
                '${title}',
                '${description}',
                '${is_done}'
            )
        `);
        await dbHandler.close();

        //decir al usuario que si no hay ToDo que cree uno 
        response.send({newTodo: {title, description, is_done, ...newTodo}});

    }
    catch(error){
        //Para que nos indique de que se trata el error
        response.status(500).send({
            error: `Somethings went wrong when trying to create a new to do:`,
        errorInfo: error.message,
    });
    }
});

Requesthandler.patch("/to-dos/:id", async (request, response)=>{
    //Se usa try-catch para manejar errores
    try {
        const todoId = request.params.id;
        const dbHandler = await getDBHandler();

        const { title, description, isDone: is_done } = request.body;
        
        const todoToUpdate = await dbHandler.get(
            "SELECT * FROM todos WHERE id = ?",
            todoId
        );

        await dbHandler.run(
            `UPDATE todos SET title = ?, description = ?, is_done = ?
            WHERE id = ?`,
            title || todoToUpdate.title,
            description || todoToUpdate.description,
            is_done !== undefined ? is_done : todoToUpdate.is_done,
            todoId
        );

        const updatedTodo = await dbHandler.get(
            "SELECT * FROM todos WHERE id = ?",
            todoId
        );

        await dbHandler.close();

        response.send({ updatedTodo });
    }
    catch(error){
        //Para que nos indique de que se trata el error
        response.status(500).send({
            error: `Somethings went wrong when trying to update a the to do:`,
        errorInfo: error.message,
    });
    }
});

Requesthandler.delete("/to-dos/:id", async (request, response)=>{
    //Se usa try-catch para manejar errores
    try {
        const todoId = request.params.id;

        const dbHandler = await getDBHandler();

        const deletedTodo = await dbHandler.run(
            "DELETE FROM todos WHERE id = ?",
            todoId
        );

        await dbHandler.close();

        response.send({ todoRemoved: {...deletedTodo}});
        
    } 
    catch(error){
        //Para que nos indique de que se trata el error
        response.status(500).send({
            error: `Somethings went wrong when trying to delete a to do:`,
        errorInfo: error.message,
    });
    }
});


//exportamos el requestHandler

module.exports = Requesthandler;