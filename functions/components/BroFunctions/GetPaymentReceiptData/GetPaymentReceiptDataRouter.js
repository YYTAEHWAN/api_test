// DB 관련 함수를 호출하는 부분
const GetPaymentReceiptDataFuncs = require("./GetPaymentReceiptDataFuncs");

// express 관련 함수를 호출하는 부분
const express = require('express');
const GetPaymentReceiptDataRouter = express.Router();

GetPaymentReceiptDataRouter.get('/getpaymentreceiptdata/justonedata', async (req, res) => {
    
    try {
        const paymentReceiptData = await GetPaymentReceiptDataFuncs.getPaymentReceiptDataByPaymentIdx(req.query);
        res.status(200).json({
            message: "getPaymentReceiptDataByPaymentIdx read 성공시 1 or 데이터, 실패시 -1 or null",
            data: paymentReceiptData,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ get Payment Receipt Data By Payment Idx 실패");
    }
})


GetPaymentReceiptDataRouter.get('/getpaymentreceiptdata/productnameprice', async (req, res) => {
    
    try {
        const paymentReceiptData = await GetPaymentReceiptDataFuncs.getPayDataAndProductNamePriceByPaymentIdx(req.query);
        res.status(200).json({
            message: "getPayDataAndProductNamePriceByPaymentIdx read 성공시 1 or 데이터, 실패시 -1 or null",
            data: paymentReceiptData,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ get Pay Data And Product Name Price By Payment Idx 실패");
    }
})

GetPaymentReceiptDataRouter.post('/getpaymentreceiptdata/getbulkdata', async (req, res) => {
    
    try {
        console.log("req.query : ", req.query);
        console.log("req.body : ", req.body);
        console.log("req.body.payment_receipt_idx_array : ", req.body.payment_receipt_idx_array);

        const paymentReceiptBulkDatas = await GetPaymentReceiptDataFuncs.getBulkPaymentReceiptDataByPaymentIdx(req.body);
        res.status(200).json({
            message: "getBulkPaymentReceiptDataByPaymentIdx read 성공시 1 or 데이터, 실패시 -1 or null",
            data: paymentReceiptBulkDatas,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ get Bulk Payment Receipt Data By Payment Idx 실패");
    }
})


module.exports = GetPaymentReceiptDataRouter;