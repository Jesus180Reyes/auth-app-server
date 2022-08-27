const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors,
            msg:"Error en la validacion " + errors.errors[0].msg
        });
    }
    next();
}


module.exports = {validarCampos};