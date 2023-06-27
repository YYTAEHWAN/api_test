const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");

admin.initializeApp();

const nangnangDB = express();
nangnangDB.use(express.json());

// app.use("/api", nangnangDB);


const userDataRouter = require('./components/User/UserData/UserDataRouter');
const StatusInfoRouter = require('./components/PaymentReceipt/PaymentReceiptStatusInfo/StatusInfoRouter');
const PriceAddressInfoRouter = require('./components/PaymentReceipt/PaymentReceiptPriceAddressInfo/PriceAddressInfoRouter');
const ParticipantsRouter = require('./components/PaymentReceipt/PaymentReceiptParticipants/ParticipantsRouter');
const NetworkInfoRouter = require('./components/PaymentReceipt/PaymentReceiptNetworkInfo/NetworkInfoRouter');
const MultipleProductsInfoRouter = require('./components/PaymentReceipt/PaymentReceiptMultipleProductsInfo/MultipleProductsInfoRouter');

const PaymentProcessRouter = require('./components/BroFunctions/DongyuBro/PaymentProcess/PaymentProcessRouter');

// UserDataRouters.js에서 정의한 라우터를 사용
nangnangDB.use(userDataRouter);

// // ---- PaymentReceipt 시작 ----

// StatusInfoRouter.js에서 정의한 라우터를 사용
nangnangDB.use(StatusInfoRouter);
// PriceAddressInfoRouter.js에서 정의한 라우터를 사용
nangnangDB.use(PriceAddressInfoRouter);
// ParticipantsRouter.js에서 정의한 라우터를 사용
nangnangDB.use(ParticipantsRouter);
// NetworkInfoRouter.js에서 정의한 라우터를 사용
nangnangDB.use(NetworkInfoRouter);
// MultipleProductsInfoRouter.js에서 정의한 라우터를 사용
nangnangDB.use(MultipleProductsInfoRouter);

// functions
nangnangDB.use(PaymentProcessRouter);

// // ---- PaymentReceipt 끝 ----


exports.api = functions.region("asia-northeast3").https.onRequest(nangnangDB);