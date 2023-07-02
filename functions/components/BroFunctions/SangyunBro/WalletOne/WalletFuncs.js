
const sellersChosenWalletDB = require("../../../User/SellerData/Chosen/Wallet/SellersChosenWalletCRUD");
const cryptoWalletListDB = require("../../../NangNangServe/CryptoWalletList/CryptoWalletListCRUD");


// 2. 낭낭에서 사용 가능한 지갑 조회/등록
// 2-1. 낭낭에서 사용 가능한 지갑 조회

// 2-1. 낭낭에서 사용 가능한 지갑 조회
module.exports = {
  
  async readCryptoWalletListFunc(datas) {
    try {
      console.log("readCryptoWalletListFunc 잘 들어왔습니다.")
      // 사용 가능한 지갑 번호(idx)와 이름(walletName)을 오브젝트로 반환
      const result = await cryptoWalletListDB.read(datas);
      return result;
    } catch (error) {
      console.error(error);
      throw error; // 오류 처리를 위해 예외를 던집니다.
    }
  },

  // 2-2. sellersChosenWalletDB에 선택한 지갑 등록
  async createSellerChosenWalletFunc(datas) {
    const input_seller_id = datas.seller_id;
    const input_crypto_wallet_idx = datas.crypto_wallet_idx;
    console.log("createSellerChosenWalletFunc 잘 들어왔습니다.");
    try {
      // 등록 성공시 1, 실패시 -1 반환
      const result = await sellersChosenWalletDB.create(datas);
      return result;
    } catch (error) {
      console.error(error);
      throw error; // 오류 처리를 위해 예외를 던집니다.
    }
  }
}
