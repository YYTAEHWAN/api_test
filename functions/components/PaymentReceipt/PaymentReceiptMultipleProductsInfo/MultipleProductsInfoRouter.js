// DB 관련 함수를 호출하는 부분
const MultipleProductsInfoDB = require("./PaymentReceiptMultipleProductsInfoCRUD");

// express 관련 함수를 호출하는 부분
const express = require('express');
const MultipleProductsInfoRouter = express.Router();

MultipleProductsInfoRouter.post('/paymentreceipt/multipleproductsinfo', async (req, res) => {
    try {
        const result = await MultipleProductsInfoDB.create(req.body);
        res.status(200).json({
            message: "multipleproductsinfo data 생성 성공시 1, 실패시 -1, 리턴 data는 result값",
            data: result,
            });
    } catch (error) {
        res.status(400).send(error.message+" multipleproductsinfo create 실패");
        }
})

MultipleProductsInfoRouter.get("/paymentreceipt/multipleproductsinfo/readonlyquantity", async (req,res) => {
    try {
        const multipleproductsinfoDoc = await MultipleProductsInfoDB.read(req.query);
        console.log("multipleproductsinfoDoc: ", multipleproductsinfoDoc);
        res.status(200).json({
            message: "multipleproductsinfo read 성공시 1, 실패시 -1",
            data: multipleproductsinfoDoc,
            });
    } catch (error) {
        res.status(400).send(error.message+" multipleproductsinfo read 실패");
        }
})

MultipleProductsInfoRouter.get('/paymentreceipt/multipleproductsinfo/productandquantity', async (req, res) => {
    try {
        const receiptIdx = req.body.payment_receipt_idx;
        const result = await MultipleProductsInfoDB.readAllProductInfoIdxAndQuantity(receiptIdx);
        res.status(200).json({
            message: "multipleproductsinfo read 성공시 1, 실패시 -1",
            data: result,
            });
    } catch (error) {
        res.status(400).send(error.message+" multipleproductsinfo read 실패");
        }
})


MultipleProductsInfoRouter.patch('/paymentreceipt/multipleproductsinfo', async (req, res) => {
    try {
        const result = await MultipleProductsInfoDB.update_quantity(req.body);
        res.status(200).json({
            message: "multipleproductsinfo update 성공시 1, 실패시 -1",
            data: result,
            });
    } catch (error) {
        res.status(400).send(error.message+" multipleproductsinfo update 실패");
        }
})


MultipleProductsInfoRouter.delete('/paymentreceipt/multipleproductsinfo', async (req, res) => {
    try {
        const result = await MultipleProductsInfoDB.delete(req.body);
        res.status(200).json({
            message: "multipleproductsinfo delete 성공시 1, 실패시 -1",
            data: result,
            });
    } catch (error) {
        res.status(400).send(error.message+" multipleproductsinfo delete 실패");
        }
})


module.exports = MultipleProductsInfoRouter;