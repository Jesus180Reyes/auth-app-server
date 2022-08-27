const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require('bcryptjs');
const { red } = require("colors");

const getUsuarios = (req, res = response)=> {


    res.json({
        msg:"Usuarios get"
    });
}
const postUsuarios = async(req, res = response)=> {

    try {
        const {nombre,email,password} = req.body;

        const usuario  = new Usuario({nombre,email,password});
        const existeUsuario = await Usuario.findOne({email});
        if(existeUsuario) {
            return res.status(400).json({
                ok:false,
                msg: `El Usuario ${email} ya esta registrado`
            });
        }
        const salt = bcryptjs.genSaltSync();
        usuario.password =  bcryptjs.hashSync(password,salt);
        await usuario.save();
        res.status(201).json({
            ok:true,
            usuario,
        });
        
    } catch (error) {
        console.error(red.error);
       res.status(500).json({
        ok: false,
        msg:"Hable con el administrador!! " + error
       });
    }
  
}
const putUsuarios = (req, res = response)=> {


    res.json({
        msg:"Usuarios put"
    });
}
const deleteUsuarios = (req, res = response)=> {


    res.json({
        msg:"Usuarios delete"
    });
}


module.exports = {
    getUsuarios,
    deleteUsuarios,
    putUsuarios,
    postUsuarios
}