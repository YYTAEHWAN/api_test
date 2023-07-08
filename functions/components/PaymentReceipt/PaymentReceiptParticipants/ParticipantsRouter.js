// DB 관련 함수를 호출하는 부분
const ParticipantsDB = require("./PaymentReceiptParticipantsCRUD");

// express 관련 함수를 호출하는 부분
const express = require('express');
const ParticipantsRouter = express.Router();

ParticipantsRouter.post("/paymentreceipt/participants", async (req,res) => {
    try {
        const result = await ParticipantsDB.create(req.body);
        res.status(200).json({
            message: "participants data 생성 성공시 1, 실패시 -1, 리턴 data는 result값",
            data: result,
            });
    } catch (error) {
        res.status(400).send(error.message+" participants create 실패");
        }
})

ParticipantsRouter.get("/paymentreceipt/participants", async (req,res) => {
    try {
        // const payment_receipt_idx =  req.body.payment_receipt_idx;
        const participantsDoc = await ParticipantsDB.read(req.query);
        res.status(200).json({
            message: "participants read 성공시 1, 실패시 -1",
            data: participantsDoc,
            });
    } catch (error) {
        res.status(400).send(error.message+" participants read 실패");
        }
})

ParticipantsRouter.patch('/paymentreceipt/participants', async (req, res) => {
    try {
        const result = await ParticipantsDB.update(req.body);
        res.status(200).json({
            message: "participants update 성공시 1, 실패시 -1",
            data: result,
            });
    } catch (error) {
        res.status(400).send(error.message+" participants update 실패");
        }
})

ParticipantsRouter.delete('/paymentreceipt/participants', async (req, res) => {
    try {
        // const payment_receipt_idx =  req.body.payment_receipt_idx;
        const result = await ParticipantsDB.delete(req.body);
        res.status(200).json({
            message: "participants delete 성공시 1, 실패시 -1",
            data: result,
            });
    } catch (error) {
        res.status(400).send(error.message+" participants delete 실패");
        }
})

module.exports = ParticipantsRouter;