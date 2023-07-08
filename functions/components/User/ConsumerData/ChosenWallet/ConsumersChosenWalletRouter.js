// DB 관련 함수를 호출하는 부분
const ConsumersChosenWalletDB = require("./ConsumersChosenWalletCRUD");

// express 관련 함수를 호출하는 부분
const express = require('express');
const ConsumersChosenWalletRouter = express.Router();

ConsumersChosenWalletRouter.post('/consumerschosenwallet', async (req, res) => {
    try {
        const result = await ConsumersChosenWalletDB.create(req.body);
        res.status(200).json({
            message: "ConsumersChosenWallet create 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ create 실패");
    }
});

ConsumersChosenWalletRouter.get('/consumerschosenwallet', async (req, res) => {
    try {
        const result = await ConsumersChosenWalletDB.read(req.query);
        res.status(200).json({
            message: "ConsumersChosenWallet read 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ read 실패");
    }
});

ConsumersChosenWalletRouter.patch('/consumerschosenwallet', async (req, res) => {
    try {
        const result = await ConsumersChosenWalletDB.update(req.body);
        res.status(200).json({
            message: "ConsumersChosenWallet update 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ update 실패");
    }
});

ConsumersChosenWalletRouter.delete('/consumerschosenwallet', async (req, res) => {
    try {
        const result = await ConsumersChosenWalletDB.delete(req.body);
        res.status(200).json({
            message: "ConsumersChosenWallet delete 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ delete 실패");
    }
});


module.exports = ConsumersChosenWalletRouter;