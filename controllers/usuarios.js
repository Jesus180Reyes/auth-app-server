const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require('bcryptjs');
const { red } = require("colors");

const getUsuarios = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };
    const [total, usuarios] = await Promise.all([
        await Usuario.countDocuments(query),
        await Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))

    ]);
    res.json({
        ok: true,
        total,
        usuarios
    });
}
const postUsuarios = async (req, res = response) => {

    try {
        const { nombre, email, password } = req.body;

        const usuario = new Usuario({ nombre, email, password });
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);
        await usuario.save();


        res.status(201).json({
            ok: true,
            usuario,
        });

    } catch (error) {
        console.error(red.error);
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador!! " + error
        });
    }

}
const putUsuarios = async (req, res = response) => {

    const { id } = req.params;
    const { email, password, estado, _id, ...data } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();

        data.password = bcryptjs.hashSync(password, salt);
    }
    data.updatedAt = new Date();

    const usuario = await Usuario.findByIdAndUpdate(id, data, { new: true });

    res.json({
        ok: true,
        msg: "Usuario Actualizado Exitosamente",
        usuario,
    });
}
const deleteUsuarios = async (req, res = response) => {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    if (!usuario.estado) {
        return res.status(400).json({
            ok: false,
            msg: "El Usuario ya esta baneado"
        });
    }
    res.json({
        ok: true,
        usuario,
    });
}


module.exports = {
    getUsuarios,
    deleteUsuarios,
    putUsuarios,
    postUsuarios
}