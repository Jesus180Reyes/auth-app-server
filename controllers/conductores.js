const { red } = require("colors");
const { response, request } = require("express");
const Conductor = require("../models/conductor");
const {generarJWT }  = require('../helpers/jwt');
const getConductores = async(req,res = response)=> {
    const [total, usuarios] = await Promise.all([
        await Conductor.countDocuments({estado: true}),
         await Conductor.
        
        find({estado: true})
        .populate('createdBy', 'nombre email')
        .sort('-isOnline'),

    ]);
    res.json({
        ok: true,
        total,
        usuarios,
    });
   
}
const getConductor = async (req, res = response) => {
    const {rnp} = req.params;
   
        const conductor = await Conductor.findOne({rnp, estado:true})
                                                    .populate('createdBy', 'nombre email');

        if(!conductor){
            return res.status(404).json({
                ok: false,
                msg: "El conductor solicitado no existe"
            });
        }
       
    res.json({
        ok: true,
        conductor,
    });     
}
const putConductores = async(req = request,res= response) => {
    const {usuario: optimizadoPor} = req;
    const {id} = req.params;
    const {plate,vehiculo,rnp, _id,estado,isOnline, ...data} = req.body;
    const usuario = await Conductor.findByIdAndUpdate(id,data, {new:true});
    const existeConductor  = await Conductor.findById(id);
    if(!existeConductor){
        return res.status(404).json({
            ok:false,
            msg: "El Id No existe "+ id,
        });
    } 
    
    if(data.estado === false){
        return res.status(401).json({
            ok: false,
            msg : "El Usuario esta baneado de la plataforma"
        });
    }
    
    res.json({
        ok: true,
        usuario,
        optimizadoPor,
    });
}
const postConductores =async (req,res = response)=> {

    try {
        const {usuario: optimizadoPor} = req;
        const createdBy = optimizadoPor;
        const {rnp, nombre, vehiculo, plate,} = req.body;
        const conductor =  new Conductor({rnp,nombre,vehiculo,plate,createdBy});
        const existeRnp = await Conductor.findOne({rnp});
        if(existeRnp) {
            return res.status(401).json({
                ok:false,
                msg : "El Conductor Ya existe",
            });
        }
        const token = await generarJWT(conductor.id);
        await conductor.save();
        
        res.status(201).json({
            ok:true,
            conductor,
            token

        });


    } catch (error) {
        console.log(red.error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador: ' + error,
        });
    }
}


module.exports = {
    getConductores,
    postConductores,
    putConductores,
    getConductor
}