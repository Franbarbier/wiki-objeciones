import Objecion from '../models/objecion.js';



export const getObjeciones = async (req, res)=>{
    

    // var tipo =  query.tipo;
    // if(query.tipo === ''){
    //     tipo = {
    //         $exists: true
    //     }
    // }
    
    try{
        const objeciones = await Objecion.find().sort({createdAt: 'desc'});
                    
        res.status(200).json(objeciones)
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const createObjecion = async(req, res) =>{
    const obj = req.body.final_objecion;
    console.log(obj)
    const newObj = new Objecion(obj);
    try{
        await newObj.save();
        console.log('pareciera que se subio', newObj)
        res.status(201).json({newObj})
    }catch(error){
        res.status(409).json({message: error.message})
    }

}

export const deleteObjecion = async (req, res)=>{
    
    const id = req.params.id;
    await Objecion.findByIdAndRemove(id)
    res.json({message: 'Objecion deleted succesfully', id: id})

}

export const updateObjecion = async (req, res) =>{

    const objecion = req.body.objecionObj;
    const filter = {_id: objecion._id}
    var objecionToUpdate = await Objecion.findOneAndUpdate(filter, objecion, {new: true})

    try{                            
        res.status(201).json(objecionToUpdate)
            
    }catch(error){
        res.status(409).json({message: error.message})
    }

}