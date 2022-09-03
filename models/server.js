const express = require('express');
const cors = require('cors');
const { dbConecction } = require('../db/config');
const fileUpload = require('express-fileupload');
class Server {
    

    constructor() {
        // Inicializar variables
        this.port = process.env.PORT;
        this.app = express();
        // MiddleWare;
        this.middlewares();
        // Path de usuarios
        this.paths = {
            usuarios: '/api/usuarios',
            auth: '/api/auth/usuarios',
            trip: '/api/trips',
            conductores :'/api/conductores',
            uploads :'/api/uploads',
      
        };
        // this.usuariosPath = '/api/usuarios';
        // this.authPath = '/api/auth';
        // Conectar a Base DE datos
        this.DbConecction();

        // Rutas de la API
        this.routes();

    }
    async DbConecction() {
        await dbConecction();
    }
    middlewares() {
        // Cors
        // Parseo y lectura de datos de body
        this.app.use(express.json());

        this.app.use(cors());
        this.app.use(express.static('public'));
        // File Upload
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true,
        }));
    }
    routes() {
       
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.conductores, require('../routes/conductores'));
        this.app.use(this.paths.uploads, require('../routes/upload'));
        this.app.use(this.paths.trip, require('../routes/trip'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;