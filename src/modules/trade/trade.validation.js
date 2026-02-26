

// Create Trade Validation
export const createTradeValidation = async ({ date, day, time, symbol, segment, tradeType, entryPrice, quantity, stoplossPrice, exitPrice, netProfit, isRulesFollowed, remarkOnTrade, brokerId, brokerage }) => {
    if (!date) {
        return { success: false, statusCode: 400, message: 'Date is required' }
    }

    if (!day) {
        return { success: false, statusCode: 400, message: 'Day is required' }
    }
    
    if (!time) {
        return { success: false, statusCode: 400, message: 'Time is required' }
    }

    if (!symbol) {
        return { success: false, statusCode: 400, message: 'Symbol is required' }
    }
    
    if (!segment) {
        return { success: false, statusCode: 400, message: 'Segment is required' }
    }

    if (!tradeType) {
        return { success: false, statusCode: 400, message: 'Trade Type is required' }
    }

    if (!tradeType) {
        return { success: false, statusCode: 400, message: 'Trade Type is required' }
    }

    if (!entryPrice) {
        return { success: false, statusCode: 400, message: 'Entry Price is required' }
    }

    if (!quantity) {
        return { success: false, statusCode: 400, message: 'Quantity is required' }
    }

    if (!stoplossPrice) {
        return { success: false, statusCode: 400, message: 'Stop Loss Price is required' }
    }

    if (!exitPrice) {
        return { success: false, statusCode: 400, message: 'Exit Price is required' }
    }
    
    if (!netProfit) {
        return { success: false, statusCode: 400, message: 'Net Profit is required' }
    }

    if (!isRulesFollowed) {
        return { success: false, statusCode: 400, message: 'Is Rules Followed is required' }
    }

    if (!remarkOnTrade) {
        return { success: false, statusCode: 400, message: 'Remark On Trade is required' }
    }

    if (!brokerId) {
        return { success: false, statusCode: 400, message: 'Broker ID is required' }
    }

    if (!brokerage) {
        return { success: false, statusCode: 400, message: 'Brokerage is required' }
    }

    return { success: true, statusCode: 200, message: 'Trade Validation Successful' }
}