import mongoose from 'mongoose'

const objecion = mongoose.Schema({

    status: {
        type: Boolean,
        default: true
    },
    objecion: {
        type: String,
        default: 'Objeción sin titulo'
    },
    tags: Array,
    autor: String,
    category: String,
    createdAt : {
        type: Date,
        default: new Date()
    }

}
)

const Objecion = mongoose.model('Objeciones', objecion);

export default Objecion;