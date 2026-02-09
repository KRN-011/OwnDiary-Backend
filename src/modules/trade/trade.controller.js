import { pagination } from "../../utils/pagination.js";
import { createTradeService, deleteTradeService, getAllTradesService, updateTradeService } from "./trade.service.js";


// Create Trade
export const createTradeController = async (req, res) => {
    try {
        const { date, day, time, symbol, segment, tradeType, entryPrice, quantity, stoplossPrice, exitPrice, netProfit, isRulesFollowed, remarkOnTrade } = req.body;

        const userId = req.user.id;

        // Call Service
        const createTradeServiceRes = await createTradeService({ date, day, time, symbol, segment, tradeType, entryPrice, quantity, stoplossPrice, exitPrice, netProfit, isRulesFollowed, remarkOnTrade, userId })

        if (!createTradeServiceRes.success) {
            return res.status(createTradeServiceRes.statusCode).json({
                success: false,
                message: createTradeServiceRes.message
            })
        }

        return res.status(createTradeServiceRes.statusCode).json({
            success: true,
            message: createTradeServiceRes.message,
            data: createTradeServiceRes.data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

// Get All Trades
export const getAllTradesController = async (req, res) => {
    try {
        const { page, limit, day, symbol, segment, tradeType, isRulesFollowed, startDate, endDate, sortBy, sortOrder } = req.query;

        const userId = req.user.id;

        const paginationData = await pagination({ page, limit })

        // Call Service
        const getAllTradesServiceRes = await getAllTradesService({ userId, paginationData, day, symbol, segment, tradeType, isRulesFollowed, startDate, endDate, sortBy, sortOrder })

        if (!getAllTradesServiceRes.success) {
            return res.status(getAllTradesServiceRes.statusCode).json({
                success: false,
                message: getAllTradesServiceRes.message
            })
        }

        return res.status(getAllTradesServiceRes.statusCode).json({
            success: true,
            message: getAllTradesServiceRes.message,
            data: getAllTradesServiceRes.data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

// Update Trade
export const updateTradeController = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, day, time, symbol, segment, tradeType, entryPrice, quantity, stoplossPrice, exitPrice, netProfit, isRulesFollowed, remarkOnTrade } = req.body;

        const userId = req.user.id;

        // Call Service
        const updateTradeServiceRes = await updateTradeService({ id, date, day, time, symbol, segment, tradeType, entryPrice, quantity, stoplossPrice, exitPrice, netProfit, isRulesFollowed, remarkOnTrade, userId })

        if (!updateTradeServiceRes.success) {
            return res.status(updateTradeServiceRes.statusCode).json({
                success: false,
                message: updateTradeServiceRes.message
            })
        }

        return res.status(updateTradeServiceRes.statusCode).json({
            success: true,
            message: updateTradeServiceRes.message,
            data: updateTradeServiceRes.data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

// Delete Trade
export const deleteTradeController = async (req, res) => {
    try {
        const { id } = req.params;

        const userId = req.user.id;

        // Call Service
        const deleteTradeServiceRes = await deleteTradeService({ id, userId })

        if (!deleteTradeServiceRes.success) {
            return res.status(deleteTradeServiceRes.statusCode).json({
                success: false,
                message: deleteTradeServiceRes.message
            })
        }

        return res.status(deleteTradeServiceRes.statusCode).json({
            success: true,
            message: deleteTradeServiceRes.message,
            data: deleteTradeServiceRes.data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}