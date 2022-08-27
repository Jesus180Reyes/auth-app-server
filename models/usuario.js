const { Schema, model } = require('mongoose');
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El Nombre es obligatorio'],
    },
    email: {
         type: String,       
         required: true,
         unique:true
     },
     password: {
         type: String,       
         required: true,
     },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt : {
        type:Date,
        default: Date.now(),
    },

});
UsuarioSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}
module.exports = model('Usuario', UsuarioSchema);