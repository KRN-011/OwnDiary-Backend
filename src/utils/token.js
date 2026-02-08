import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

// generate token
export const generateToken = (user) => {
    try {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
        return token
    } catch (error) {
        throw error
    }
}

// verify token
export const verifyToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET)
        return decodedToken
    } catch (error) {
        throw error
    }
}