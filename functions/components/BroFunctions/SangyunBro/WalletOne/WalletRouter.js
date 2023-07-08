// DB 관련 함수를 호출하는 부분
const WalletFuncs = require("./WalletFuncs");

// express 관련 함수를 호출하는 부분
const express = require('express');
const WalletRouter = express.Router();

WalletRouter.post('/brofucntions/sangyunbro/WalletOne/createSellerChosenWalletFunc', async (req, res) => {
    try {
        const result = await WalletFuncs.createSellerChosenWalletFunc(req.body);
        res.status(200).json({
            message: "Wallet create 성공시 1 or 데이터, 실패시 -1 or null",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ wallet create 실패");
    }
});

WalletRouter.get('/brofucntions/sangyunbro/WalletOne/readCryptoWalletListFunc', async (req, res) => {
    try {
        const result = await WalletFuncs.readCryptoWalletListFunc(req.query);
        res.status(200).json({
            message: "Wallet read 성공시 1 or 데이터, 실패시 -1 or null",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ wallet read 실패");
    }
});


module.exports = WalletRouter;