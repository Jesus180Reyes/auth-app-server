const { Router } = require("express");
const { check } = require("express-validator");
const { getConductores, postConductores, putConductores, getConductor } = require("../controllers/conductores");
const { validarCampos} = require('../middlewares/validar-campos');
const { validarJWT} = require('../middlewares/validar-jwt');
const { validarJWTConductores } = require("../middlewares/validar-jwt-conductores");

const router = Router();

router.get('/',[],getConductores);
router.get('/:rnp',[
    check('rnp', "RNP no valido").isLength({min:13,max:13}),
    validarCampos
],getConductor);
router.post('/',[
    check('rnp', "El RNP es obligatorio").not().isEmpty(),
    check('rnp', "RNP no valido").isLength({min:13,max:13}),
    check('vehiculo', "El vehiculo es obligatorio").not().isEmpty(),
    check('plate', "la placa es obligatorio").not().isEmpty(),
    check('nombre', "el Nombre es obligatorio").not().isEmpty(),
    validarJWT,
    validarCampos,

], postConductores);
router.put('/:id', [
    check('id', "ID no es valido ").isMongoId(),
    validarJWTConductores,
    validarCampos,
], putConductores);


module.exports = router;