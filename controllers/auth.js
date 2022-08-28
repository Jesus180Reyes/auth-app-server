const { red } = require("colors");
const { response } = require("express");
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');

const login = async(req, res = response)=> {
   
    try {

        const {email, password} = req.body;
        const usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(401).json({
                ok:false,
                msg:"Usuario o Contrasena Incorrectas"
            });
        }
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(401).json({
                ok: false,
                msg:"Usuario o Contrasena Incorrectas"
            });
        }
         const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(red.bold.error);
        res.status(500).json({
            ok:false,
            error
        });
        
    }

}


module.exports = {
    login,
}