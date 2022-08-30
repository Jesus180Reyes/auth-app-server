const { Router } = require("express");
const { check } = require("express-validator");
const { getTrips, postTrip, getTrip } = require("../controllers/trip");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { existeTripPorId } = require("../helpers/db-validators");


const router = Router();

router.get('/',[],getTrips);
router.get('/:id',[
    check('id', "ID no valido").isMongoId(),
    check('id').custom(existeTripPorId),
    validarCampos,
],getTrip);
router.post('/',[
    check('origen', "El origen es requerido").not().isEmpty(),
    check('destino', "El destino es requerido").not().isEmpty(),
    check('cargamento', "El Cargamento  es requerido").not().isEmpty(),
    check('conductor', "Id no valido ").isMongoId(),
    validarJWT,
    validarCampos
], postTrip);


module.exports = router;