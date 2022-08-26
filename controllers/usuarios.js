const { response } = require("express");

const getUsuarios = (req, res = response)=> {


    res.json({
        msg:"Usuarios get"
    });
}
const postUsuarios = (req, res = response)=> {


    res.json({
        msg:"Usuarios post"
    });
}
const putUsuarios = (req, res = response)=> {


    res.json({
        msg:"Usuarios put"
    });
}
const deleteUsuarios = (req, res = response)=> {


    res.json({
        msg:"Usuarios delete"
    });
}


module.exports = {
    getUsuarios,
    deleteUsuarios,
    putUsuarios,
    postUsuarios
}