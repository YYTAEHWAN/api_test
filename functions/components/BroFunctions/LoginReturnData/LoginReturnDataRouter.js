// DB 관련 함수를 호출하는 부분
const LoginReturnDataFuncs = require("./LoginReturnDataFuncs");

// express 관련 함수를 호출하는 부분
const express = require('express');
const LoginReturnDataRouter = express.Router();

LoginReturnDataRouter.post('/login/loginreturndata', async (req, res) => {
    try {
        console.log("input_user_id : ", req.body.input_user_id);
        console.log("input_user_pwd : ", req.body.input_user_pwd);
        const resultData = await LoginReturnDataFuncs.LoginReturnData(req.body);
        res.status(200).json({
            message: `LoginReturnData 성공시 resultData, 실패시 -1`,
            result: resultData,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ login 실패");
    }
});

LoginReturnDataRouter.post('/login/justlogin', async (req, res) => {
    try {
        const reslut = await LoginReturnDataFuncs.Login(req.body);
        res.status(200).json({
            message: "Login 성공시 1, 실패시 -1",
            data: reslut,
        });
    } catch (error) {
        res.status(400).send(error.message+"/ login 실패");
    }
});



module.exports = LoginReturnDataRouter;