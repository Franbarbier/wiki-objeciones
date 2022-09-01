import mongoose from 'mongoose'

const respuesta = mongoose.Schema({

    status: {
        type: Boolean,
        default: true
    },
    objecion: { type: mongoose.Schema.Types.ObjectId, ref: 'Objeciones', required: true },
    rta: String,
    nombre: String,
    variaciones: Array,
    autor: String,
    createdAt : {
        type: Date,
        default: new Date()
    }

}
)

const Respuesta = mongoose.model('Respuestas', respuesta);

export default Respuesta;