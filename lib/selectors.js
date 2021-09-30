import { selector } from "recoil";
import { guestsTotalAtom, pAndE, selectedM, verifyInfo } from "./atoms";
import { phoneFormatFunc } from "./formatterFunctions";
import CryptoJS from "crypto-js";

export const phoneFormatter = selector({
  key: "phoneNumFormatter",
  get: ({ get }) => {
    const inputDetails = get(pAndE);
    const location = get(selectedM);
    const updatedText = phoneFormatFunc(inputDetails, location);

    return updatedText;
  },
});

export const guestsCountM = selector({
  key: "totalGuests",
  get: ({ get }) => get(guestsTotalAtom),
  set: ({ set }, newValue) => set(guestsTotalAtom, newValue),
});

export const verifyInfoDecrypt = selector({
  key: "decryptVerify",
  get: ({ get }) => {
    const verifyInfoS = get(verifyInfo);
    if (verifyInfoS?.loginInfo[0]?.info) {
      const decryptVerifyM = JSON.parse(
        CryptoJS.AES.decrypt(
          verifyInfoS?.loginInfo[0]?.info,
          verifyInfoS?.loginInfo[0]?.infoS
        ).toString(CryptoJS.enc.Utf8)
      );

      return [verifyInfoS, { mainInfo: decryptVerifyM }];
    }
    return verifyInfoS;
  },
});
