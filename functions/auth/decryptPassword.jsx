import bcrypt from 'bcryptjs'; 

const DecryptPassword = async (LoginPassword, databasePassword) => {
    try {
        if (!LoginPassword || !databasePassword) {
            throw new Error("Password is empty");
        }
        const result = await bcrypt.compare(LoginPassword, databasePassword);
        if(!result) throw new Error("Password is wrong");
        return result;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export default DecryptPassword;