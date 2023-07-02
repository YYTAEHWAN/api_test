
const sellersChosenWalletDB = require("../../../User/SellerData/Chosen/Wallet/SellersChosenWalletCRUD");


// 3. 판매자 지갑 관리(판매자가 사용하기로 선택한 지갑 리스트를 보기)
module.exports = {
  
  async read(datas) {
    const input_seller_id = datas.seller_id;

    try {
      const result = await sellersChosenWalletDB.read(datas);
      console.log("result : " + result);
      return result; // 선택한 지갑 번호(idx) 리스트 리턴
    } catch (error) {
      console.error(error);
      throw error; // 오류 처리를 위해 예외를 던집니다.
    }
  },

  // 판매자 지갑 관리(판매자가 삭제하기로 한 지갑을 삭제)
  async delete(datas) {
    const input_seller_id = datas.seller_id;
    const input_crypto_wallet_idx = datas.crypto_wallet_idx;
    console.log("input_seller_id : " + input_seller_id);
    
    try {
      const result = await sellersChosenWalletDB.delete(datas);
      return result; // 1: 성공, -1: 실패
    } catch (error) {
      console.error(error);
      throw error; // 오류 처리를 위해 예외를 던집니다.
    }
  }
}