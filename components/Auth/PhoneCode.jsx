import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { pAndE, pVerification, selectedM, verifyInfo } from "@/lib/atoms";
import InputCode from "./InputCode";
import { reconstructNum } from "@/lib/formatterFunctions";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";

const PhoneCode = () => {
  const phoneNumberAndEmail = useRecoilValue(pAndE);
  const selected = useRecoilValue(selectedM);
  const [phoneVerification, setPhoneVerification] = useRecoilState(
    pVerification
  );
  const setPhoneAndEmail = useSetRecoilState(pAndE);
  const setVInfo = useSetRecoilState(verifyInfo);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const codeVerification = async (input, code, type) => {
    const sendCodeRes = await fetch(
      "https://airbnb-clone-with-nextjs.vercel.app/api/verify?" + "type=" + type,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verifyValue: input, code: code }),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.error(err.message));
    setResponse(sendCodeRes.response);
    setLoading(false);
    if (sendCodeRes?.response === "successful verification") {
      completeSignIn(input);
    }
  };

  const completeSignIn = async (num) => {
    let checkPhone = null;
    let encryptedInfo = null;
    const specialSecret = uuidv4();

    // checks if user already exists
    const checkExist = await fetch("https://airbnb-clone-with-nextjs.vercel.app/api/auth/userCheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: num }),
    }).then((res) => res.json());

    // if not will add new user to mongodb
    if (!checkExist?.phone) {
      checkPhone = await fetch(
        "https://airbnb-clone-with-nextjs.vercel.app/api/auth/phone-create-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone: num }),
        }
      ).then((res) => res.json());

      // returned sign in info is encrypted and only decrypted when necessary
      encryptedInfo = CryptoJS.AES.encrypt(
        JSON.stringify(checkPhone),
        specialSecret
      ).toString();
      // then is persisted to local storage for temp auth persistence until logged out
      setVInfo({
        loginInfo: [
          {
            info: encryptedInfo,
            infoS: specialSecret,
            first: true,
            infoSeen: false,
            image: "",
          },
        ],
      });
    } else {
      encryptedInfo = CryptoJS.AES.encrypt(
        JSON.stringify(checkExist),
        specialSecret
      ).toString();
      setVInfo({
        loginInfo: [
          {
            info: encryptedInfo,
            infoS: specialSecret,
            first: false,
            infoSeen: true,
            image: "",
          },
        ],
      });
    }
    // if able to successfully create user or log back in
    if (checkPhone?.res === "successfully create!" || checkExist?.phone) {
      setPhoneVerification({
        display: false,
        validNumberMessage: phoneVerification?.validNumberMessage,
      });
      setPhoneAndEmail({
        phone: phoneNumberAndEmail.phone,
        email: phoneNumberAndEmail.email,
      });
    }
  };

  return (
    <div className="flex flex-col content-start  space-y-3 border border-authGray shadow-md p-7 rounded-lg">
      <h2>Enter the code we sent over SMS to {phoneNumberAndEmail.phone}:</h2>
      <InputCode
        length={6}
        loading={loading}
        onComplete={(code) => {
          setLoading(true);
          codeVerification(
            reconstructNum(selected, phoneNumberAndEmail),
            code,
            "sms"
          );
        }}
      />
      {loading === true && (
        <h2 className="mt-1 text-red-500">
          <FontAwesomeIcon
            className="animate-spin mr-1"
            icon="spinner"
            size="1x"
          />
          <span>Loading...</span>
        </h2>
      )}
      {response === "not successful" && (
        <h2 className="inline-flex items-center text-red-500 font-bold">
          <FontAwesomeIcon
            icon={"exclamation-circle"}
            className="text-[#c13514]"
            size="1x"
          />
          Incorrect code. Please try again.
        </h2>
      )}

      <p>
        Didn't get a code?
        <span className="inline-block font-bold underline ml-1 cursor-pointer">
          Click to resend
        </span>
        or use another sign in method
      </p>
    </div>
  );
};

export default PhoneCode;
