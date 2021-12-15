import bcrypt from 'bcrypt'

export const isAdmin = ({ role }) => role == "admin" ? true : false



export const checkUser = async (password, passwordHash) => {
    const match = await bcrypt.compare(password, passwordHash);
    console.log("match", match);
    if (match) {
        return true
    }
    return false
}


export const hashPassword = async (password) => await bcrypt.hash(password, 10);