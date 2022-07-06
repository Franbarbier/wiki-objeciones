import mongoose from 'mongoose'

const objecion = mongoose.Schema({

    status: {
        type: Boolean,
        default: true
    },
    objecion: String,
    rtas: Array,
    tags: Array,
    category: String,
    createdAt : {
        type: Date,
        default: new Date()
    }

}
)

const Objecion = mongoose.model('Objecions', objecion);

export default Objecion;