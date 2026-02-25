import { pagination } from "../../utils/pagination.js";
import { createTradeService, deleteTradeService, getAllTradesService, getTradeSymbolsService, tradeCardsAnalyticsService, tradeGraphAnalyticsService, tradeListAnalyticsService, updateTradeService } from "./trade.service.js";


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
            data: getAllTradesServiceRes.data,
            meta: getAllTradesServiceRes.meta
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

// Trade Cards Analytics
export const tradeCardsAnalyticsController = async (req, res) => {
    try {
        const userId = req.user.id;

        const { avgType, startDate, endDate } = req.query;

        // Call Service
        const tradeCardsAnalyticsServiceRes = await tradeCardsAnalyticsService({ userId, avgType, startDate, endDate })

        if (!tradeCardsAnalyticsServiceRes.success) {
            return res.status(tradeCardsAnalyticsServiceRes.statusCode).json({
                success: false,
                message: tradeCardsAnalyticsServiceRes.message
            })
        }

        return res.status(tradeCardsAnalyticsServiceRes.statusCode).json({
            success: true,
            message: tradeCardsAnalyticsServiceRes.message,
            data: tradeCardsAnalyticsServiceRes.data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

// Trade Graph Analytics
export const tradeGraphAnalyticsController = async (req, res) => {
    try {
        const userId = req.user.id;

        const { startDate, endDate } = req.query;

        // Call Service
        const tradeGraphAnalyticsServiceRes = await tradeGraphAnalyticsService({ userId, startDate, endDate })

        if (!tradeGraphAnalyticsServiceRes.success) {
            return res.status(tradeGraphAnalyticsServiceRes.statusCode).json({
                success: false,
                message: tradeGraphAnalyticsServiceRes.message
            })
        }
        
        return res.status(tradeGraphAnalyticsServiceRes.statusCode).json({
            success: true,
            message: tradeGraphAnalyticsServiceRes.message,
            data: tradeGraphAnalyticsServiceRes.data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

// Trade List Analytics
export const tradeListAnalyticsController = async (req, res) => {
    try {
        const userId = req.user.id;

        const { startDate, endDate } = req.query;

        // Call Service
        const tradeListAnalyticsServiceRes = await tradeListAnalyticsService({ userId, startDate, endDate })

        if (!tradeListAnalyticsServiceRes.success) {
            return res.status(tradeListAnalyticsServiceRes.statusCode).json({
                success: false,
                message: tradeListAnalyticsServiceRes.message
            })
        }

        return res.status(tradeListAnalyticsServiceRes.statusCode).json({
            success: true,
            message: tradeListAnalyticsServiceRes.message,
            data: tradeListAnalyticsServiceRes.data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

// Get Trade Symbols
export const getTradeSymbolsController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { search } = req.query;

        // Call Service
        const getTradeSymbolsServiceRes = await getTradeSymbolsService({ userId, search })

        if (!getTradeSymbolsServiceRes.success) {
            return res.status(getTradeSymbolsServiceRes.statusCode).json({
                success: false,
                message: getTradeSymbolsServiceRes.message
            })
        }
        
        return res.status(getTradeSymbolsServiceRes.statusCode).json({
            success: true,
            message: getTradeSymbolsServiceRes.message,
            data: getTradeSymbolsServiceRes.data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}