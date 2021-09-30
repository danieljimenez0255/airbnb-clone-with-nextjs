import { forwardRef, useImperativeHandle, useRef } from "react";
import { useRecoilState } from "recoil";
import { aBorder, pInput } from "@/lib/atoms";
import PhoneNumberInput from "./PhoneNumberInput";
import PhoneNumberListbox from "./PhoneNumberListbox";
import PhoneNumberSubmit from "./PhoneNumberSubmit";

const PhoneNumberLogin = (props, ref) => {
  const areaCodeRef = useRef(null);
  const phoneCodeRef = useRef(null);
  const inputRef = useRef(null);
  const [phoneInput, setPhoneInput] = useRecoilState(pInput);
  const [activeBorder, setActiveBorder] = useRecoilState(aBorder);

  useImperativeHandle(ref, () => ({
    aCRefM: () => {
      return areaCodeRef?.current;
    },
    phCodeRefM: () => {
      return phoneCodeRef?.current;
    },
  }));

  return (
    <>
      <div
        className="mb-0 relative z-50"
        ref={areaCodeRef}
        onClick={() => {
          if (phoneInput) {
            setPhoneInput(false);
          }
        }}
      >
        <PhoneNumberListbox />
      </div>
      <div
        ref={phoneCodeRef}
        onClick={() => {
          if (!phoneInput) {
            setActiveBorder(2);
            setPhoneInput(true);
            inputRef.current.focus();
          }
        }}
        className={`relative mt-0 border flex ${
          activeBorder === 2 && " border-black border-2 "
        } w-full py-1 pl-3  rounded-b-lg shadow-md cursor-pointer bg-white h-14`}
      >
        <PhoneNumberInput ref={inputRef} />
      </div>
      <PhoneNumberSubmit />
    </>
  );
};

export default forwardRef(PhoneNumberLogin);
