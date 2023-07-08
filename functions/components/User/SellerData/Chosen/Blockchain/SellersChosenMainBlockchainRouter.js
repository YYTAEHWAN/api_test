// DB 관련 함수를 호출하는 부분
const SellersChosenMainBlockchainDB = require("./SellersChosenMainBlockchainCRUD");

// express 관련 함수를 호출하는 부분
const express = require('express');
const SellersChosenMainBlockchainRouter = express.Router();

SellersChosenMainBlockchainRouter.post('/sellerschosenmainblockchain', async (req, res) => {
    try {
        const result = await SellersChosenMainBlockchainDB.create(req.body);
        res.status(200).json({
            message: "SellersChosenMainBlockchain create 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ create 실패");
    }
});

SellersChosenMainBlockchainRouter.get('/sellerschosenmainblockchain', async (req, res) => {
    try {
        const result = await SellersChosenMainBlockchainDB.read(req.query);
        res.status(200).json({
            message: "SellersChosenMainBlockchain read 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ read 실패");
    }
});

SellersChosenMainBlockchainRouter.delete('/sellerschosenmainblockchain', async (req, res) => {
    try {
        const result = await SellersChosenMainBlockchainDB.delete(req.body);
        res.status(200).json({
            message: "SellersChosenMainBlockchain delete 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ delete 실패");
    }
});


module.exports = SellersChosenMainBlockchainRouter;