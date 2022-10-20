import mongoose from 'mongoose'

const sugerencia = mongoose.Schema({

    status: {
        type: Boolean,
        default: false
    },
    type: {
        type: Number,
        default: 0
    },
    objecionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Objeciones', required: false },
    objecion: String,
    rtas: {
        type: Array,
        default: []
    },
    autor: String,
    createdAt : {
        type: Date,
        default: new Date()
    }

}
)

const Sugerencia = mongoose.model('Sugerencias', sugerencia);

export default Sugerencia;