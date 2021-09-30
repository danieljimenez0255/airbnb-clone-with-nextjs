import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState, useSetRecoilState } from "recoil";
import { emailAndPhone, emailVerification } from "@/lib/atoms";
import { useRouter } from "next/router";
import { useState } from "react";

const logoColors = [
  {
    company: "Google",
    color: "text-[red]",
  },
  {
    company: "Facebook",
    color: "text-blue-400",
  },
  {
    company: "Spotify",
    color: "text-spotify-green",
  },
  {
    company: "GitHub",
    color: "text-black",
  },
  {
    company: "Email",
    color: "text-black",
  },
];

const ProvidersLogin = ({ providers }) => {
  const [phoneOrEmail, setPhoneOrEmail] = useRecoilState(emailAndPhone);
  const setEmailVerificationCheck = useSetRecoilState(emailVerification);
  const [errorState, setErrorState] = useState(true);
  const router = useRouter();

  const signInFunc = (id) => {
    signIn(id);
    setEmailVerificationCheck({ validMessage: "" });
  };

  return (
    <div>
      {router?.query?.error === "OAuthAccountNotLinked" && errorState && (
        <div className="relative border border-authGray rounded-xl pt-5 pb-4 px-4 mb-4 bg-airbnb-red">
          <p
            onClick={() => setErrorState(false)}
            className="inline-flex justify-center items-center cursor-pointer border border-white bg-[#FF385C] text-white font-bold rounded-full text-sm w-6 h-6 p-3 absolute right-2 top-1"
          >
            X
          </p>
          <h2 className="text-white font-bold">
            Error! To confirm your identity, sign in with the account you
            originally used
          </h2>
        </div>
      )}
      <div className="flex flex-col space-y-4">
        {Object?.values(providers)?.map(({ id, name: brandName }, i) => (
          <button
            key={id}
            type="button"
            onClick={() =>
              id !== "email"
                ? signInFunc(id)
                : setPhoneOrEmail(phoneOrEmail === "phone" ? "email" : "phone")
            }
            className="inline-flex items-center cursor-pointer bg-transparent w-full m-0 text-center no-underline leading-6 tracking-normal text-[#484848] py-3 font-extrabold rounded-lg border hover:border-2 border-solid  border-authGray shadow-md  px-3 min-w-[71px] hover:scale-90 transition-all duration-500"
          >
            {id !== "email" ? (
              <>
                <FontAwesomeIcon
                  icon={["fab", brandName.toLowerCase()]}
                  className={`bg-white ${logoColors[i].color} rounded-full`}
                  size="2x"
                />
                <span className="inline-block m-auto">
                  Continue with {brandName}
                </span>
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={phoneOrEmail === "phone" ? "envelope" : "mobile-alt"}
                  className="bg-white ${logoColors[i].color} rounded-full"
                  size="2x"
                />
                <span className="inline-block m-auto">
                  Continue with{" "}
                  {phoneOrEmail === "phone" ? "Email Verification" : "Phone"}
                </span>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProvidersLogin;
