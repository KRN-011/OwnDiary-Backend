import prisma from "../../prisma/client.js"
import { comparePassword, hashPassword } from "../../utils/hash.js"
import { generateToken } from "../../utils/token.js"


// register user
export const registerUserService = async ({ username, email, password }) => {
    try {

        // Find for existing user
        const user = await prisma.user.findUnique({
            where: { email }
        })

        // return if user already exist
        if (user) {
            return { success: false, statusCode: 400, message: 'User Already Exists' }
        }

        // Hash Password
        const hashedPassword = await hashPassword(password)

        // Create new User
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                hashedPassword
            }
        })

        // Return response
        return {
            success: true,
            statusCode: 201,
            message: 'User Registered Successfully',
            data: newUser
        }
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error'
        }
    }
}

// login user
export const loginUserService = async ({ email, password }) => {
    try {
        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { email }
        })

        // return if user already exists
        if(!user) {
            return {
                success: false,
                statusCode: 404,
                message: 'User Not Found'
            }
        }

        const hashedPassword = user.hashedPassword

        // Compare Password
        const isPasswordValid = await comparePassword(password, hashedPassword)

        // return if password is not valid
        if(!isPasswordValid) {
            return {
                success: false,
                statusCode: 401,
                message: 'Invalid Credentials'
            }
        }

        // Generate Token
        const token = generateToken(user)

        // return response
        return {
            success: true,
            statusCode: 200,
            message: 'User Logged in Successfully',
            data: {
                user,
                token
            }
        }
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error'
        }
    }
}