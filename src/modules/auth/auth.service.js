import { EMAIL_REGEX, PASSWORD_REGEX } from "../../constants/generalConstants.js"
import prisma from "../../prisma/client.js"
import { comparePassword, hashPassword } from "../../utils/hash.js"
import { generateToken } from "../../utils/token.js"


// register user
export const registerUserService = async ({ username, email, password }) => {
    try {

        // Validate Email
        if (!email) {
            return { success: false, statusCode: 400, message: 'Email is required' }
        }

        if (!EMAIL_REGEX.test(email)) {
            return { success: false, statusCode: 400, message: 'Invalid Email' }
        }

        // Validate Password
        if (!password) {
            return { success: false, statusCode: 400, message: 'Password is required' }
        }

        if (!PASSWORD_REGEX.test(password)) {
            return { success: false, statusCode: 400, message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character' }
        }

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
        // Validate Email
        if (!email) {
            return { success: false, statusCode: 400, message: 'Email is required' }
        }

        // Validate Password
        if (!password) {
            return { success: false, statusCode: 400, message: 'Password is required' }
        }

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