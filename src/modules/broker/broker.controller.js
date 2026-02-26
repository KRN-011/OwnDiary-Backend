import { createBrokerService, getAllBrokersService } from "./broker.service.js";



// Create Broker
export const createBrokerController = async (req, res) => {
    try {
        const { name } = req.body;

        const userId = req.user.id;

        // Call Service
        const createBrokerServiceRes = await createBrokerService({ name, userId })

        if (!createBrokerServiceRes.success) {
            return res.status(createBrokerServiceRes.statusCode).json({
                success: false,
                message: createBrokerServiceRes.message
            })
        }

        return res.status(createBrokerServiceRes.statusCode).json({
            success: true,
            message: createBrokerServiceRes.message,
            data: createBrokerServiceRes.data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

// Get All Brokers
export const getAllBrokersController = async (req, res) => {
    try {
        const userId = req.user.id;

        // Call Service
        const getAllBrokersServiceRes = await getAllBrokersService({ userId })

        if (!getAllBrokersServiceRes.success) {
            return res.status(getAllBrokersServiceRes.statusCode).json({
                success: false,
                message: getAllBrokersServiceRes.message
            })
        }

        return res.status(getAllBrokersServiceRes.statusCode).json({
            success: true,
            message: getAllBrokersServiceRes.message,
            data: getAllBrokersServiceRes.data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}