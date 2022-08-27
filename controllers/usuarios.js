const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require('bcryptjs');
const { red } = require("colors");

const getUsuarios = async(req, res = response)=> {
    const {limite , desde } = req.query;
    const query = {estado: true};
    const [total, usuarios] =  await Promise.all([
        await Usuario.countDocuments(query),
        await Usuario.find(query)
        .skip(Number(desde ))
        .limit(Number(limite))

    ]);
    res.json({
        ok:true,
        total,
        usuarios
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
     return  res.status(500).json({
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