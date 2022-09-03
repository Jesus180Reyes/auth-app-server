const { response } = require("express");
const subirArchivo = require('../helpers/subir-archivo');
const fs = require('fs');
const Usuario = require("../models/usuario");
const path = require('path');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);
const cargarArchivos = async (req, res = response) => {



    try {
        const nombre = await subirArchivo(req.files, undefined, 'imgs');

        res.json({
            ok: true,
            nombre,
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: error
        });

    }
}
const actualizarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;
    const usuario = await Usuario.findById(id);
    if (usuario.img) {
        const pathJoin = path.join(__dirname, '../uploads', coleccion, usuario.img);
        if (fs.existsSync(pathJoin)) {
            fs.unlinkSync(pathJoin);
        }
    }
    usuario.img = await subirArchivo(req.files, undefined, coleccion);
    await usuario.save();

    if (!usuario) {
        return res.status(400).json({
            ok: false,
            msg: `No existe un usuario con el id ${id}`,
        });
    }

    res.json({
        ok: true,
        usuario

    });
}
const actualizarCloudinary = async (req, res = response) => {

    const { id, coleccion } = req.params;
    const usuario = await Usuario.findById(id);
    if (usuario.img) {
        const nombreArry =usuario.img.split('/');
        const nombre = nombreArry[nombreArry.length -1];
        const [public_id] = nombre.split('.');
         cloudinary.uploader.destroy(public_id);

    }
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath, { height: 300, width: 300, crop: 'fill' });
    usuario.img = secure_url;
    await usuario.save();

    res.json({
        ok: true,
        usuario
    });
}

const mostrarImagen = async (req, res = response) => {
    const { id, coleccion } = req.params;
    const usuario = await Usuario.findById(id);
    if (usuario.img) {
        const pathJoin = path.join(__dirname, '../uploads', coleccion, usuario.img);
        if (fs.existsSync(pathJoin)) {
            return res.sendFile(pathJoin);
        }
    }
    if (!usuario) {
        return res.status(400).json({
            ok: false,
            msg: `No existe un usuario con el id ${id}`,
        });
    }
    const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImagen);

}

module.exports = {
    cargarArchivos,
    actualizarImagen,
    mostrarImagen,
    actualizarCloudinary
}