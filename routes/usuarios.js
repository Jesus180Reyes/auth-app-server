const { Router } = require("express");
const { check } = require("express-validator");
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } = require("../controllers/usuarios");
const { existeUsuarioPorId, existeEmail } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get('/', [
   
], getUsuarios), 

router.post('/', [
    check('email', "El email es obligatorio").isEmail(),
    check('email').custom(existeEmail),
    check('nombre',"El nombre es obligatorio").not().isEmpty(),
    check('password',"El password es obligatorio").not().isEmpty(),
    check('password',"El password debe ser mayor a 6 caracteres").isLength({min:6}),
    validarCampos
], postUsuarios), 

router.put('/:id', [
    check('id' ,"Id no valido ingresa uno valido").isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarJWT,
    validarCampos
], putUsuarios), 

router.delete('/:id', [
    check('id' ,"Id no valido ingresa uno valido").isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], deleteUsuarios), 





module.exports = router;