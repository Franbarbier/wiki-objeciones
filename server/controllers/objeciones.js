import Objecion from '../models/Objecion.js';



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
    const obj = req.body;
    const newObj = new Objecion(obj);
    try{
        await newObj.save();
        console.log('pareciera que se subio')
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

    // const cliente = req.body;
    // const filter = {_id: cliente._id}
    // var clienteToUpdate = await Cliente.findOneAndUpdate(filter, cliente, {new: true})

    // try{                            
    //     res.status(201).json(clienteToUpdate)
            
    // }catch(error){
    //     res.status(409).json({message: error.message})
    // }

}