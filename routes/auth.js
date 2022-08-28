const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");

const router = Router();

router.post('/',[
    check('email', 'El Email es obligatorio').isEmail(),
    check('password', 'El Password es obligatorio').not().isEmpty(),
],login);



module.exports = router;
