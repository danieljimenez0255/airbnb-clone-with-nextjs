import { forwardRef, useImperativeHandle, useRef } from "react";
import { useRecoilState } from "recoil";
import { aBorder, pInput } from "@/lib/atoms";
import EmailInput from "./EmailInput";
import EmailInputSubmit from "./EmailInputSubmit";

const EmailLogin = ({}, ref) => {
  const emailDivRef = useRef(null);
  const emailRef = useRef(null);
  const buttonRef = useRef(null);
  const [phoneInput, setPhoneInput] = useRecoilState(pInput);
  const [activeBorder, setActiveBorder] = useRecoilState(aBorder);

  useImperativeHandle(ref, () => ({
    emailDivRefM: () => {
      return emailDivRef?.current;
    },
    emailRefM: () => {
      return emailRef?.current;
    },
    buttonRefM: () => {
      return buttonRef?.current;
    },
  }));

  return (
    <>
      <div
        ref={emailDivRef}
        onClick={() => {
          if (!phoneInput) {
            setActiveBorder(3);
            setPhoneInput(true);
            emailRef.current.focus();
          }
        }}
        className={`relative mt-0 border flex ${
          activeBorder === 3 && " border-black border-2 "
        } w-full py-1 pl-3  rounded-b-lg shadow-md cursor-pointer bg-white h-14`}
      >
        <EmailInput ref={emailRef} />
      </div>
      <EmailInputSubmit ref={buttonRef} />
    </>
  );
};

export default forwardRef(EmailLogin);
