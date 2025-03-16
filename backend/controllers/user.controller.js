export const registerUser = async (req, res) => {
    res.status(200).json({ message: 'Hello from register user' });
}
export const loginUser = async (req, res) => {
    res.status(200).json({ message: 'Hello from login user' });
}
export const logoutUser=async(req,res)=>{
    res.status(200).json({message:'Hello from logout user'});   
}
