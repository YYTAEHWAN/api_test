// DB 관련 함수를 호출하는 부분
const PriceAddressInfoDB = require("./PaymentReceiptPriceAddressInfoCRUD");

// express 관련 함수를 호출하는 부분
const express = require('express');
const PriceAddressInfoRouter = express.Router();


PriceAddressInfoRouter.post('/paymentreceipt/priceaddressinfo', async (req, res) => {
    try {
        // const priceAddressDatas = req.body;
        const result = await PriceAddressInfoDB.create(req.body);
        res.status(200).json({
            message: "priceaddressinfo data 생성 성공시 1, 실패시 -1, 리턴 data는 result값",
            data: result,
          });
    } catch (error) {
        res.status(400).send(error.message+" priceaddressinfo create 실패");
      }
})

PriceAddressInfoRouter.get("/paymentreceipt/priceaddressinfo", async (req,res) => {
    try {
        // const payment_receipt_idx =  req.body.payment_receipt_idx;

        const priceaddressinfoDoc = await PriceAddressInfoDB.read(req.query);
        res.status(200).json({
          message: "priceaddressinfo read 성공시 1, 실패시 -1",
          data: priceaddressinfoDoc,
        });
    } catch (error) {
        res.status(400).send(error.message+" priceaddressinfo read 실패");
      }
})

PriceAddressInfoRouter.patch('/paymentreceipt/priceaddressinfo', async (req, res) => {
    try {
        const result = await PriceAddressInfoDB.update(req.body);
        res.status(200).json({
            message: "PriceAddressInfoDB update 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+" priceaddressinfo update 실패");
      }
})


PriceAddressInfoRouter.delete('/paymentreceipt/priceaddressinfo', async (req, res) => {
    try {
        // const payment_receipt_idx =  req.body.payment_receipt_idx;
        const result = await PriceAddressInfoDB.delete(req.body);
        res.status(200).json({
            message: "PriceAddressInfoDB delete 성공시 1, 실패시 -1",
            data: result,
            });
    } catch (error) {
        res.status(400).send(error.message+" priceaddressinfo delete 실패");
      }
})

module.exports = PriceAddressInfoRouter;
