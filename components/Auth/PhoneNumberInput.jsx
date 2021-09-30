import { forwardRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pAndE, pInput, selectedM } from "@/lib/atoms";
import { phoneFormatter } from "@/lib/selectors";

const PhoneNumberInput = (props, ref) => {
  const selected = useRecoilValue(selectedM);
  const codeLength = selected.substring(selected.indexOf("(")).length;
  const setPhoneNumberAndEmail = useSetRecoilState(pAndE);
  const phoneNumberAndEmail = useRecoilValue(phoneFormatter);
  const phoneInput = useRecoilValue(pInput);

  return (
    <>
      <div
        className={`flex ${
          phoneInput ||
          (phoneNumberAndEmail?.phone !== " " &&
            phoneNumberAndEmail?.phone.length > 0)
            ? "flex-col"
            : "items-center"
        } transition-all duration-75 `}
      >
        <p
          className={`${
            phoneInput ||
            (phoneNumberAndEmail?.phone !== " " &&
              phoneNumberAndEmail?.phone.length > 0)
              ? "text-xs"
              : ""
          } transition-all duration-300 leading-5 text-auth-gray`}
        >
          Phone Number
        </p>
        {phoneInput ||
        (phoneNumberAndEmail?.phone !== " " &&
          phoneNumberAndEmail?.phone.length > 0) ? (
          <p className={`${phoneInput ? "" : "relative top-[2px]"}`}>
            {selected.substring(selected.indexOf("("))}
          </p>
        ) : null}
      </div>

      <input
        ref={ref}
        type="text"
        id="phoneNumber"
        value={phoneNumberAndEmail.phone}
        onChange={(e) =>
          setPhoneNumberAndEmail({
            phone: e.target.value,
            email: phoneNumberAndEmail.email,
          })
        }
        className={`${
          !phoneInput && phoneNumberAndEmail?.phone === "" && "h-0"
        } absolute flex-grow outline-none self-end ${
          codeLength === 4
            ? "right-2 w-[88%]"
            : codeLength === 5
            ? "left-14 w-[87%]"
            : "left-16 pr-2 w-[86%]"
        } `}
      />
    </>
  );
};

export default forwardRef(PhoneNumberInput);
