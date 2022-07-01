// utilizando Open solo estamos importando la funcion que se llllama open 
const {open} = require("sqlite");

/*en esta parte importamos la libreria Sqlite3 por default que descargue
es decir exportan un objeto completo con todas las funciones */
const sqlite3 = require("sqlite3");

/*Se declara una funcion de tipo asincrona es decir que no se ejecutara de forma lineal
hara su trabajo sin tener que bloquear ninguna funcion, es decir si el codigo se ejecuta
de arriba hacia abajo  */

async function getDBHandler(){

    //Como es una funcion asincrona le coloco un try-catch para corroborar que no ocurra ningun error 
    //o en caso de ocurra un error tenerlo controlado

        //creamos un objeto que nos servira de manejador de la Base de datos 
        /*este objeto nos abrira la Base de Datos y nos permitira interactuar con la informacion que se encuentre 
        almacenada en el archivo database.sqlite (es extension sqlite porque se usa esa base de datos), entonces 
        si no encuentra el archivo o no existe lo debera crear y luego retorna una utilidad para poder acceder a los datos
        
        Drive nos permite realizar la coneccion a la BD

        await es para que si se tarda mucho y no encuentra el archivo mejor crea uno nuevo */
        try{
        const dbHandler = await open ({ 
            filename: "database.sqlite",
            driver: sqlite3.Database,
        });
        // en caso de que obtenga undefined o me devolviera algo inutilizable 
        // yo le dire que esperaba algo utilizable con el dbHandler.
        if(!dbHandler)
            throw new TypeError(`DB Handler expect, got ${dbHandler}`);
        
        return dbHandler;//modificador de datos

    //en caso de que todo el Try falle que me indique por que motivo es que falla
    }
    catch (error){
        console.error(
            "There was an error trying to get the DB Handler:",
        error.message
        );
        }
    }


/* voy a crear una funcion  llamada InitializeDB asincrona y como es asincrona se colocara dentro de un try-catch
por si algo ocurre estar enterados*/
    async function initializeDB(){
        try{
            //crear mi tabla haciendo uso de un manejador reutilizando la funcion anterior
            //que permite interactuar con la funcion, utilizando await para saber si el archivo existe o no y que lo cree
            const dbHandler = await getDBHandler();

            /*Para crear una tabla ejecuta lo siguiente haciendo uso de SQL para generar nuestra tabla 
            le diremos que cree la tabla en caso de que no exista*/
            await dbHandler.exec(`
            CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY,
                title TEXT,
                description TEXT,
                is_done INTEGER DEFAULT 0 
                )
            `);

            /*Cuando termine la ejecucion necesitamos que la conexion a la base de datos se cierre*/
            await dbHandler.close();
        
        }
            catch (error){
            console.error("There was an error trying to initiliaze the database: ",
            error.message
            );
            }
    }

        /*ponemos publicas las funciones para que puedan ser utilizadas por otros archivos  */
    module.exports = { initializeDB, getDBHandler };
