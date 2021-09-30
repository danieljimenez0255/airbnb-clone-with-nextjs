import { useRef, useEffect } from "react";
import PhoneCode from "./PhoneCode";
import { handleClick, listScroll } from "@/lib/DomEventFuncs";
import PhoneNumberLogin from "./PhoneNumberLogin";
import EmailLogin from "./EmailLogin";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  aBorder,
  emailAndPhone,
  emailVerification,
  pInput,
  pVerification,
  sCheck,
} from "@/lib/atoms";
import WrongMessage from "../util/WrongMessage";

export default function PhoneLogin() {
  const phoneOrEmail = useRecoilValue(emailAndPhone);
  const [activeBorder, setActiveBorder] = useRecoilState(aBorder);
  const setPhoneInput = useSetRecoilState(pInput);
  const setScrollCheck = useSetRecoilState(sCheck);
  const phoneVerification = useRecoilValue(pVerification);
  const emailVerificationM = useRecoilValue(emailVerification);

  const mainRef = useRef(null);

  let phoneNumFuc = function (e) {
    handleClick(
      e,
      { one: mainRef?.current?.aCRefM(), two: mainRef?.current?.phCodeRefM() },
      setActiveBorder,
      setPhoneInput
    );
  };
  let emailDiv = function (e) {
    handleClick(
      e,
      { three: mainRef?.current?.emailDivRefM() },
      setActiveBorder,
      setPhoneInput
    );
  };

  useEffect(() => {
    if (phoneOrEmail === "phone") {
      if (mainRef?.current?.aCRefM() && mainRef?.current?.phCodeRefM()) {
        document.removeEventListener("mousedown", emailDiv);
        document.addEventListener("mousedown", phoneNumFuc);
      }
    } else {
      if (mainRef?.current?.emailDivRefM()) {
        document.removeEventListener("mousedown", phoneNumFuc);
        document.addEventListener("mousedown", emailDiv);
      }
    }
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", emailDiv);
      document.removeEventListener("mousedown", phoneNumFuc);
    };
  }, [phoneOrEmail]);

  useEffect(() => {
    if (phoneOrEmail === "phone") {
      if (window) {
        listScroll("", activeBorder, setScrollCheck);
      }
      window.addEventListener("scroll", (e) =>
        listScroll(e, activeBorder, setScrollCheck)
      );
    } else {
      window.removeEventListener("scroll", (e) =>
        listScroll(e, activeBorder, setScrollCheck)
      );
    }
    return () => {
      window?.removeEventListener("scroll", (e) =>
        listScroll(e, activeBorder, setScrollCheck)
      );
    };
  }, [activeBorder, phoneOrEmail]);

  return (
    <>
      {phoneVerification.display === false ? (
        <>
          {phoneOrEmail === "phone" ? (
            <>
              {phoneVerification.display === false &&
                phoneVerification.validNumberMessage === "no success" && (
                  <WrongMessage
                    icon="exclamation-circle"
                    headerText="Let's try that again"
                    desc="That phone number is either too short or too long. Make sure you've
                  entered the right number and try again."
                  />
                )}
              <PhoneNumberLogin ref={mainRef} />
            </>
          ) : (
            <>
              {emailVerificationM?.validMessage !== "0" && (
                <WrongMessage
                  icon="exclamation-circle"
                  headerText="Cannot Sign In"
                  desc={emailVerificationM?.validMessage}
                />
              )}
              <EmailLogin ref={mainRef} />
            </>
          )}
        </>
      ) : (
        <PhoneCode />
      )}
    </>
  );
}
