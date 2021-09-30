import { forwardRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pAndE, pInput } from "@/lib/atoms";
import { phoneFormatter } from "@/lib/selectors";

const EmailInput = ({}, ref) => {
  const setPhoneNumberAndEmail = useSetRecoilState(pAndE);
  const phoneNumberAndEmail = useRecoilValue(phoneFormatter);
  const phoneInput = useRecoilValue(pInput);

  return (
    <>
      <div
        className={`flex ${
          phoneInput ||
          (phoneNumberAndEmail?.email !== " " &&
            phoneNumberAndEmail?.email.length > 0)
            ? "flex-col"
            : "items-center"
        } transition-all duration-75 `}
      >
        <p
          className={`${
            phoneInput ||
            (phoneNumberAndEmail?.email !== " " &&
              phoneNumberAndEmail?.email.length > 0)
              ? "text-xs"
              : ""
          } transition-all duration-300 leading-5 text-auth-gray`}
        >
          Email
        </p>
      </div>

      <input
        ref={ref}
        type="email"
        id="phoneNumber"
        value={phoneNumberAndEmail.email}
        onChange={(e) => {
          setPhoneNumberAndEmail({
            phone: phoneNumberAndEmail.phone,
            email: e.target.value,
          });
        }}
        className={`${
          !phoneInput && phoneNumberAndEmail?.email === "" && "h-0"
        } absolute w-[95%] outline-none self-end  `}
      />
    </>
  );
};

export default forwardRef(EmailInput);
