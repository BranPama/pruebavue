const express = require("express");
const router = express.Router();

const {
    crearUsuario,
    loginUsuario,
    //generateToken,
} = require("../controllers/auth_controller.js");


router.post("/registrar_usuario", crearUsuario);
router.post("/login_usuario", loginUsuario);
//router.get("/ruta_protegida", generateToken);





module.exports = router;