const { response } = require("express");

const getTrip = (req,res = response)=> {

    res.json({
        ok: true,
        msg: 'getTrip'
    });
}
const postTrip = (req,res = response)=> {

    res.json({
        ok: true,
        msg: 'postTrip'
    });
}


module.exports = {
    getTrip,
    postTrip
}