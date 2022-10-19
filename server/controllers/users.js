import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) =>{
    const user = req.body
    console.log(user)
    try{
        var userLogin = await User.find({
                                        mail: user.username,
                                        password: user.password,
                                    }).exec()


        if(userLogin.length>0){
            const token = jwt.sign({user: userLogin}, 'secretkey')
            res.status(200).json({error:0, token, user:userLogin[0]})
        }else{
            res.json({error: 1, message: "User not found."})
        }
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const isAdmin = async (req, res) =>{
    const user = req.body

    try{
        var userLogin = await User.find({
                                        mail: user.mail,
                                        name: user.name,
                                    }).exec()



        if(userLogin.length>0 && userLogin[0].level == 9){
            
            res.status(200).json({error:0, level : "admin"})
        }else{
            res.json({error: 1, message: "Access not granted."})
        }
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const createUser = async (req, res) =>{
    const user = req.body
    const newUser = new User(user);
    
    try{
        // if (newSugerencia.type == 0) {
            await newUser.save();
        // }else if(newSugerencia.type == 1){
        //     await newSugerencia.save().then(s => s.populate('objecionId').execPopulate())
        // }
            
        console.log('pareciera que se subio', newUser)
        res.status(201).json({newUser})
    }catch(error){
        res.status(409).json({message: error.message})
    }
}

export const updateUser = async (req, res) =>{

    const user = req.body.user;
    const id = req.body.id;
    const filter = {_id: id}
    var userToUpdate = await User.findOneAndUpdate(filter, user, {new: true})

    try{                            
        res.status(201).json(userToUpdate)
            
    }catch(error){
        res.status(409).json({message: error.message})
    }

}

export const getAllUsers = async (req, res)=>{
    

    // var tipo =  query.tipo;
    // if(query.tipo === ''){
    //     tipo = {
    //         $exists: true
    //     }
    // }
    
    try{
        const users = await User.find().sort({createdAt: 'desc'}).exec();
                    
        res.status(200).json(users)
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const deleteUser = async (req, res)=>{
    
    const id = req.params.id;
    await User.findByIdAndRemove(id)
    res.json({message: 'User deleted succesfully', id: id})

}