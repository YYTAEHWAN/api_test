const MultipleProductsInfoDB = require("./../../../PaymentReceipt/PaymentReceiptMultipleProductsInfo/PaymentReceiptMultipleProductsInfoCRUD");
const NetworkInfoDB = require("./../../../PaymentReceipt/PaymentReceiptNetworkInfo/PaymentReceiptNetworkInfoCRUD");
const ParticipantsDB = require("./../../../PaymentReceipt/PaymentReceiptParticipants/PaymentReceiptParticipantsCRUD");
const PriceAddressInfoDB = require("./../../../PaymentReceipt/PaymentReceiptPriceAddressInfo/PaymentReceiptPriceAddressInfoCRUD");
const StatusInfoDB = require("./../../../PaymentReceipt/PaymentReceiptStatusInfo/PaymentReceiptStatusInfoCRUD");

const express = require('express');
const demoProcessRouter = express.Router();




demoProcessRouter.post('/paymentreceipt/demo', async (req, res) => {

    const statusInfoData = req.body.statusInfo;
    const priceAddressInfoData = req.body.priceAddressInfo;
    const participantsData = req.body.participants;
    const networkInfoData = req.body.networkInfo;
    const multipleProductsInfoData = req.body.multipleProductsInfo;

    let domoProcessData = {};

    try {
        const StatusInfoDBresult = await StatusInfoDB.create0621only(statusInfoData);
        domoProcessData.StatusInfoDBResult = StatusInfoDBresult;
        console.log("rr StatusInfoRouter - result:", StatusInfoDBresult);
        
        const PriceAddressInfoDBresult = await PriceAddressInfoDB.create(priceAddressInfoData);
        domoProcessData.PriceAddressInfoDBresult = PriceAddressInfoDBresult;
        console.log("rr PriceAddressInfoRouter - result:", PriceAddressInfoDBresult);

        const ParticipantsDBresult = await ParticipantsDB.create(participantsData);
        domoProcessData.ParticipantsDBresult = ParticipantsDBresult;
        console.log("rr ParticipantsRouter - result:", ParticipantsDBresult);

        const NetworkInfoDBresult = await NetworkInfoDB.create(networkInfoData);
        domoProcessData.NetworkInfoDBresult = NetworkInfoDBresult;
        console.log("rr NetworkInfoRouter - result:", NetworkInfoDBresult);

        const MultipleProductsInfoDBresult = await MultipleProductsInfoDB.create(multipleProductsInfoData);
        domoProcessData.MultipleProductsInfoDBresult = MultipleProductsInfoDBresult;
        console.log("rr MultipleProductsInfoRouter - result:", MultipleProductsInfoDBresult);

        res.status(200).json({
            message: "영수증 데이터 create 성공시 1, 실패시 -1, 리턴 data는 때려박은 영수증 데이터",
            data: domoProcessData,
            });
        

    } catch (error) {
        res.status(400).send(error.message+"// 영수증 데이터 create 실패");
        }
})


demoProcessRouter.get('/paymentreceipt/demo', async (req, res) => {
    try {
        const payment_receipt_idx = req.body.payment_receipt_idx;
        let domoProcessData = {};

        const statusinfoDoc = await StatusInfoDB.read(payment_receipt_idx);
        domoProcessData.statusinfoDoc = statusinfoDoc;
        console.log("StatusInfoRouter - result:", statusinfoDoc);

        const priceAddressInfoDoc = await PriceAddressInfoDB.read(payment_receipt_idx);
        domoProcessData.priceAddressInfoDoc = priceAddressInfoDoc;
        console.log("PriceAddressInfoRouter - result:", priceAddressInfoDoc);

        const participantsDoc = await ParticipantsDB.read(payment_receipt_idx);
        domoProcessData.participantsDoc = participantsDoc;
        console.log("ParticipantsRouter - result:", participantsDoc);

        const networkInfoDoc = await NetworkInfoDB.read(payment_receipt_idx);
        domoProcessData.networkInfoDoc = networkInfoDoc;
        console.log("NetworkInfoRouter - result:", networkInfoDoc);

        const multipleProductsInfoDoc = await MultipleProductsInfoDB.readAllProductInfoIdxAndQuantity(payment_receipt_idx);
        domoProcessData.multipleProductsInfoDoc = multipleProductsInfoDoc;
        console.log("MultipleProductsInfoRouter - result:", multipleProductsInfoDoc);

        res.status(200).json({
            message: "영수증 read 성공시 1, 실패시 -1, 리턴 data는 때려박은 영수증 데이터",
            data: domoProcessData,
            });
    } catch (error) {
        res.status(400).send(error.message+"// 영수증 데이터 read 실패");
        }
})

module.exports = demoProcessRouter;