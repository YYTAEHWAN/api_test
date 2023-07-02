const admin = require("firebase-admin");
const db = admin.firestore();
const productInfoDB = require('../../../User/SellerData/Product/ProductInfo/ProductInfoCRUD.js');
const sellerProductsDB = require('../../../User/SellerData/Product/SellerProduct/SellerProductCRUD.js');
const statusInfoDB = require('../../../PaymentReceipt/PaymentReceiptStatusInfo/PaymentReceiptStatusInfoCRUD.js');
const multipleProductsInfoDB = require('../../../PaymentReceipt/PaymentReceiptMultipleProductsInfo/PaymentReceiptMultipleProductsInfoCRUD.js');
const participantsDB = require('../../../PaymentReceipt/PaymentReceiptParticipants/PaymentReceiptParticipantsCRUD.js');
const priceAddressInfoDB = require('../../../PaymentReceipt/PaymentReceiptPriceAddressInfo/PaymentReceiptPriceAddressInfoCRUD.js');
const networkInfoDB = require('../../../PaymentReceipt/PaymentReceiptNetworkInfo/PaymentReceiptNetworkInfoCRUD.js');


// 실제 함수들 시작

// const paymentProcessFuncs = {
module.exports = {


    // 1번째로 사용되는 함수(웹에서?서버에서? 사용)
    // PaymentReceipt 를 만들고 결제하기 전 초기 세팅 함수
    // PaymentReceipt의 idx를 가져오고, 그 idx를 이용해 다른 테이블들에 정보를 저장하기 시작함, 결제 시작 시점도 저장함
    // qr 코드 만들고 바로 시행되어야 함 그래야 서버에서 payment_receipt_idx에 상태를 조회할 수 있음
    async startSetting() {
        // console.log("--startSetting 시작--");
        // 접근 db name : payment_receipt_status_info
        // payment_receipt_status_info db columns : payment_receipt_idx, payment_status, payment_start_time, payment_end_time

        // payment_receipt_status_info db에 statusInfo정보 저장
        const payment_receipt_idx = await statusInfoDB.create();
        if(payment_receipt_idx !== -1) {
            console.log("payment receipt startSetting 완료");
            return payment_receipt_idx; // db에 저장 성공하면 payment_receipt_idx 반환
        }
        else {
            console.log("--startSetting 비정상 종료--");
            return -1; // db에 저장 실패하면 -1 반환
        }
    },


    
    // 단계 1. product_info에 (제품명,원화가격) 해당 데이터가 있는지 확인한 후 없다면 저장 (product_info_idx는 자동 증가후 저장됨)
    // 단계 2. 없었다면 seller_products에 (판매자 아이디, product_info_idx) 저장
    async saveProductDataSentBySeller(seller_id, product_data) {
        // 접근 db name : product_info
        // product_info db columns : product_info_idx, product_name, product_won_price_per
        // 접근 db name : seller_products
        // seller_products db columns : seller_id, product_info_idx

        // console.log("saveProductDataSentBySeller 시작");

        // productInfoIdxList에 값 있으면 존재, productInfoIdxList = [] 존재하지 않음
        // 해당 sellerId가 가진 product_info_idx 리스트 가져오기
        const productInfoIdxList = await getSellerProductInfoIdxList(seller_id);
        // console.log("seller_id가 ", seller_id, "일때 getSellerProductInfoIdxList 리턴값은 : ", productInfoIdxList)
        
        // productInfoIdxList에 seller가 입력한 product_data.product_name 이 존재하는지 확인하는 함수
        // 확인 후에 존재하면 ifExistReturnIdx = product_info_idx 리턴되는 함수, 
        // 존재하지 않으면 ifExistReturnIdx = 0 리턴되는 함수
        const ifExistReturnIdx= await checkProductNameExistence(productInfoIdxList, product_data);
        // console.log("ifExistReturnIdx 값은 : ", ifExistReturnIdx);
        
        if(ifExistReturnIdx === 0) {
            // product_info에 (제품명,원화가격) 해당 데이터가 있는지 확인한 후 
            // 없다면 저장  (product_info_idx는 자동 증가후 저장됨)

            // create_product_info 성공하면 product_info_idx 반환, 실패하면 -1 반환
            const prodictInfoDatas = {
                product_name : product_data.product_name,
                product_won_price_per : product_data.product_won_price_per
            }
            const product_info_idx_num = await productInfoDB.create(prodictInfoDatas);
            if (product_info_idx_num === -1) {
                // 저장 실패하면 -1 반환
                // console.log("데이터 없어서 진행한 productInfoDB.createProductInfo 실패");
                return -1;
            } 
            else {
                // console.log("새로 생성한 product_info_idx_num : ", product_info_idx_num);
                // console.log("데이터 없어서 진행한 productInfoDB.createProductInfo 성공");
            }
                // seller_products에 (판매자 아이디, product_info_idx) 저장, 성공하면 1 반환, 실패하면 -1 반환
                const sellerProductsDatas = {
                    seller_id : seller_id,
                    product_info_idx : product_info_idx_num
                }
                
            const result = await sellerProductsDB.create(sellerProductsDatas);
            if(result === 1) {
                // 저장 성공하면 1 반환
                // console.log("이어서 진행한 sellerProductsDB.createSellerProducts 성공");
                // console.log("saveProductDataSentBySeller 정상 종료-1");
                // console.log("생성 진행한 product_info_idx_num : ", product_info_idx_num)
                return product_info_idx_num;
            }
            else {
                // 저장 실패하면 -1 반환
                console.log("데이터 없어서 진행한 sellerProductsDB.createSellerProducts 실패");
                console.log("saveProductDataSentBySeller 비정상 종료");
                return -1;
            }
        }
        else {
            // product_info에 (제품명,원화가격) 해당 데이터가 있으면
            // 저장하지 않고 해당 데이터의 product_info_idx 값 반환
            // console.log("ifExistReturnIdx : ", ifExistReturnIdx);
            // console.log("saveProductDataSentBySeller 정상 종료-2");
            return ifExistReturnIdx;
        }
    },

    // paymentReceiptStatusInfo에 마지막 end_time 설정하고, status 바꾸는 함수
    async endSetting(paymentReceiptIdx, paymentStatus) {

        let datas = {
            payment_receipt_idx : paymentReceiptIdx,
            payment_status : paymentStatus,
        }

        const result = await statusInfoDB.updatePaymentEnd(datas);
        return result; // 1: 성공, -1: 실패
    },

    // 2번째로 사용되는 함수(앱에서 사용) 결제가 완료되면 이 함수를 앱에서 호출할 거임
    async storePaymentData(datas) {

        let result = -1; // -1로 초기화

        // 1. participants DB 생성
        // 해당 영수증(거래)에 참여한 consumer_id와 seller_id 저장
        result = await participantsDB.create(datas.priceAddressInfo_object); // 저장하는 곳은 payment_receipt_participants db
        if(result === -1) return -1; // 실패
        console.log("storePaymentData에서 participantsDB create 완료");
        

        // 2. multiple_products_info DB ,product_info DB, seller_products DB 생성
        // 제품 정보 저장 (있으면 저장 안하고 없으면 저장하고 ) 어쨋든 product_info_idx를 리턴
        // 여기서 products를 하나의 product로 나눠서 넣어주고, 함수 써주는 게 깔끔할 듯
        for (let i = 0; i < datas.products.length; i++) {
            const one_product_info_object = datas.products[i];
            // console.log(`${i+1}번째 루프`)
            // 3-2. 셀러가 넣은 제품의 데이터가 seller_products에 있는지 확인하고 없으면 저장하는 함수
            // 데이터가 없다면 result 값은 1, 있다면 0,
            // result 값이 -1이면 데이터 없어서 저장하다가 실패한 경우

            // 저장하는 곳은 seller_products, product_info db
            
            const product_info_idx_num = await this.saveProductDataSentBySeller(datas.priceAddressInfo_object.seller_id, one_product_info_object); 
            
            if(product_info_idx_num === -1) {
                // 데이터 저장이 실패했다면
                return -1; // -1: 실패
            }
            else {
                // 이부분에 들어왔다면 정상 작동 흐름임, product_info_idx이 값을 가지고 있음
                // 저장하는 곳은 payment_receipt_multiple_products_info db
                const input_datas = {
                    "payment_receipt_idx" : datas.priceAddressInfo_object.payment_receipt_idx,
                    "product_info_idx" : product_info_idx_num,
                    "quantity" : one_product_info_object.quantity
                }
                // multiple_products_info DB 생성
                result = await multipleProductsInfoDB.create(input_datas);
                if(result === -1) return -1; // -1: 실패
            }
        }
        console.log("storePaymentData에서 multipleProductsInfoDB create 완료");

        // 3.price_address_info DB 생성
        const result10 = await priceAddressInfoDB.create(datas.priceAddressInfo_object);
        if (result10 === -1) return -1; // -1: 실패
        console.log("storePaymentData에서 priceAddressInfoDB create 완료");

        // 4. network_info DB 생성
        result = await networkInfoDB.create(datas.networkInfo_obejct);
        if(result === -1) return -1; // -1: 실패
        console.log("storePaymentData에서 networkInfoDB create 완료");
        
        // 4. 영수증의 상태를 "결제 완료(999) 상태로 바꿈 
        result = await this.endSetting(datas.priceAddressInfo_object.payment_receipt_idx, 999)
        if(result === -1) return -1; // -1: 실패
        console.log("storePaymentData에서 영수증 endSetting 완료");
        
        return 1111;
    },
}



const getSellerProductInfoIdxList = async (input_seller_id) => {
    try {
        // console.log("getSellerProductInfoIdxList 시작");
        const querySnapshot = await db.collection("seller_products").get();
  
        const productInfoIdxList = [];

        querySnapshot.forEach((doc) => {
        const data = doc.id; // 예시: seller1_product_info_idx1
        const parts = data.split("_"); // ["seller1", "product", "info", "idx1"]
        const seller_id = parts[0]; // "seller1"
        const numberPart = parts[parts.length - 1]; // "idx1"
        const number = numberPart.match(/\d+/)[0]; // 추출된 숫자: "1", "12"

            if (seller_id === input_seller_id) {
                productInfoIdxList.push(number);
            }
        });

        // console.log("getSellerProductInfoIdxList 의 실행 결과 : ", productInfoIdxList);
        // console.log("getSellerProductInfoIdxList 종료");
      return productInfoIdxList;
    } 
    catch (error) {
      console.error("판매자의 product_info_idx 가져오기 실패:", error);
      console.log("getSellerProductInfoIdxList 종료");
      return [];
    }
  };

// 들어온 product_data와 같은 이름이 이미 존재하는지(그러니까 이미 등록된 상품인지 보고)
// productInfoIdxList에 seller가 입력한 product_data.product_name 이 존재하는지 확인하는 함수
// 없으면 0을, 있으면 idx번호를 리턴하는 함수
const checkProductNameExistence = async (productInfoIdxList, product_data) => {
  try {
    // console.log("--checkProductNameExistence 시작--");
    // console.log("들어온 productInfoIdxList 값은 : ", productInfoIdxList);
    // console.log("product_data 값은 : ", product_data);

    const productNamesSnapshot = await db.collection("product_info").get();
    for (const doc of productNamesSnapshot.docs) {
      const data = doc.id; // 예시: product_info_idx1
      const parts = data.split("_"); // ["product", "info", "idx1"]
      const numberPart = parts[parts.length - 1]; // "idx1"
      const number = numberPart.match(/\d+/)[0]; // 추출된 숫자: "1", "7", "16", 등의 정수 하나
      
        if (productInfoIdxList.includes(number)) {
        // 해당 셀러가 가진 제품 번호 리스트 중에서 해당 번호(number)가 있다면 if문 내부 실행

            // 해당 number의 데이터 가져와서
            const productInfo = doc.data();
            // console.log(`productInfo : ${productInfo}`)

            if (productInfo.product_name === product_data.product_name) {
                // 입력된 product_data.product_name과 이름이 일치하는 경우
                
                // console.log(`productInfo.product_name : ${productInfo.product_name}`);
                // console.log(`product_data.product_name : ${product_data.product_name}`);

                // console.log(`${number}번째 제품의 이름이 들어온 product_data의 name과 일치합니다.`);
                // console.log("checkProductNameExistence 정상종료 ");
                // console.log("--checkProductNameExistence 끝--");
                // console.log("리턴값은 : ", number);
                return number; // 해당 number 값을 리턴합니다.
            }
        }
    }

    // console.log("제품 이름 검색결과 없음 -> 새 상품이므로 등록 요망:");
    // console.log("--checkProductNameExistence 끝--");
    return 0;
  } catch (error) {
    console.log("checkProductNameExistence 비정상 종료");
    console.error("오류 발생 : ", error);
    console.log("--checkProductNameExistence 끝--");
    return -1; // 오류 발생
  }
};

function calculateTotalCoinPrice(total_won_price) {
    return 9999;
}

// 6. 결제가 완료되었다는 것을 서버가 DB를 확인하다가 알아서 판매자 플랫폼에 보내주면 될 듯

