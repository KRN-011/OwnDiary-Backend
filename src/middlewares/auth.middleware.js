import { verifyToken } from "../utils/token.js";

// auth middleware
export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if(!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        const decodedToken = verifyToken(token)

        req.user = decodedToken

        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}