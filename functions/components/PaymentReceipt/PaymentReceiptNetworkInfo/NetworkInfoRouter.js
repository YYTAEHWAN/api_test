

// DB 관련 함수를 호출하는 부분
const admin = require("firebase-admin");
const NetworkInfoDB = require("./PaymentReceiptNetworkInfoCRUD");

// express 관련 함수를 호출하는 부분
const express = require('express');
const NetworkInfoRouter = express.Router();

NetworkInfoRouter.post('/paymentreceipt/networkinfo', async (req, res) => {
    try {
        // const networkDatas = req.body;
        const result = await NetworkInfoDB.create(req.body);
        res.status(200).json({
            message: "networkinfo data 생성 성공시 1, 실패시 -1, 리턴 data는 result값",
            data: result,
            });
    } catch (error) {
        res.status(400).send(error.message+" networkinfo create 실패");
        }
})

NetworkInfoRouter.get("/paymentreceipt/networkinfo", async (req,res) => {
    try {

        const networkinfoDoc = await NetworkInfoDB.read(req.query);
        console.log("networkinfoDoc: ", networkinfoDoc);
        res.status(200).json({
            message: "networkinfo read 성공시 1, 실패시 -1",
            data: networkinfoDoc,
            });
    } catch (error) {
        res.status(400).send(error.message+" networkinfo read 실패");
        }
})

NetworkInfoRouter.patch('/paymentreceipt/networkinfo', async (req, res) => {
    try {
        const result = await NetworkInfoDB.update(req.body);
        res.status(200).json({
            message: "networkinfo update 성공시 1, 실패시 -1",
            data: result,
            });
    } catch (error) {
        res.status(400).send(error.message+" networkinfo update 실패");
        }
})

NetworkInfoRouter.delete('/paymentreceipt/networkinfo', async (req, res) => {
    try {
        
        const result = await NetworkInfoDB.delete(req.body);
        res.status(200).json({
            message: "networkinfo delete 성공시 1, 실패시 -1",
            data: result,
            });
    } catch (error) {
        res.status(400).send(error.message+" networkinfo delete 실패");
        }
})



module.exports = NetworkInfoRouter;