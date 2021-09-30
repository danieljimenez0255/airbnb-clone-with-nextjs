import { signIn } from "next-auth/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { phoneFormatter } from "@/lib/selectors";
import { emailVerification } from "@/lib/atoms";
import { checkMouse } from "@/lib/DomEventFuncs";

const EmailInputSubmit = () => {
  const phoneNumberAndEmail = useRecoilValue(phoneFormatter);
  const setEmailVerificationCheck = useSetRecoilState(emailVerification);

  return (
    <div>
      <div className="mt-4 mb-6">
        <button
          onMouseMove={checkMouse}
          type="button"
          className="relative overflow-hidden text-center ml-auto text-lg cursor-pointer leading-5 font-semibold rounded-lg  text-white bg-gradient-to-r from-[#e61e4d] via-[#e31c5f] to-[#d70466] bg-black w-full h-12 gradient__follow"
          style={{
            touchAction: "manipulation",
          }}
          onClick={async () => {
            const checkEmail = await fetch("/api/auth/userCheck", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: phoneNumberAndEmail?.email }),
            }).then((res) => res.json());
            if (
              checkEmail?.email === phoneNumberAndEmail?.email &&
              !checkEmail?.emailVerified
            ) {
              setEmailVerificationCheck({
                validMessage:
                  "Error! Cannot use password-less sign in because email is already in use and not verified. If you are able to verify via account settings, you can also sign in with password-less sign in. Sign In with correct provider",
              });
            } else {
              signIn("email", {
                email: phoneNumberAndEmail?.email,
                callbackUrl: "/",
              });
              setEmailVerificationCheck({
                validMessage: "0",
              });
            }
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default EmailInputSubmit;
