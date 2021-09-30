import { useRecoilValue, useSetRecoilState } from "recoil";
import { pVerification, selectedM } from "@/lib/atoms";
import { checkMouse } from "@/lib/DomEventFuncs";
import { reconstructNum } from "@/lib/formatterFunctions";
import { phoneFormatter } from "@/lib/selectors";

const PhoneNumberSubmit = () => {
  const selected = useRecoilValue(selectedM);
  const phoneNumberAndEmail = useRecoilValue(phoneFormatter);
  const setPhoneVerification = useSetRecoilState(pVerification);

  const sendCode = async (input, type = "sms") => {
    const sendCodeRes = await fetch("/api/getCode?" + "type=" + type, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ verifyValue: input }),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err.message));
    return sendCodeRes;
  };

  const checkPhone = async () => {
    const numOutput = reconstructNum(selected, phoneNumberAndEmail);
    const message = await sendCode(numOutput, "sms");
    if (message.response === "not successful") {
      setPhoneVerification({
        display: false,
        validNumberMessage: "no success",
      });
    } else {
      setPhoneVerification({
        display: true,
        validNumberMessage: "Verification Successful",
      });
    }
  };

  return (
    <div>
      <div className="mt-2 text-airbnb22 text-xs leading-4 font-normal">
        <span>
          We’ll call or text you to confirm your number. Standard message and
          data rates apply.
          <br />
          <a
            className="underline rounded font-semibold outline-none"
            href="https://www.airbnb.com/help/article/2855"
            target="_blank"
          >
            Privacy Policy
          </a>
        </span>
      </div>
      <div className="mt-4 mb-6" onClick={checkPhone}>
        <button
          onMouseMove={checkMouse}
          type="button"
          className="relative overflow-hidden text-center ml-auto text-lg cursor-pointer leading-5 font-semibold rounded-lg  text-white bg-gradient-to-r from-[#e61e4d] via-[#e31c5f] to-[#d70466] bg-black w-full h-12 gradient__follow"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PhoneNumberSubmit;
