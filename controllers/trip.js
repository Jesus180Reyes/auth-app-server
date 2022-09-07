const { response, request } = require("express");
const Trip = require('../models/trip');
const getTrips = async(req, res = response) => {
    const [trip,total] =await  Promise.all([
        await Trip.find()
        .sort({_id:-1})
        .populate('recibidoPor', 'nombre email')
        .populate('conductor', 'nombre rnp'),
        await Trip.countDocuments(),
    ]);
    res.json({
        ok: true,
        total,
        trip,
    });                     

}
const getTrip = async(req = request, res = response) => {
    
    const {id} = req.params;
   
        const trip = await Trip.findById(id)
        .populate('recibidoPor', 'nombre email')
        .populate('conductor', 'nombre rnp');
      
 
    res.json({
        ok: true,
        trip,
    });                     

}
const postTrip = async(req, res = response) => {
    try {
        const {  id: uid } = req.usuario;
        const { origen, destino,cargamento,conductor } = req.body;
        const recibidoPor = uid
        const trip =  new Trip({origen,destino,cargamento, conductor,recibidoPor});
     
        await trip.save();
        res.json({
            ok: true,
            trip
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador " + error
        });

    }

}


module.exports = {
     getTrips,
     getTrip,
    postTrip,
}