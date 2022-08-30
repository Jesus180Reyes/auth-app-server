const Trip = require('../models/trip');
const Usuario = require('../models/usuario');

const existeUsuarioPorId = async(id)=> {
    const existeUsuairoPorId = await Usuario.findById(id);

    if(!existeUsuairoPorId){
         throw new Error(`El id no existe: ${id}`);
    }  
 
}
const existeTripPorId = async(id)=> {
    const existeUsuairoPorId = await Trip.findById(id);

    if(!existeUsuairoPorId){
         throw new Error(`El id no existe: ${id}`);
    }  
 
}

const existeEmail = async (email)=> {
    const existeEmail = await Usuario.findOne({email});

    if(existeEmail){
        throw new Error(`El Correo ${email} ya existe`);
    }
}



module.exports  = {
    existeUsuarioPorId,
    existeEmail,
    existeTripPorId
}

 