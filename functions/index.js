const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");

admin.initializeApp();

const nangnangDB = express();
nangnangDB.use(express.json());



// BroFunctions 폴더 ---------------------------------------------------------------------------------------------------------------------------------
  // LoginReturnData 폴더
  const LoginReturnDataRouter = require('./components/BroFunctions/LoginReturnData/LoginReturnDataRouter');
  nangnangDB.use(LoginReturnDataRouter);

  // DongyuBro 폴더
    // PaymentProcess
    const PaymentProcessRouter = require('./components/BroFunctions/DongyuBro/PaymentProcess/PaymentProcessRouter');
    nangnangDB.use(PaymentProcessRouter);


  // SangyunBro 폴더
    // WalletOne 폴더
    const WalletRouter = require('./components/BroFunctions/SangyunBro/WalletOne/WalletRouter');
    nangnangDB.use(WalletRouter);
    // WalletTwo 폴더
    const ChosenWalletRouter = require('./components/BroFunctions/SangyunBro/WalletTwo/ChosenWalletRouter');
    nangnangDB.use(ChosenWalletRouter);
    // GetSellerData 폴더
    const GetSellerDataRouter = require('./components/BroFunctions/SangyunBro/GetSellerData/GetSellerDataRouter');
    nangnangDB.use(GetSellerDataRouter);
    // BlockchainOne 폴더
    const ManageBcRouter = require('./components/BroFunctions/SangyunBro/BlockchainOne/ManageBcRouter');
    nangnangDB.use(ManageBcRouter);
    // BLockchainTwo 폴더
    const ModifyBcRouter = require('./components/BroFunctions/SangyunBro/BlockchainTwo/ModifyBcRouter');
    nangnangDB.use(ModifyBcRouter);
// BroFunctions 폴더 끝 --------------------------------------------------------------------------------------


// NangNangServe 폴더 --------------------------------------------------------------------------------------
  // CryptoWalletList 폴더
  const CryptoWalletListRouter = require('./components/NangNangServe/CryptoWalletList/CryptoWalletListRouter');
  nangnangDB.use(CryptoWalletListRouter);
  // MainBlockchainList 폴더
  const MainBlockchainListRouter = require('./components/NangNangServe/MainBlockchainList/MainBlockchainListRouter');
  nangnangDB.use(MainBlockchainListRouter);
// NangNangServe 폴더 끝 --------------------------------------------------------------------------------------



// PaymentReceipt 폴더 --------------------------------------------------------------------------------------
  const StatusInfoRouter = require('./components/PaymentReceipt/PaymentReceiptStatusInfo/StatusInfoRouter');
  const PriceAddressInfoRouter = require('./components/PaymentReceipt/PaymentReceiptPriceAddressInfo/PriceAddressInfoRouter');
  const ParticipantsRouter = require('./components/PaymentReceipt/PaymentReceiptParticipants/ParticipantsRouter');
  const NetworkInfoRouter = require('./components/PaymentReceipt/PaymentReceiptNetworkInfo/NetworkInfoRouter');
  const MultipleProductsInfoRouter = require('./components/PaymentReceipt/PaymentReceiptMultipleProductsInfo/MultipleProductsInfoRouter');
  // PaymentReceiptStatusInfo 폴더
  nangnangDB.use(StatusInfoRouter);
  // PriceAddressInfoRouter 폴더
  nangnangDB.use(PriceAddressInfoRouter);
  // ParticipantsRouter 폴더
  nangnangDB.use(ParticipantsRouter);
  // NetworkInfoRouter 폴더
  nangnangDB.use(NetworkInfoRouter);
  // MultipleProductsInfoRouter 폴더
  nangnangDB.use(MultipleProductsInfoRouter);
// PaymentReceipt 폴더 끝  --------------------------------------------------------------------------------------

//UserData 폴더 ---------------------------------------------------------------------------------------------------------------------------------
  // ConsumerData 폴더
  const ConsumerRouter = require('./components/User/ConsumerData/ConsumerRouter');
  nangnangDB.use(ConsumerRouter);
  
  // SellerData 폴더
  const SellerRouter = require('./components/User/SellerData/SellerRouter');
  nangnangDB.use(SellerRouter);
    // Product 폴더  
      // SellerProduct 폴더
      const SellerProductRouter = require('./components/User/SellerData/Product/SellerProduct/SellerProductRouter');
      nangnangDB.use(SellerProductRouter);
      // ProductInfo 폴더
      const ProductInfoRouter = require('./components/User/SellerData/Product/ProductInfo/ProductInfoRouter');
      nangnangDB.use(ProductInfoRouter);
    // Chosen 폴더
      // Wallet 폴더
      const SellersChosenWalletRouter = require('./components/User/SellerData/Chosen/Wallet/SellersChosenWalletRouter');
      nangnangDB.use(SellersChosenWalletRouter);
      // Blockchain 폴더
      const SellersChosenMainBlockchainRouter = require('./components/User/SellerData/Chosen/Blockchain/SellersChosenMainBlockchainRouter');
      nangnangDB.use(SellersChosenMainBlockchainRouter);
  // UserData 폴더
  const UserDataRouter = require('./components/User/UserData/UserDataRouter');
  nangnangDB.use(UserDataRouter);
// UserData 폴더 끝 ---------------------------------------------------------------------------------------------------------------------------------





nangnangDB.get('/', (req, res) => {
    if (Math.random() < 0.5) {
      res.send('World!');
    } else {
      res.send('Hello!');
    }
});

exports.api = functions.region("asia-northeast3").https.onRequest(nangnangDB);

