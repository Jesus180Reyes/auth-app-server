const { Router } = require("express");
const { check } = require("express-validator");
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get('/', [
   
], getUsuarios), 

router.post('/', [
    check('email', "El email es obligatorio").isEmail(),
    check('nombre',"El nombre es obligatorio").not().isEmpty(),
    check('password',"El password es obligatorio").not().isEmpty(),
    check('password',"El password debe ser mayor a 6 caracteres").isLength({min:6}),
    validarCampos
], postUsuarios), 

router.put('/', [], putUsuarios), 

router.delete('/', [], deleteUsuarios), 





module.exports = router;