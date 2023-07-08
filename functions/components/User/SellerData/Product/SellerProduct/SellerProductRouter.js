// DB 관련 함수를 호출하는 부분
const SellerProductDB = require("./SellerProductCRUD");

// express 관련 함수를 호출하는 부분
const express = require('express');
const SellerProductRouter = express.Router();

SellerProductRouter.post('/sellerproduct', async (req, res) => {
    try {
        const result = await SellerProductDB.create(req.body);
        res.status(200).json({
            message: "SellerProduct create 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ create 실패");
    }
});

SellerProductRouter.get('/sellerproduct', async (req, res) => {
    try {
        const result = await SellerProductDB.read(req.query);
        res.status(200).json({
            message: "SellerProduct read 성공시 빈 오브젝트 리턴, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ read 실패");
    }
});

SellerProductRouter.delete('/sellerproduct', async (req, res) => {
    try {
        const result = await SellerProductDB.delete(req.body);
        res.status(200).json({
            message: "SellerProduct delete 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ delete 실패");
    }
});




module.exports = SellerProductRouter;