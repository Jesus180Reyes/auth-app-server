const { Router } = require("express");
const { cargarArchivos } = require("../controllers/uploads");




const router = Router();

router.post('/', cargarArchivos)

module.exports = router