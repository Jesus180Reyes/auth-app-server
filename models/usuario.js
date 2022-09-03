const { Schema, model } = require('mongoose');
const UsuarioSchema = Schema({
    rnp : {
        type: String,
        required: [true,"El rnp es obligatorio"],
    },
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
    isOnline: {
        type:Boolean,
        default:false,  
    },
    img:{
        type: String,
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
    const { __v,_id,password,estado, ...data } = this.toObject();
    data.uid = _id;
    return data;
}
module.exports = model('Usuario', UsuarioSchema);