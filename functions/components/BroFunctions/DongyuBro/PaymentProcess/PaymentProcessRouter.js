// DB 관련 함수를 호출하는 부분
const PaymentProcessFuncs = require("./PaymentProcessFuncs");

// express 관련 함수를 호출하는 부분
const express = require('express');
const PaymentProcessRouter = express.Router();

PaymentProcessRouter.post('/paymentprocess/startsetting', async (req, res) => {
    
    try {
        const payment_receipt_idx = await PaymentProcessFuncs.startSetting();
        res.status(200).json({
            message: "결제 영수증 생성 성공시 payment_receipt_idx, 실패시 -1",
            data: payment_receipt_idx,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ startSetting 실패");
    }
});

PaymentProcessRouter.post('/paymentprocess/preparePayment', async (req, res) => {
    try {
        console.log("paymentreceiptidx: ", req.body.payment_receipt_idx);
        console.log("sellerId : ", req.body.sellerId);
        console.log("consumerId : ", req.body.consumerId);
        console.log("products : ", req.body.products);
        const result = await PaymentProcessFuncs.preparePayment(req.body);

        res.status(200).json({
            message: "preparePayment 성공시 1111, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ preparePayment 실패");
    }
});



module.exports = PaymentProcessRouter;