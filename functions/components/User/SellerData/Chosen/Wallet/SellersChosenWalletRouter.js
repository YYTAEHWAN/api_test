// DB 관련 함수를 호출하는 부분
const SellersChosenWalletDB = require("./SellersChosenWalletCRUD");

// express 관련 함수를 호출하는 부분
const express = require('express');
const SellersChosenWalletRouter = express.Router();

SellersChosenWalletRouter.post('/sellerschosenwallet', async (req, res) => {
    try {
        const result = await SellersChosenWalletDB.create(req.body);
        res.status(200).json({
            message: "SellersChosenWallet create 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ create 실패");
    }
});

SellersChosenWalletRouter.get('/sellerschosenwallet', async (req, res) => {
    try {
        const result = await SellersChosenWalletDB.read(req.query);
        res.status(200).json({
            message: "SellersChosenWallet read 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ read 실패");
    }
});

SellersChosenWalletRouter.patch('/sellerschosenwallet', async (req, res) => {
    try {
        const result = await SellersChosenWalletDB.update(req.body);
        res.status(200).json({
            message: "SellersChosenWallet update 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ update 실패");
    }
});

SellersChosenWalletRouter.delete('/sellerschosenwallet', async (req, res) => {
    try {
        const result = await SellersChosenWalletDB.delete(req.body);
        res.status(200).json({
            message: "SellersChosenWallet delete 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ delete 실패");
    }
});


module.exports = SellersChosenWalletRouter;