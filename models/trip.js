const { Schema, model } = require('mongoose');
const TripSchema = Schema({
    origen: {
        type: String,
        required: [true, 'El Origen es obligatorio'],
    },
    destino: {
        type: String,
        required: true,
    },
    recibidoPor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    cargamento: {
        type: String,
        required:true,

    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    conductor: {
        type: Schema.Types.ObjectId,
        ref:'Conductor',
        required: true,
    }
});
TripSchema.methods.toJSON = function () {
    const { __v,_id, ...data } = this.toObject();
    data.uid = _id;
    return data;
}
module.exports = model('Trip', TripSchema);