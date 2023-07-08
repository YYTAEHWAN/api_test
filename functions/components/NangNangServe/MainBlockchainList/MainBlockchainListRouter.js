// DB 관련 함수를 호출하는 부분
const MainBlockchainListDB = require("./MainBlockchainListCRUD");

// express 관련 함수를 호출하는 부분
const express = require('express');
const MainBlockchainListRouter = express.Router();

MainBlockchainListRouter.post('/mainblockchainlist', async (req, res) => {
    try {
        console.log(req.body);
        const result = await MainBlockchainListDB.create(req.body);
        res.status(200).json({
            message: "MainBlockchainList create 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ create 실패");
    }
});

MainBlockchainListRouter.get('/mainblockchainlist', async (req, res) => {
    try {
        const result = await MainBlockchainListDB.read();
        res.status(200).json({
            message: "MainBlockchainList read 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ read 실패");
    }
});

MainBlockchainListRouter.get('/mainblockchainlist/readChainNameByIdx', async (req, res) => {
    try {
        console.log(req.body);
        const result = await MainBlockchainListDB.readChainNameByIdx(req.query);
        res.status(200).json({
            message: "MainBlockchainList readOneNameByIdx 성공시 1 or 데이터, 실패시 -1 or null",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ readChainNameByIdx 실패");
    }
});

MainBlockchainListRouter.get('/mainblockchainlist/readChainIdxByName', async (req, res) => {
    try {
        console.log(req.body);
        const result = await MainBlockchainListDB.readChainIdxByName(req.query);
        res.status(200).json({
            message: "MainBlockchainList readOneIdxByName 성공시 1 or 데이터, 실패시 -1 or null",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ readChainIdxByName 실패");
    }
});


MainBlockchainListRouter.patch('/mainblockchainlist', async (req, res) => {
    try {
        const result = await MainBlockchainListDB.update(req.body);
        res.status(200).json({
            message: "MainBlockchainList update 성공시 1 or 데이터, 실패시 -1 or null",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ update 실패");
    }
});



MainBlockchainListRouter.delete('/mainblockchainlist', async (req, res) => {
    try {
        const result = await MainBlockchainListDB.delete(req.body);
        res.status(200).json({
            message: "MainBlockchainList delete 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ delete 실패");
    }
});


module.exports = MainBlockchainListRouter;