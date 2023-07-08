// DB 관련 함수를 호출하는 부분
const ProductInfoDB = require("./ProductInfoCRUD");

// express 관련 함수를 호출하는 부분
const express = require('express');
const ProductInfoRouter = express.Router();

ProductInfoRouter.post('/productinfo', async (req, res) => {
    try {
        const result = await ProductInfoDB.create(req.body);
        res.status(200).json({
            message: "ProductInfo create 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ create 실패");
    }
});

ProductInfoRouter.get('/productinfo', async (req, res) => {
    try {
        const result = await ProductInfoDB.read(req.query);
        res.status(200).json({
            message: "ProductInfo read 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ read 실패");
    }
});

ProductInfoRouter.patch('/productinfo', async (req, res) => {
    try {
        const result = await ProductInfoDB.update(req.body);
        res.status(200).json({
            message: "ProductInfo update 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ update 실패");
    }
});

ProductInfoRouter.delete('/productinfo', async (req, res) => {
    try {
        const result = await ProductInfoDB.delete(req.body);
        res.status(200).json({
            message: "ProductInfo delete 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ delete 실패");
    }
});



module.exports = ProductInfoRouter;