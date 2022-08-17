import Respuesta from '../models/respuesta.js';



export const getRespuestas = async (req, res)=>{
    

    // var tipo =  query.tipo;
    // if(query.tipo === ''){
    //     tipo = {
    //         $exists: true
    //     }
    // }
    
    try{
        const respuestas = await Respuesta.find().populate('objecion').sort({createdAt: 'desc'}).exec();
                    
        res.status(200).json(respuestas)
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const createRespuesta = async(req, res) =>{
    const obj = req.body;
    console.log(obj)
    const newObj = new Respuesta(obj);
    try{
        await newObj.save();
        console.log('pareciera que se subio', newObj)
        res.status(201).json({newObj})
    }catch(error){
        res.status(409).json({message: error.message})
    }

}

export const deleteRespuesta = async (req, res)=>{
    
    const id = req.params.id;
    await Respuesta.findByIdAndRemove(id)
    res.json({message: 'Respuesta deleted succesfully', id: id})

}

export const updateRespuesta = async (req, res) =>{

    const respuesta = req.body;
    const filter = {_id: respuesta._id}
    var respuestaToUpdate = await Respuesta.findOneAndUpdate(filter, respuesta, {new: true})

    try{                            
        res.status(201).json(respuestaToUpdate)
            
    }catch(error){
        res.status(409).json({message: error.message})
    }

}