// DB 관련 함수를 호출하는 부분
const admin = require("firebase-admin");
const StatusInfoDB = require("./PaymentReceiptStatusInfoCRUD");

// express 관련 함수를 호출하는 부분
const express = require('express');
const StatusInfoRouter = express.Router();


// Table payment_receipt_status_info {
//     // 결제 영수증 식별 idx 칼럼
//     payment_receipt_idx int [increment, pk]
  
//     // 해당 영수증이 발행된 후 상태가 "테이블 만드는 중(0)" 인지 "결제 중(1)" 인지, // 결제 전 관련 테이블 모두 완성 상태 번호 = "0011"
//     // 아니면 "결제 완료(999)" 인지, "환불 요청(2)" 인지, "환불 완료(3)" 인지, "결제 실패(-1)" 인지
//     // 처럼 결제의 상태를 알려주는 payment_status 칼럼
//     payment_status varchar
//     // 결제 시작 시점을 알려주는 칼럼
//     payment_start_time varchar
//     // 결제 완료 시점을 알려주는 칼럼
//     payment_end_time varchar
//   }


StatusInfoRouter.post('/paymentreceipt/statusinfo', async (req, res) => {
    try {
        const result = await StatusInfoDB.create();
        console.log("StatusInfoRouter - result:", result);
        res.status(200).json({
            message: "영수증 statusinfo create 성공시 1, 실패시 -1, 리턴 data는 paymentReceiptIdx",
            data: result,
          });
    } catch (error) {
        res.status(400).send(error.message+"// statusinfo create 실패");
      }
})


StatusInfoRouter.get("/paymentreceipt/statusinfo", async (req,res) => {
    try {
        const statusinfoDoc = await StatusInfoDB.read(req.query);
        res.status(200).json({
          message: "영수증 statusinfo read 성공시 1, 실패시 -1, 리턴 data는 statusinfoDoc",
          data: statusinfoDoc,
        });
    } catch (error) {
        res.status(400).send(error.message+" StatusInfo read 실패");
      }
})

StatusInfoRouter.patch('/paymentreceipt/statusinfo', (req, res) => {
    try {
        const payment_receipt_idx =  req.body.payment_receipt_idx;
        res.status(200).json({
            message: "영수증 수정 api는 아직 안 만들었습니다.",
        });
    } catch (error) {
        res.status(400).send(error.message+" statusinfo update 실패");
      }
})

StatusInfoRouter.delete('/paymentreceipt/statusinfo', async (req, res) => {
    try {
        const result = await StatusInfoDB.delete(req.body);
        res.status(200).json({
            message: "영수증 삭제 성공시 1, 실패시 -1",
            data: result,
            });
    } catch (error) {
        res.status(400).send(error.message+" statusinfo delete 실패");
      }
})




module.exports = StatusInfoRouter;
