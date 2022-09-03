const { Router } = require("express");
const { cargarArchivos, actualizarImagen, mostrarImagen, actualizarCloudinary } = require("../controllers/uploads");
const { validarCampos }  = require('../middlewares/validar-campos');
const {check} = require('express-validator');
const validarArchivos = require("../middlewares/validar-archivos");
const { existeUsuarioPorId } = require("../helpers/db-validators");



const router = Router();

router.post('/',validarArchivos, cargarArchivos);

router.put('/:coleccion/:id', [
    validarArchivos,
    check('id', "El id debe ser de Mongo").isMongoId(),
    validarCampos
    
], actualizarCloudinary);

router.get('/:coleccion/:id',[
   check('id').custom(existeUsuarioPorId),
    check('id', "El id debe ser de Mongo").isMongoId(),
    validarCampos
],mostrarImagen);

module.exports = router