// DB 관련 함수를 호출하는 부분
const ModifyBcFuncs = require("./ModifyBcFuncs");

// express 관련 함수를 호출하는 부분
const express = require('express');
const ModifyBcRouter = express.Router();

ModifyBcRouter.get('/brofucntions/sangyunbro/BlockchainTwo/readSellersChosenMainBlockchain', async (req, res) => {
    try {
        const result = await ModifyBcFuncs.readSellersChosenMainBlockchain(req.query);
        res.status(200).json({
            message: "ModifyBc read 성공시 1 or 데이터, 실패시 -1 or null",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ modifybc read 실패");
    }
});

ModifyBcRouter.delete('/brofucntions/sangyunbro/BlockchainTwo/deleteSellersChosenMainBlockchain', async (req, res) => {
    try {
        const result = await ModifyBcFuncs.deleteSellersChosenMainBlockchain(req.body);
        res.status(200).json({
            message: "ModifyBc delete 성공시 1 or 데이터, 실패시 -1 or null",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ modifybc delete 실패");
    }
});



module.exports = ModifyBcRouter;