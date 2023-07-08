// DB 관련 함수를 호출하는 부분
const ChosenWalletFuncs = require("./ChosenWalletFuncs");

// express 관련 함수를 호출하는 부분
const express = require('express');
const ChosenWalletRouter = express.Router();

ChosenWalletRouter.get('/brofucntions/sangyunbro/WalletTwo/chosenwallet', async (req, res) => {
    try {
        const result = await ChosenWalletFuncs.read(req.query);
        res.status(200).json({
            message: "ChosenWallet read 성공시 1 or 데이터, 실패시 -1 or null",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ chosenwallet read 실패");
    }
});

ChosenWalletRouter.delete('/brofucntions/sangyunbro/WalletTwo/chosenwallet', async (req, res) => {
    try {
        const result = await ChosenWalletFuncs.delete(req.body);
        res.status(200).json({
            message: "ChosenWallet delete 성공시 1 or 데이터, 실패시 -1 or null",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ chosenwallet delete 실패");
    }
});



    
module.exports = ChosenWalletRouter;