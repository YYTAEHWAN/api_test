// DB 관련 함수를 호출하는 부분
const ConsumerDB = require("./ConsumerCRUD");

// express 관련 함수를 호출하는 부분
const express = require('express');
const ConsumerRouter = express.Router();

ConsumerRouter.post('/consumer', async (req, res) => {
   try {
        console.log("req.body.consumer_id: "+req.body.consumer_id);
        const result = await ConsumerDB.createConsumer(req.body);
        res.status(200).json({
            message: "consumer data create 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ createConsumer 실패");
    }
});

ConsumerRouter.get('/consumer', async (req, res) => {
    try {
        const result = await ConsumerDB.readConsumer(req.query);
        res.status(200).json({
            message: "consumer data read 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ readConsumer 실패");
    }
});

ConsumerRouter.patch('/consumer', async (req, res) => {
    try {
        const result = await ConsumerDB.updateConsumer(req.body);
        res.status(200).json({
            message: "consumer data update 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ updateConsumer 실패");
    }
});

ConsumerRouter.delete('/consumer', async (req, res) => {
    try {
        const result = await ConsumerDB.deleteConsumer(req.body);
        res.status(200).json({
            message: "consumer data delete 성공시 1, 실패시 -1",
            data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ deleteConsumer 실패");
    }
});

module.exports = ConsumerRouter;