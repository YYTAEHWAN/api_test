
const sellersChosenWalletDB = require("../../../User/SellerData/Chosen/Wallet/SellersChosenWalletCRUD");
const cryptoWalletListDB = require("../../../NangNangServe/CryptoWalletList/CryptoWalletListCRUD");


// 2. 낭낭에서 사용 가능한 지갑 조회/등록
// 2-1. 낭낭에서 사용 가능한 지갑 조회

// 2-1. 낭낭에서 사용 가능한 지갑 조회
module.exports = {
  
  async readCryptoWalletListFunc() {
    try {
      // 사용 가능한 지갑 번호(idx)와 이름(walletName)을 오브젝트로 반환
      const result = await cryptoWalletListDB.readCryptoWalletList();
      return result;
    } catch (error) {
      console.error(error);
      throw error; // 오류 처리를 위해 예외를 던집니다.
    }
  },

  // 2-2. sellersChosenWalletDB에 선택한 지갑 등록
  async createSellerChosenWalletFunc(input_seller_id, input_crypto_wallet_idx) {
    try {
      // 등록 성공시 1, 실패시 -1 반환
      const result = await sellersChosenWalletDB.createSellersChosenWallet(
        input_seller_id,
        input_crypto_wallet_idx
      );
      return result;
    } catch (error) {
      console.error(error);
      throw error; // 오류 처리를 위해 예외를 던집니다.
    }
  }
}
