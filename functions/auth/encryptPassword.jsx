import bcrypt from 'bcryptjs';

const EncryptPassword = async (password)=>{
    try {
        if(!password) throw new Error("Error: Password is empty");
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        
        return password;

    } catch (error) {
        return {error: error};    
    }
}

export default EncryptPassword;

