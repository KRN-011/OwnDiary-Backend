import { createTradeValidation } from "./trade.validation.js"
import prisma from "../../prisma/client.js"


// Create Trade
export const createTradeService = async ({ date, day, time, symbol, segment, tradeType, entryPrice, quantity, stoplossPrice, exitPrice, netProfit, isRulesFollowed, remarkOnTrade, userId }) => {
    try {
        // validate request
        const validateTradeRequest = await createTradeValidation({ date, day, time, symbol, segment, tradeType, entryPrice, quantity, stoplossPrice, exitPrice, netProfit, isRulesFollowed, remarkOnTrade })

        if (!validateTradeRequest.success) {
            return { success: false, statusCode: validateTradeRequest.statusCode, message: validateTradeRequest.message }
        }

        // create trade
        const newTrade = await prisma.trade.create({
            data: { date, day, time, symbol, segment, tradeType, entryPrice, quantity, stoplossPrice, exitPrice, netProfit, isRulesFollowed, remarkOnTrade, userId }
        })

        // return response
        return { success: true, statusCode: 201, message: 'Trade Created Successfully', data: newTrade }
    } catch (error) {
        console.log(error)
        return { success: false, statusCode: 500, message: 'Internal Server Error', error: error.message }
    }
}

// Get All Trades
export const getAllTradesService = async ({ userId, paginationData, day, symbol, segment, tradeType, isRulesFollowed, startDate, endDate, sortBy, sortOrder }) => {
    try {
        // Manage filters
        let where = {
            userId: userId
        }

        // Manage day filter
        if (day) {
            where.day = { contains: day }
        }

        // Manage symbol filter
        if (symbol) {
            where.symbol = { contains: symbol }
        }

        // Manage segment filter
        if (segment) {
            where.segment = { contains: segment }
        }

        // Manage trade type filter
        if (tradeType) {
            where.tradeType = { contains: tradeType }
        }

        // Manage is rules followed filter
        if (isRulesFollowed) {
            where.isRulesFollowed = { contains: isRulesFollowed }
        }

        // Manage date range filter
        if (startDate && endDate) {
            where.date = { gte: new Date(startDate), lte: new Date(endDate) }
        }
        
        // Get all trades
        const allTrades = await prisma.trade.findMany({
            where: where,
            skip: paginationData.skip,
            take: paginationData.limit,
            orderBy: { [sortBy]: sortOrder === 'asc' ? 'asc' : 'desc' }
        })

        // Return response
        return {
            success: true,
            statusCode: 200,
            message: 'Trades Fetched Successfully',
            data: allTrades
        }
    } catch (error) {
        console.log(error)
        return { success: false, statusCode: 500, message: 'Internal Server Error', error: error.message }
    }
}

// Update Trade
export const updateTradeService = async ({ id, date, day, time, symbol, segment, tradeType, entryPrice, quantity, stoplossPrice, exitPrice, netProfit, isRulesFollowed, remarkOnTrade, userId }) => {
    try {
        // validate request
        const validateTradeRequest = await createTradeValidation({ id, date, day, time, symbol, segment, tradeType, entryPrice, quantity, stoplossPrice, exitPrice, netProfit, isRulesFollowed, remarkOnTrade })

        if (!validateTradeRequest.success) {
            return { success: false, statusCode: validateTradeRequest.statusCode, message: validateTradeRequest.message }
        }

        // update trade
        const updatedTrade = await prisma.trade.update({
            where: { id, userId },
            data: { date, day, time, symbol, segment, tradeType, entryPrice, quantity, stoplossPrice, exitPrice, netProfit, isRulesFollowed, remarkOnTrade }
        })

        // return response
        return { success: true, statusCode: 200, message: 'Trade Updated Successfully', data: updatedTrade }
    } catch (error) {
        console.log(error)
        return { success: false, statusCode: 500, message: 'Internal Server Error', error: error.message }
    }
}

// Delete Trade
export const deleteTradeService = async ({ id, userId }) => {
    try {
        // check if trade exists
        const trade = await prisma.trade.findUnique({
            where: { id, userId }
        })

        // return if trade is not found
        if (!trade) {
            return { success: false, statusCode: 404, message: 'Trade not found' }
        }

        // delete trade
        const deletedTrade = await prisma.trade.delete({
            where: { id, userId }
        })

        // return response
        return { success: true, statusCode: 200, message: 'Trade Deleted Successfully', data: deletedTrade }
    } catch (error) {
        console.log(error)
        return { success: false, statusCode: 500, message: 'Internal Server Error', error: error.message }
    }
}