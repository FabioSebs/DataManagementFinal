import bcrypt from 'bcryptjs';


export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)
    console.log(hash)
    return hash
}

export const comparePassword = (password, hash) => {
    const check = bcrypt.compareSync(password, hash)
    return check
}