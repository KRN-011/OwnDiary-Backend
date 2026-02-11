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

// Trade Cards Analytics
export const tradeCardsAnalyticsService = async ({ userId, avgType, startDate, endDate }) => {
    try {
        // Get Current Month's net profit
        const currentMonthNetProfit = await prisma.trade.aggregate({
            where: { userId, createdAt: { gte: new Date(new Date().setMonth(new Date().getMonth(), 1)), lte: new Date(new Date().setMonth(new Date().getMonth() + 1, 0)) } },
            _sum: { netProfit: true }
        })

        // Get Wins Of Current Month based on netProfit > 0
        const winCountOfCurrentMonth = await prisma.trade.aggregate({
            where: { userId, createdAt: { gte: new Date(new Date().setMonth(new Date().getMonth(), 1)) }, netProfit: { gt: 0 } },
            _count: { id: true }
        })

        // Get Losses Of Current Month based on netProfit < 0
        const lossCountOfCurrentMonth = await prisma.trade.aggregate({
            where: { userId, createdAt: { gte: new Date(new Date().setMonth(new Date().getMonth(), 1)) }, netProfit: { lt: 0 } },
            _count: { id: true }
        })

        // Get Win Rate Of Current Month
        const winRateOfCurrentMonth = (winCountOfCurrentMonth.id.count / (winCountOfCurrentMonth.id.count + lossCountOfCurrentMonth.id.count)) * 100

        // Get Total Trades of current month
        const totalTradesOfCurrentMonth = await prisma.trade.aggregate({
            where: { userId, createdAt: { gte: new Date(new Date().setMonth(new Date().getMonth(), 1)), lte: new Date(new Date().setMonth(new Date().getMonth() + 1, 0)) } },
            _count: { id: true }
        })

        // Get Last Month's net profit
        const lastMonthNetProfit = await prisma.trade.aggregate({
            where: { userId, createdAt: { gte: new Date(new Date().setMonth(new Date().getMonth() - 1, 1)), lte: new Date(new Date().setMonth(new Date().getMonth(), 0)) } },
            _sum: { netProfit: true }
        })

        // Get % of change in net profit compare to last month
        const percentageChangeInNetProfitCompareToLastMonth = (currentMonthNetProfit.netProfit - lastMonthNetProfit.netProfit) / lastMonthNetProfit.netProfit * 100

        // Return response
        return {
            success: true,
            statusCode: 200,
            message: 'Trade Cards Analytics Fetched Successfully',
            data: {
                currentMonthNetProfit: currentMonthNetProfit.netProfit,
            }
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            error: error.message
        }
    }
}

// Trade Graph Analytics
export const tradeGraphAnalyticsService = async ({ userId, startDate, endDate }) => {
    try {
        // Get Trades
        const trades = await prisma.trade.findMany({
            where: { userId, createdAt: { gte: new Date(startDate), lte: new Date(endDate) } }
        })

        // format trades data
        const formattedTradesData = trades.map(trade => ({
            date: trade.createdAt.toISOString().split('T')[0],
            netProfit: trade.netProfit
        }))

        // Return response
        return {
            success: true,
            statusCode: 200,
            message: 'Trade Graph Analytics Fetched Successfully',
            data: formattedTradesData
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            error: error.message
        }
    }
}

// Trade List Analytics
export const tradeListAnalyticsService = async ({ userId, startDate, endDate }) => {
    try {
        // Get Top 5 Profitable Days based on netProfit > 0 in last 30 days
        const top5ProfitableDaysInLast30Days = await prisma.trade.groupBy({
            by: ['day'],
            where: { userId, createdAt: { gte: new Date(new Date().setDate(new Date().getDate() - 30)) }, netProfit: { gt: 0 } },
            orderBy: { netProfit: 'desc' },
            take: 5
        })

        // Get Top 5 Profitable Days based on netProfit < 0 in last year
        const top5ProfitableDaysInLastYear = await prisma.trade.groupBy({
            by: ['day'],
            where: { userId, createdAt: { gte: new Date(new Date().setDate(new Date().getDate() - 365)) }, netProfit: { lt: 0 } },
            orderBy: { netProfit: 'desc' },
            take: 5
        })
        
        // Get Top 5 Profitable Trades based on netProfit > 0 in last 30 days
        const top5ProfitableTradesInLast30Days = await prisma.trade.findMany({
            where: { userId, createdAt: { gte: new Date(new Date().setDate(new Date().getDate() - 30)) }, netProfit: { gt: 0 } },
            orderBy: { netProfit: 'desc' },
            take: 5
        })

        // Get Top 5 Profitable Trades based on netProfit < 0 in last year
        const top5ProfitableTradesInLastYear = await prisma.trade.findMany({
            where: { userId, createdAt: { gte: new Date(new Date().setDate(new Date().getDate() - 365)) }, netProfit: { lt: 0 } },
            orderBy: { netProfit: 'desc' },
            take: 5
        })

        // Return response
        return {
            success: true,
            statusCode: 200,
            message: 'Trade List Analytics Fetched Successfully',
            data: {
                top5ProfitableDaysInLast30Days,
                top5ProfitableDaysInLastYear,
                top5ProfitableTradesInLast30Days,
                top5ProfitableTradesInLastYear
            }
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            error: error.message
        }
    }
}