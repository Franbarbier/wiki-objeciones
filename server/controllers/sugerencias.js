import Sugerencia from '../models/sugerencia.js';



export const getSugerencias = async (req, res)=>{
    
    
    try{
        const sugerencias = await Sugerencia.find().populate('objecionId').sort({createdAt: 'desc'}).exec();
                    
        res.status(200).json(sugerencias)
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const createSugerencia = async(req, res) =>{
    const sugerencia = req.body
    const newSugerencia = new Sugerencia(sugerencia);
    
    try{
        console.log(newSugerencia.type)
        if (newSugerencia.type == 0) {
            await newSugerencia.save();
        }else if(newSugerencia.type == 1){
            await newSugerencia.save().then(s => s.populate('objecionId').execPopulate())
        }
            
        console.log('pareciera que se subio', newSugerencia)
        res.status(201).json({newSugerencia})
    }catch(error){
        res.status(409).json({message: error.message})
    }

}

export const deleteSugerencia = async (req, res)=>{
    
    const id = req.params.id;
    await Sugerencia.findByIdAndRemove(id)
    res.json({message: 'Sugerencia deleted succesfully', id: id})

}

export const updateSugerencia = async (req, res) =>{

    const sugerencia = req.body;
    const filter = {_id: sugerencia._id}
    var sugerenciaToUpdate = await Sugerencia.findOneAndUpdate(filter, sugerencia, {new: true})

    try{                            
        res.status(201).json(sugerenciaToUpdate)
            
    }catch(error){
        res.status(409).json({message: error.message})
    }

}