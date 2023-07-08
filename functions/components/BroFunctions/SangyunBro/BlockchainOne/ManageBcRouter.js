// DB 관련 함수를 호출하는 부분
const ManageBcFuncs = require("./ManageBcFuncs");

// express 관련 함수를 호출하는 부분
const express = require('express');
const ManageBcRouter = express.Router();

ManageBcRouter.post('/brofucntions/sangyunbro/BlockchainOne/createSellersChosenMainBlockchain', async (req, res) => {
    try {
        const result = await ManageBcFuncs.createSellersChosenMainBlockchain(req.body);
        res.status(200).json({
            message: "create  SellersChosenMainBlockchain 성공시 1 or 데이터, 실패시 -1 or null",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ create  SellersChosenMainBlockchain 실패");
    }
});

ManageBcRouter.get('/brofucntions/sangyunbro/BlockchainOne/readMainBlockchainList', async (req, res) => {
    try {
        const result = await ManageBcFuncs.readMainBlockchainList(req.query);
        res.status(200).json({
            message: "read  MainBlockchainList 성공시 1 or 데이터, 실패시 -1 or null",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ read  MainBlockchainList 실패");
    }
});





module.exports = ManageBcRouter;