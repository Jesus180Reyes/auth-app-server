const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Conductor = require("../models/conductor");
const Usuario = require("../models/usuario");


const validarJWTConductores = async (req = request, res = response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const conductor = await Conductor.findById(uid);
        
        if (!conductor) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en la DB'
            });

        }
        if (!conductor.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado : false'
            });

        }

        req.usuario = conductor;

        next();

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            msg: 'Token no valido'
        });
    }




}



module.exports = {
    validarJWTConductores
}