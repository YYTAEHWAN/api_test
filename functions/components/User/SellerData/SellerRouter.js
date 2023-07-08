// DB 관련 함수를 호출하는 부분
const SellerDB = require("./SellerCRUD");

// express 관련 함수를 호출하는 부분
const express = require('express');
const SellerRouter = express.Router();

SellerRouter.post('/seller', async (req, res) => {
    try {
        const result = await SellerDB.create(req.body);
        res.status(200).json({
            message: "셀러 create 성공시 1, 실패시 -1",
            data: result,
          });
    } catch (error) {
        res.status(400).send(error.message+"/ create 실패");
    }
});

SellerRouter.get('/seller', async (req, res) => {
    try {
        const result = await SellerDB.readPlatformName(req.query);
        res.status(200).json({
            message: "셀러 read 성공시 1, 실패시 -1",
            data: result,
            });
    } catch (error) {
        res.status(400).send(error.message+"/ read 실패");
    }
});

SellerRouter.patch('/seller', async (req, res) => {
    try {
        const result = await SellerDB.update(req.body);
        res.status(200).json({
            message: "셀러 update 성공시 1, 실패시 -1",
            data: result,
            });
    } catch (error) {
        res.status(400).send(error.message+"/ update 실패");
    }
});

SellerRouter.delete('/seller', async (req, res) => {
    try {
        const result = await SellerDB.delete(req.body);
        res.status(200).json({
            message: "셀러 delete 성공시 1, 실패시 -1",
            data: result,
        }); 
    } catch (error) {
        res.status(400).send(error.message+"/ delete 실패");
    }
});




module.exports = SellerRouter;