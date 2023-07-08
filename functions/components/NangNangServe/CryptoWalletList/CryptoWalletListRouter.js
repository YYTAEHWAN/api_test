// DB 관련 함수를 호출하는 부분
const CryptoWalletListDB = require("./CryptoWalletListCRUD");

// express 관련 함수를 호출하는 부분
const express = require('express');
const CryptoWalletListRouter = express.Router();

CryptoWalletListRouter.post('/cryptowalletlist', async (req, res) => {
    try {
        const result = await CryptoWalletListDB.create(req.body);
        res.status(200).json({
            message: "CryptoWalletList create 성공시 1, 실패시 (-1 or null)",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ create 실패");
    }
});

CryptoWalletListRouter.get('/cryptowalletlist/read', async (req, res) => {
    try {
        const result = await CryptoWalletListDB.read();
        res.status(200).json({
            message: "CryptoWalletList read 성공시 1, 실패시 (-1 or null)",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ read 실패");
    }
});

CryptoWalletListRouter.get('/cryptowalletlist/readOneNameByIdx', async (req, res) => {
    try {
        console.log(req.body);
        const result = await CryptoWalletListDB.readOneNameByIdx(req.query);
        res.status(200).json({
            message: "CryptoWalletList readOneNameByIdx 성공시 1, 실패시 (-1 or null)",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ read 실패");
    }
});

CryptoWalletListRouter.get('/cryptowalletlist/readOneIdxByName', async (req, res) => {
    try {
        const result = await CryptoWalletListDB.readOneIdxByName(req.query);
        res.status(200).json({
            message: "CryptoWalletList readOneIdxByName 성공시 1, 실패시 (-1 or null)",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ read 실패");
    }
});

CryptoWalletListRouter.patch('/cryptowalletlist', async (req, res) => {
    try {
        const result = await CryptoWalletListDB.update(req.body);
        res.status(200).json({
            message: "CryptoWalletList update 성공시 1, 실패시 (-1 or null)",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ update 실패");
    }
});

CryptoWalletListRouter.delete('/cryptowalletlist', async (req, res) => {
    try {
        const result = await CryptoWalletListDB.delete(req.body);
        res.status(200).json({
            message: "CryptoWalletList delete 성공시 1, 실패시 (-1 or null)",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ delete 실패");
    }
});




module.exports = CryptoWalletListRouter;