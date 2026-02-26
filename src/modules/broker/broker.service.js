import prisma from "../../prisma/client.js"

// create broker service
export const createBrokerService = async ({ name, userId }) => {
    try {
        // check if broker already exists
        const existingBroker = await prisma.broker.findFirst({ where: { name, userId } })

        if (existingBroker) {
            return { success: false, statusCode: 400, message: 'Broker already exists' }
        }

        // create broker
        const newBroker = await prisma.broker.create({ data: { name, userId } })

        return { success: true, statusCode: 201, message: 'Broker Created Successfully', data: newBroker }
    } catch (error) {
        console.log(error)
        return { success: false, statusCode: 500, message: 'Internal Server Error', error: error.message }
    }
}

// get all brokers service
export const getAllBrokersService = async ({ userId }) => {
    try {
        // get all brokers
        const brokers = await prisma.broker.findMany({ where: { userId }, select: { id: true, name: true, isDefault: true } })

        // return response
        return { success: true, statusCode: 200, message: 'Brokers Fetched Successfully', data: brokers }
    } catch (error) {
        console.log(error)
        return { success: false, statusCode: 500, message: 'Internal Server Error', error: error.message }
    }
}