import {db} from '../../../../services/firebaseAPI';
import {productInfoDB} from '../../../User/SellerData/Product/ProductInfo/ProductInfoCRUD.js';
import {sellerProductsDB} from '../../../User/SellerData/Product/SellerProduct/SellerProductCRUD';
import {statusInfoDB} from './../../../PaymentReceipt/PaymentReceiptStatusInfo/PaymentReceiptStatusInfoCRUD';
import {MultipleProductsInfoDB} from './../../../PaymentReceipt/PaymentReceiptMultipleProductsInfo/PaymentReceiptMultipleProductsInfoCRUD';
import {ParticipantsDB} from './../../../PaymentReceipt/PaymentReceiptParticipants/PaymentReceiptParticipantsCRUD';
import {PriceAddressInfoDB} from './../../../PaymentReceipt/PaymentReceiptPriceAddressInfo/PaymentReceiptPriceAddressInfoCRUD';
import {NetworkInfoDB} from './../../../PaymentReceipt/PaymentReceiptNetworkInfo/PaymentReceiptNetworkInfoCRUD';



// // 함수를 사용할 때 넣을 인자들을 묶어놓은 객체들 예시입니다.
// let statusInfo = {
//     payment_receipt_idx: 1,
//     payment_status: "1", // 결제 중 = 1, 결제 완료 = 999, 결제 실패 = -1, DB 만드는 중 = 0, 환불 요청 = 2, 환불 완료 = 3, 결제 취소는 필요 없지?
//     payment_start_time: "2023-05-20 13:00:00",
//     payment_end_time: null
// };

// let networkInfo = {
//     payment_receipt_idx: 1,
//     payment_wallet_name: "메타마스크",
//     blockchain_name: "이더리움",
//     detailed_network_name: "이더리움 메인넷",
//     detailed_network_id: 1
// };

// let priceAddressInfo = {
//     payment_receipt_idx: 1,
//     total_coin_price: 0.00196,
//     sender_consumer_id: "consumer1",
//     receiver_seller_id: "seller1001",
//     sender_wallet_address: "0x123...",
//     receiver_wallet_address: "0x456..."
// };

// let products = [
//     {
//         product_name: "gimchi",
//         product_won_price_per : 3000,
//         quantity: 2
//     },
//     {
//         product_name: "ganjang",
//         product_won_price_per : 2000,
//         quantity: 3
//     }
// ];

// sellerWeb이 우리의 API 서버를 통해 qr 코드를 생성하고, 생성된 QR을 consumer가 찍으면
// 질문 1. 어떤 화면을 띄울 거야? 
//          a. 블록체인 관련 정보 없이 순수한 결제 정보만 보여주는 화면 
//          b. 블록체인 관련 정보까지 보여주는 화면
// a 예시 : consumer가 보는 NangNang 앱 화면엔 product_name, won_price, quantity 가 존재
// 넘겨 받는 실제 정보들은 아래와 같음

// 앞으로의 모든 함수들은 이 형식을 따름
// 함수 형식 설명 시작
// function 함수이름(인자1, 인자2, ...) {
//    // 접근 db 이름 : db_name
//    // 접근 db 칼럼 이름들 : db_column1, db_column2, ...
//    // 함수에서 받는 인자들 설명 : 인자1, 인자2, ...
// 함수 형식 설명 끝


// 여러 결제들이 동시에 몰리면 PaymentReceipt_status_info 에서 status가 0이니까 혼란이 생길 수 있고
// "" getPresentPaymentReceiptIdx() 가 계속 바뀌어서 혼란이 생길 수 있음
// 다 만들고 생각해보기
// 트랜잭션을 어떻게 만들건지? 아니면 다른 해결책이 있을지?


// 그리고 이 부분이 웹과 앱에서 동시에 DB에 접근하면서 넣어야하니까 굉장히 어렵다



// 실제 함수들 시작


// 실제 함수들 시작

// 해당 셀러가 가지고 있는 product의 번호 리스트들을 리턴해주는 함수

const getSellerProductInfoIdxList = async (input_seller_id) => {
    try {
        console.log("getSellerProductInfoIdxList 시작");
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

        console.log("getSellerProductInfoIdxList 의 실행 결과 : ", productInfoIdxList);
        console.log("getSellerProductInfoIdxList 종료");
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
    console.log("--checkProductNameExistence 시작--");
    console.log("들어온 productInfoIdxList 값은 : ", productInfoIdxList);
    console.log("product_data 값은 : ", product_data);

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
            console.log(`productInfo : ${productInfo}`)

            if (productInfo.product_name === product_data.product_name) {
                // 입력된 product_data.product_name과 이름이 일치하는 경우
                
                console.log(`productInfo.product_name : ${productInfo.product_name}`);
                console.log(`product_data.product_name : ${product_data.product_name}`);

                console.log(`${number}번째 제품의 이름이 들어온 product_data의 name과 일치합니다.`);
                console.log("checkProductNameExistence 정상종료 ");
                console.log("--checkProductNameExistence 끝--");
                console.log("리턴값은 : ", number);
                return number; // 해당 number 값을 리턴합니다.
            }
        }
    }

    console.log("제품 이름 검색결과 없음 -> 새 상품이므로 등록 요망:");
    console.log("--checkProductNameExistence 끝--");
    return 0;
  } catch (error) {
    console.log("checkProductNameExistence 비정상 종료");
    console.error("오류 발생 : ", error);
    console.log("--checkProductNameExistence 끝--");
    return -1; // 오류 발생
  }
};

// const productIdxAndNameObject = [];
//         productNamesSnapshot.forEach((doc) => {
//             const data_Idx = doc.id;
//             const data = doc.data();
//             productIdxAndNameObject.push({ 
//                     dataIdx: data_Idx,
//                     productName : data.product_name });
//         });
//         console.log("productIdxAndNameObject : ", productIdxAndNameObject);        Object.entries(productIdxAndNameObject).forEach(([dataIdx, productName]) => {
//             console.log(`dataIdx: ${dataIdx}, productName: ${productName}`);
//             if(productName === product_data.product_name) {
//                 // 정규식(Regular Expression)을 활용하여 숫자 부분을 추출
//                 const idxNumberOnly = dataIdx.match(/\d+/)[0];
//                 return idxNumberOnly;
//             }
//         });  



// 정혁형 1번 요청. 판매자 플랫폼이 보낸 (코인 변환 이전) 데이터들(1. 제품명 2. 원화가격 3. 구매 개수 4. seller_id) DB에 저장하기
// 아마 서버 API에서 이 함수를 호출할 것 같음
// 단계 1. product_info에 (제품명,원화가격) 해당 데이터가 있는지 확인한 후 없다면 저장 (product_info_idx는 자동 증가후 저장됨)
// 단계 2. 없었다면 seller_products에 (판매자 아이디, product_info_idx) 저장
async function saveProductDataSentBySeller(seller_id, product_data) {
    // 접근 db name : product_info
    // product_info db columns : product_info_idx, product_name, product_won_price_per
    // 접근 db name : seller_products
    // seller_products db columns : seller_id, product_info_idx

    // ex) const product_infos = [product_name, product_won_price_per, quantity]
    // product_infos : 판매자 플랫폼이 보낸 (코인 변환 이전) 한 제품의 데이터(1. 제품 명 2. 개당 원화 가격 3. 구매 개수)
    // seller_id : 판매자 아이디

    console.log("saveProductDataSentBySeller 시작");

    // productInfoIdxList에 값 있으면 존재, productInfoIdxList = [] 존재하지 않음
    // 해당 sellerId가 가진 product_info_idx 리스트 가져오기
    const productInfoIdxList = await getSellerProductInfoIdxList(seller_id);
    console.log("seller_id가 ", seller_id, "일때 getSellerProductInfoIdxList 리턴값은 : ", productInfoIdxList)
    
    // productInfoIdxList에 seller가 입력한 product_data.product_name 이 존재하는지 확인하는 함수
    // 확인 후에 존재하면 ifExistReturnIdx = product_info_idx 리턴되는 함수, 
    // 존재하지 않으면 ifExistReturnIdx = 0 리턴되는 함수
    const ifExistReturnIdx= await checkProductNameExistence(productInfoIdxList, product_data);
    console.log("ifExistReturnIdx 값은 : ", ifExistReturnIdx);
    
    if(ifExistReturnIdx === 0) {
        // product_info에 (제품명,원화가격) 해당 데이터가 있는지 확인한 후 
        // 없다면 저장  (product_info_idx는 자동 증가후 저장됨)

        // create_product_info 성공하면 product_info_idx 반환, 실패하면 -1 반환
        const product_info_idx_num = await productInfoDB.createProductInfo(product_data.product_name, product_data.product_won_price_per);
        if (product_info_idx_num === -1) {
            // 저장 실패하면 -1 반환
            console.log("데이터 없어서 진행한 productInfoDB.createProductInfo 실패");
            return -1;
        } 
        else {
            console.log("새로 생성한 product_info_idx_num : ", product_info_idx_num);
            console.log("데이터 없어서 진행한 productInfoDB.createProductInfo 성공");
        }
            // seller_products에 (판매자 아이디, product_info_idx) 저장, 성공하면 1 반환, 실패하면 -1 반환
        const result = await sellerProductsDB.createSellerProducts(seller_id, product_info_idx_num);
        if(result === 1) {
            // 저장 성공하면 1 반환
            console.log("이어서 진행한 sellerProductsDB.createSellerProducts 성공");
            console.log("saveProductDataSentBySeller 정상 종료-1");
            console.log("생성 진행한 product_info_idx_num : ", product_info_idx_num)
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
        console.log("ifExistReturnIdx : ", ifExistReturnIdx);
        console.log("saveProductDataSentBySeller 정상 종료-2");
        return ifExistReturnIdx;
    }
}


// PaymentReceipt 를 만들고 결제하기 전 초기 세팅 함수
// PaymentReceipt의 idx를 가져오고, 그 idx를 이용해 다른 테이블들에 정보를 저장하기 시작함, 결제 시작 시점도 저장함
// qr 코드 만들고 바로 시행되어야 함 그래야 
async function startSetting() {
    console.log("--startSetting 시작--");
    // 접근 db name : payment_receipt_status_info
    // payment_receipt_status_info db columns : payment_receipt_idx, payment_status, payment_start_time, payment_end_time

    // payment_receipt_status_info db에 statusInfo정보 저장
    const payment_receipt_idx = await statusInfoDB.create();
    if(payment_receipt_idx !== -1) {
        console.log("--startSetting 종료--");
        return payment_receipt_idx; // db에 저장 성공하면 payment_receipt_idx 반환
    }
    else {
        console.log("--startSetting 비정상 종료--");
        return -1; // db에 저장 실패하면 -1 반환
    }
}

// paymentReceiptStatusInfo에 마지막 end_time 설정하고, status 바꾸는 함수
async function endSetting(paymentReceiptIdx, paymentStatus) {

    const result = await statusInfoDB.updatePaymentEnd(paymentReceiptIdx, paymentStatus);
    return result; // 1: 성공, -1: 실패
}

// 해당 영수증(거래)에서 결제해야할 총 원화 개수 구하기
// product_info db에서 product_won_price_per를 가져오고, 
// payment_receipt_multiple_products_info db에서 quantity를 가져와서 곱한 것들을 다 더하여 총 원화 가격을 계산함
async function getTotalWonPrice(payment_receipt_idx) {
    // 접근 db name : product_info
    // product_info db columns : product_info_idx, product_name, product_won_price_per
    // 접근 db name : payment_receipt_multiple_products_info
    // payment_receipt_multiple_products_info db columns : payment_receipt_idx, product_info_idx, quantity

    // payment_receipt_idx : 결제 영수증 식별 idx
    
    // payment_receipt_multiple_products_info db에서 
    // payment_receipt_idx에 해당하는 product_info_idx와 quantity를 객체형태로 가져옴
    const ProductInfoIdxAndQuantityObject = await MultipleProductsInfoDB.readAllProductInfoIdxAndQuantity(payment_receipt_idx);
    
    let totalPrice = 0;

    if(ProductInfoIdxAndQuantityObject) {
        for (const product_info_idx in ProductInfoIdxAndQuantityObject) {

            const productInfo = await productInfoDB.readProductInfo(product_info_idx);
            const quantity = ProductInfoIdxAndQuantityObject[product_info_idx];
            const one_product_total_price = productInfo.product_won_price_per * quantity;
            totalPrice += one_product_total_price;
        }
    }
  
    
    return totalPrice;
}

// 3.
// 앱에서 QR을 찍고 상품 정보를 받으면 
// 앱에서 실행되는 결제를 위한 사전 준비 함수 (paymentReceiptDB들을 모두 만듦)
async function preparePayment(products, seller_id, customer_id) {
    // 접근 db name : payment_receipt 관련 DB는 모두 다

    // input_networkInfo : 네트워크 정보 -> 맨 나중에 넣으면 돼서 삭제
    // priceAddressInfo : 가격과 주소 정보 
    // products : 제품 정보

    // products가 만약 이렇다면
    // const temp_products = [
    //     {
    //         product_name: "Product A",
    //         product_won_price_per: 1000,
    //         quantity : 1
    //     },
    //     {
    //         product_name: "Product B",
    //         product_won_price_per: 2000,
    //         quantity : 2
    //     },
    //     {
    //         product_name: "Product C",
    //         product_won_price_per: 3000,
    //         quantity : 3
    //     }
    // ];

    // 주의사항 
    // 1. await 꼭 넣기
    // 2. DB 접근하는 함수를 쓸 때 document name 제대로 접근하는지 쓰기
    // seller ID 다 바꾸고 진행해야되는 거 알지?

    // 주의사항 
    // 1. await 꼭 넣기
    // 2. DB 접근하는 함수를 쓸 때 document name 제대로 접근하는지 쓰기
    // seller ID 다 바꾸고 진행해야되는 거 알지?
    // 주의사항 
    // 1. await 꼭 넣기
    // 2. DB 접근하는 함수를 쓸 때 document name 제대로 접근하는지 쓰기
    // seller ID 다 바꾸고 진행해야되는 거 알지?
    

    let result = -1; // -1로 초기화

    // 3-1. status_info DB 생성
    // 앱 -> 서버
    const payment_receipt_idx = await startSetting() // 초기 상태 설정 (payment_receipt_idx를 가져옴)
    
    // 3-2.participants DB 생성
    // 해당 영수증(거래)에 참여한 consumer_id와 seller_id 저장
    result = await ParticipantsDB.create(payment_receipt_idx, customer_id, seller_id); // 저장하는 곳은 payment_receipt_participants db
    if(result === -1) {
        return -1; // 실패
    }

    // 3-3. multiple_products_info DB ,product_info DB, seller_products DB 생성
    // 앱 -> 서버
    // 제품 정보 저장 (있으면 저장 안하고 없으면 저장하고 ) 어쨋든 product_info_idx를 리턴
    // 여기서 products를 하나의 product로 나눠서 넣어주고, 함수 써주는 게 깔끔할 듯
    for (let i = 0; i < products.length; i++) {
        const one_product_info_object = products[i];
        console.log(`${i+1}번째 루프`)
        // 3-2. 셀러가 넣은 제품의 데이터가 seller_products에 있는지 확인하고 없으면 저장하는 함수
        // 데이터가 없다면 result 값은 1, 있다면 0,
        // result 값이 -1이면 데이터 없어서 저장하다가 실패한 경우
        // 저장하는 곳은 seller_products, product_info db
        const product_info_idx_num = await saveProductDataSentBySeller(seller_id, one_product_info_object); 
        if(product_info_idx_num === -1) {
            // 데이터 저장이 실패했다면
            return -1; // -1: 실패
        }
        else {
            console.log("preparePayment의 마지막 부분 MultipleProductsInfoDB.create")
            // 이부분에 들어왔다면 정상 작동 흐름임, product_info_idx이 값을 가지고 있음

            // 3-3.
            // 저장하는 곳은 payment_receipt_multiple_products_info db
            result = await MultipleProductsInfoDB.create(payment_receipt_idx, product_info_idx_num, one_product_info_object.quantity); 
            if(result === -1) return -1; // -1: 실패
        }
    }

    // 3-4.price_address_info DB 생성
    // 앱 -> 서버
    const total_won_price = await getTotalWonPrice(payment_receipt_idx); // 총 원화 가격 계산
    console.log("계산된 total_won_price : ", total_won_price);
    const priceAddressInfoData = {
        payment_receipt_idx: payment_receipt_idx,
        total_won_price: total_won_price,
        total_coin_price: null, // 나중에 정해짐
        sender_consumer_id: customer_id,
        receiver_seller_id: seller_id,
        sender_wallet_address: null, // 나중에 정해짐
        receiver_wallet_address: null // 나중에 정해짐
    }
    const result10 = await PriceAddressInfoDB.create(payment_receipt_idx, null, total_won_price, customer_id, seller_id, null, null);
    if (result10 === -1) return -1; // -1: 실패

    return 1111;
};

function calculateTotalCoinPrice(total_won_price) {
    return 9999;
}

// 소비자가 지갑 연결 후 앱에서 실행되는 함수
// 지갑 연결 되면 **네트워크 변경은 없다고 가정하고 함수를 만들어봄**
// 지갑 연결 후 앱에서 실행되는 함수
// payment_receipt_price_address_info , payment_receipt_network_info db에 정보를 저장
async function AfterConnectWallet(payment_receipt_idx, priceAddressInfo_object, networkInfo_obejct) {
    // 접근 db name : payment_receipt_price_address_info
    // payment_receipt_price_address_info db columns : payment_receipt_idx, total_coin_price, sender_consumer_id, receiver_seller_id, sender_wallet_address, receiver_wallet_address
    // 접근 db name : payment_receipt_network_info
    // payment_receipt_network_info db columns : payment_receipt_idx, payment_wallet_name, blockchain_name, detailed_network_name, detailed_network_id
    
    // priceAddressInfo_object는 이렇게 이루어져있음
        // payment_receipt_idx : 결제 영수증 식별 idx
        // total_won_price : 총 원화 가격 -> 사용할 데이터
        // total_coin_price : 총 코인 가격 -> 사용할 데이터
        // sender_consumer_id : 발신자 id
        // receiver_seller_id : 수신자 id
        // sender_wallet_address : 발신자 지갑 주소 -> 사용할 데이터
        // receiver_wallet_address : 수신자 지갑 주소 -> 사용할 데이터

    // networkInfo_obejct는 이렇게 이루어져있음
        // payment_receipt_idx : 결제 영수증 식별 idx
        // payment_wallet_name : 결제 지갑 이름 -> 사용할 데이터
        // blockchain_name : 블록체인 이름 -> 사용할 데이터
        // detailed_network_name : 네트워크 이름 -> 사용할 데이터
        // detailed_network_id : 네트워크 id -> 사용할 데이터
    
        // 코인 가격 계산
    const dbGetData = await PriceAddressInfoDB.read(payment_receipt_idx);
    const total_coin_price = calculateTotalCoinPrice(dbGetData.total_won_price);
    const result1 = await PriceAddressInfoDB.update(
        payment_receipt_idx, 
        total_coin_price, 
        dbGetData.total_won_price,
        dbGetData.sender_consumer_id,
        dbGetData.receiver_seller_id,
        priceAddressInfo_object.sender_wallet_address, 
        priceAddressInfo_object.receiver_wallet_address);
    if(result1 === -1) return -1; // -1: 실패

    const result2 = await NetworkInfoDB.create(
        payment_receipt_idx,
        networkInfo_obejct.payment_wallet_name,
        networkInfo_obejct.main_blockchain_name,
        networkInfo_obejct.detailed_network_name,
        networkInfo_obejct.detailed_network_id);
    if(result2 === -1) return -1; // -1: 실패

    // 결제관련 테이블이 모두 완성되었으므로 
    // 결제 전 관련 테이블 모두 완성 상태 번호 = "0011"
    const result = await statusInfoDB.updateOnlyStatus(payment_receipt_idx, "0011");

    return 1; // 1: 성공    
}

// 4. 결제 버튼 누른 후 앱에서 실행되는 함수
// total_won_price, total_coin_price 계산 끝났고
// priceAddressInfo 객체도 다 만들어졌고
// networkInfo 객체도 다 만들어진 상태
// 이젠 앱에서 코인가격, 네트워크, 결제 진행할 지갑주소 등 블록체인 결제를 위한 정보 페이지 제공 후
// "결제하기" 버튼이 사용자에게 제공되고, 사용자가 "결제하기" 버튼을 누르면 실행되는 함수

// payment_receipt_status_info의 status가 1 "결제 중"으로 바꿈
async function AfterSignTxOnBlockchain(payment_receipt_idx) {

    // 접근 db name : payment_receipt_status_info
    // payment_receipt_status_info db columns : payment_receipt_idx, payment_status, payment_start_time, payment_end_time
    
    // payment_receipt_idx : 결제 영수증 식별 idx

    // 결제 중 상태(1)로 바꿈
    const result = await statusInfoDB.updateOnlyStatus(payment_receipt_idx, 1);

    return result; // 1: 성공, -1: 실패
}

// 5. 결제 완료 후 앱에서 실행되는 함수
async function AfterTxCompleted(payment_receipt_idx) {
    // 접근 db name : payment_receipt_status_info
    // payment_receipt_status_info db columns : payment_receipt_idx, payment_status, payment_start_time, payment_end_time

    // payment_receipt_idx : 결제 영수증 식별 idx

    // payment_receipt_status_info의 status를 999 "결제 완료"으로 바꿈
    const result = await endSetting(payment_receipt_idx, 999)
    return result; // 1: 성공, -1: 실패
}

export { 
    saveProductDataSentBySeller,
    preparePayment,
    AfterConnectWallet,
    AfterSignTxOnBlockchain,
    AfterTxCompleted }

// 6. 결제가 완료되었다는 것을 서버가 DB를 확인하다가 알아서 판매자 플랫폼에 보내주면 될 듯

