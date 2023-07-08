// DB 관련 함수를 호출하는 부분
const GetSellerDataFunc = require("./GetSellerDataFunc");

// express 관련 함수를 호출하는 부분
const express = require('express');
const GetSellerDataRouter = express.Router();

GetSellerDataRouter.get('/brofucntions/sangyunbro/GetSellerData/getsellerdata', async (req, res) => {
    try {
        const result = await GetSellerDataFunc.getSellerData(req.query);
        res.status(200).json({
            message: "GetSellerData read 성공시 1 or 데이터, 실패시 -1 or null",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ getsellerdata read 실패");
    }
});


module.exports = GetSellerDataRouter;