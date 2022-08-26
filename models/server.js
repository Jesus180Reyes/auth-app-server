const express = require('express');
const cors = require('cors');
class Server {

    constructor() {
        // Inicializar variables
        this.port = process.env.PORT;
        this.app = express();
        // MiddleWare;
        this.middlewares();
        // Path de usuarios
        this.paths = {
            usuaerios: '/api/usuarios',
      
        };
        // this.usuariosPath = '/api/usuarios';
        // this.authPath = '/api/auth';
        // Conectar a Base DE datos
        // this.DbConecction();

        // Rutas de la API
        this.routes();

    }
    // async DbConecction() {
    //     await dbConecction();
    // }
    middlewares() {
        // Cors
        // Parseo y lectura de datos de body
        this.app.use(express.json());

        this.app.use(cors());
        this.app.use(express.static('public'));
        // File Upload
        // this.app.use(fileUpload({
        //     useTempFiles: true,
        //     tempFileDir: '/tmp/',
        //     createParentPath: true,
        // }));
    }
    routes() {
       
        this.app.use(this.paths.usuaerios, require('../routes/usuarios'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;