// DB 관련 함수를 호출하는 부분
const userDataDB = require("./UserDataCRUD");

// express 관련 함수를 호출하는 부분
const express = require('express');
const UserDataRouter = express.Router();


UserDataRouter.post("/user", async (req,res) => { 
    try {
        // const user_data = {
        //     "id": req.body.id,
        //     "password": req.body.password,
        //     "consumer_or_not": req.body.consumer_or_not,
        //     "email": req.body.email,
        //     "real_name": req.body.real_name,
        //     "phone_number": req.body.phone_number,
        //     "resident_registration_number": req.body.resident_registration_number,
        // };
        
        const result = await userDataDB.createUserData(req.body);
        res.status(200).json({
          message: "회원가입 결과 성공시 1, 실패 or 이미 존재하는 아이디 일 경우 -1 ",
          data: result,
        });
    } catch (error) {
        res.status(400).send(error.message+" createUserData 실패");
      }
})



UserDataRouter.get("/user", async (req, res) => {
    try {
        console.log("UserDataRouter get 실행되었습니다.");
        
        const id = req.query.id;
        console.log("id: "+id);

        const userDoc = await userDataDB.readUserData(req.query);
        res.status(200).json({
            message: "user data get 성공시 1, 실패시 -1",
            data: userDoc,
        });
    } catch {
        res.status(400).send(error.message+"/ readUserData 실패");
    }
})

UserDataRouter.patch("/user", async (req,res) => {
    try {

        console.log("req.body.id: "+req.body.id);
        console.log("req.body.password: "+req.body.password);
        console.log("req.body.email: "+req.body.email);
        console.log("req.body.real_name: "+req.body.real_name);
        console.log("req.body.phone_number: "+req.body.phone_number);

        const result = await userDataDB.updateUserData(req.body);
        res.status(200).json({
                message: "회원 정보 수정 완료 성공시 1, 실패시 -1",
                data: result
            });
    } catch (error) {
        res.status(400).send(error.message+" updateUserData 실패");
      }
})


UserDataRouter.delete("/user", async (req,res) => {
    try {
        const result = await userDataDB.deleteUserData(req.body);
        res.status(200).json({
            message : "회원정보 삭제 완료",
            data : result
        });
    } catch (error) {
        res.status(400).send(error.message+" deleteUserData 실패");
      }
})


// userDataRouter.get("/user/:id", async (req,res) => {
//     try {
//         const input_id = req.params.id;
//         const userDoc = await userDataDB.readUserData(input_id);
//         res.status(200).json({
//           message: "로그인 결과 성공시 1, 실패시 -1",
//           data: userDoc,
//         });
//     } catch (error) {
//         res.status(400).send(error.message+" readUserData 실패");
//       }
// })

// userDataRouter.patch("/user/update/:id", async (req,res) => {
//     try {
//         const input_id = req.params.id;
//         console.log("input_id: "+input_id);
//         console.log("req.body: "+req.body);
//         console.log("req.body.id: "+req.body.id);
//         console.log("req.body.password: "+req.body.password);
//         console.log("req.body.email: "+req.body.email);
//         console.log("req.body.real_name: "+req.body.real_name);
//         console.log("req.body.phone_number: "+req.body.phone_number);

//         const result = await userDataDB.updateUserData(input_id, req.body);
//         res.status(200).json({
//                 message: "회원 정보 수정 완료 성공시 1, 실패시 -1",
//                 data: result
//             });
//     } catch (error) {
//         res.status(400).send(error.message+" updateUserData 실패");
//       }
// })

module.exports = UserDataRouter;
