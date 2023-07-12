
const admin = require("firebase-admin");
const db = admin.firestore();
const productInfoDB = require('../../User/SellerData/Product/ProductInfo/ProductInfoCRUD.js');
const sellerProductsDB = require('../../User/SellerData/Product/SellerProduct/SellerProductCRUD.js');
const statusInfoDB = require('../../PaymentReceipt/PaymentReceiptStatusInfo/PaymentReceiptStatusInfoCRUD.js');
const multipleProductsInfoDB = require('../../PaymentReceipt/PaymentReceiptMultipleProductsInfo/PaymentReceiptMultipleProductsInfoCRUD.js');
const participantsDB = require('../../PaymentReceipt/PaymentReceiptParticipants/PaymentReceiptParticipantsCRUD.js');
const priceAddressInfoDB = require('../../PaymentReceipt/PaymentReceiptPriceAddressInfo/PaymentReceiptPriceAddressInfoCRUD.js');
const networkInfoDB = require('../../PaymentReceipt/PaymentReceiptNetworkInfo/PaymentReceiptNetworkInfoCRUD.js');



module.exports = {
    // 하나의 결제 영수증 idx 를 넣으면 결제 영수증 관련 정보를 모두를 가져오는 함수
    async getPaymentReceiptDataByPaymentIdx(datas) {
        var paymentData = {};

        // 이게 아마 datas 일 것임
        // // CRUD 함수 써주기 위해선 이런 형식으로 데이터를 넣어줘야함
        // const input_datas = {payment_receipt_idx : paymentIdx};

        const statusInfoData = await statusInfoDB.read(datas);
        if (statusInfoData == -1) {
            console.log("statusInfoData 읽어오기 실패");
            return -1;
        }
        paymentData.statusInfoData = statusInfoData;

        const participantsData = await participantsDB.read(datas);
        if (participantsData == -1) {
            console.log("participantsData 읽어오기 실패");
            return -1;
        }
        paymentData.participantsData = participantsData;

        const multipleProductsInfoData = await multipleProductsInfoDB.readAllProductInfoIdxAndQuantity(datas);
        if (multipleProductsInfoData == -1) {
            console.log("multipleProductsInfoData 읽어오기 실패");
            return -1;
        }
        paymentData.multipleProductsInfoData = multipleProductsInfoData;

        const priceAddressInfoData = await priceAddressInfoDB.read(datas);
        if (priceAddressInfoData == -1) {
            console.log("priceAddressInfoData 읽어오기 실패");
            return -1;
        }
        paymentData.participantsData = priceAddressInfoData;

        const networkInfoData = await networkInfoDB.read(datas);
        if (networkInfoData == -1) {
            console.log("networkInfoData 읽어오기 실패");
            return -1;
        }
        paymentData.networkData = networkInfoData;

        return paymentData;
    },

    // 하나의 결제 영수증 idx 를 넣으면 결제 영수증 관련 정보를 모두를 가져오는 함수
    async getPayDataAndProductNamePriceByPaymentIdx(datas) {
        var paymentData = {};

        // 이게 아마 datas 일 것임
        // // CRUD 함수 써주기 위해선 이런 형식으로 데이터를 넣어줘야함
        // const input_datas = {payment_receipt_idx : paymentIdx};

        const statusInfoData = await statusInfoDB.read(datas);
        if (statusInfoData == -1) {
            console.log("statusInfoData 읽어오기 실패");
            return -1;
        }
        paymentData.statusInfoData = statusInfoData;

        const participantsData = await participantsDB.read(datas);
        if (participantsData == -1) {
            console.log("participantsData 읽어오기 실패");
            return -1;
        }
        paymentData.participantsData = participantsData;

        // console.log("multipleProduct 시작");

        const multipleProductsInfoData = await multipleProductsInfoDB.readAllProductInfoIdxAndQuantityReturnArray(datas);
        // console.log("multipleProductsInfoData:", multipleProductsInfoData);
        if (multipleProductsInfoData == -1) {
            console.log("multipleProductsInfoData 읽어오기 실패");
            return -1;
        }
        // paymentData.multipleProductsInfoData = multipleProductsInfoData;
        // console.log("multipleProduct 끝");

        // console.log("asdfasdfasdf");
        // console.log("multipleProductsInfoData length:", multipleProductsInfoData.length);
        // console.log("multipleProductsInfoData:", multipleProductsInfoData[0]);
        // console.log("multipleProductsInfoData:", multipleProductsInfoData[1]);

        var productsAllData = [];
        for(var i = 0; i < multipleProductsInfoData.length; i++) {
            // console.log("productInfoIdx:", productInfoIdx);
            var input_datas = {product_info_idx : multipleProductsInfoData[i].product_info_idx};
            var productNameAndPriceData = await productInfoDB.read(input_datas);
            if (productNameAndPriceData == -1) {
                console.log("productNameAndPriceData 읽어오기 실패");
                return -1;
            }
            // object에 데이터를 넣는 두 가지 방법
            productNameAndPriceData.product_info_idx = multipleProductsInfoData[i].product_info_idx;
            productNameAndPriceData["quantity"] = multipleProductsInfoData[i].quantity;
            // console.log(`productNameAndPriceData ${i}번째 :`, productNameAndPriceData);
            productsAllData[i] = productNameAndPriceData;
        }
        // console.log("productsAllData:", productsAllData);
        paymentData.productsAllData = productsAllData;


        const priceAddressInfoData = await priceAddressInfoDB.read(datas);
        if (priceAddressInfoData == -1) {
            console.log("priceAddressInfoData 읽어오기 실패");
            return -1;
        }
        paymentData.participantsInfoData = priceAddressInfoData;

        const networkInfoData = await networkInfoDB.read(datas);
        if (networkInfoData == -1) {
            console.log("networkInfoData 읽어오기 실패");
            return -1;
        }
        paymentData.networkInfoData = networkInfoData;

        return paymentData;
    },
    
    // 여러 개의 결제 영수증 정보를 벌크데이터로 한 번에 가져오는 함수
    async getBulkPaymentReceiptDataByPaymentIdx(datas) {
        // 이 함수는 getPayDataAndProductNamePriceByPaymentIdx 함수를 사용함
        // getPayDataAndProductNamePriceByPaymentIdx 함수는 연관된 payment_receipt 테이블들 뿐만 아니라
        // product_info 테이블도 읽어옴 (제품 개수, 제품당 가격도 읽어옴)

        // datas = [payment_receipt_idx1, payment_receipt_idx2, ...]
        console.log("datas:", datas);
        console.log("datas.payment_receipt_idx_array:", datas.payment_receipt_idx_array);
        const arrayData = datas.payment_receipt_idx_array;
        var bulkPaymentReceiptData = [];
        for(var i = 0; i < arrayData.length; i++) {
            var input_datas = {payment_receipt_idx : arrayData[i]};
            var paymentReceiptData = await this.getPayDataAndProductNamePriceByPaymentIdx(input_datas);
            if (paymentReceiptData == -1) {
                console.log(`${i}번째 pay_receipt_idx 에서 paymentReceiptData 읽어오기 실패`);
                return -1;
            }
            bulkPaymentReceiptData[i] = paymentReceiptData;
        }

        return bulkPaymentReceiptData;
    }

}

