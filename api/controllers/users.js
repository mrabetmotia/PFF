import User from '../model/User'

 const createUser= async (req, res) => {
    const users= await User.create(req.body)
    return res.send(users)
 }
 
 const getALLUser = async (req, res) => {
     const users= await User.find()
     return res.send(users)
 }

 const deleteUser = async (req, res) => {
    const users = await User.findByIdAndDelete(req.params.id);
    return res.send(users);
}

const updateUser = async (req, res) => {
    const users = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
    return res.send(users);
}
 
 export  { createUser, getALLUser,deleteUser ,updateUser}