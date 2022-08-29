const { Schema, model } = require('mongoose');
const ConductorSchema = Schema({
    rnp:{
        type: Number,
        unique: true,
        required:[true, "El RNP es obligatorio"],

    },
    nombre: {
        type: String,
        required: [true, 'El Nombre es obligatorio'],
        unique: true,
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
    vehiculo:{
        type:String,
        required:[true, "El nombre del vehiculo es obligatorio"]
    },
    plate:{
        type:String,
        required:[true, "La Placa es obligatoria"],
    },
    isOnline: {
        type: Boolean,
        default: false,
    },
   
});
ConductorSchema.methods.toJSON = function () {
    const { __v,_id, ...data } = this.toObject();
    data._id = uid;
    return data;
}
module.exports = model('Conductor', ConductorSchema);