import PropTypes from "prop-types";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";

const LoginMessage = ({ success }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(true);
      clearTimeout(timeout);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-[#70019c] to-[#c6017e] h-screen">
      {success ? (
        <Transition
          show={open}
          enter="transform transition duration-[400ms]"
          enterFrom="opacity-0 rotate-[-120deg] scale-50"
          enterTo="opacity-100 rotate-0 scale-100"
        >
          <div className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-md w-[85vw] sm:w-full max-w-[450px] p-3">
            <div className="animate-pulse">
              <Image
                src="/images/airbnb-logo-red-sy.png"
                width={100}
                height={100}
              />
            </div>
            <h1 className=" my-2 text-2xl sm:text-3xl text-[#FF6A6F] font-bold">
              Successful Sign In!
            </h1>
            <p className="font-medium text-center text-[13px] sm:text-base">
              You are now being redirected to the home page to continue enjoying
              your experience
            </p>
          </div>
        </Transition>
      ) : (
        <Transition
          show={open}
          enter="transform transition duration-[400ms]"
          enterFrom="opacity-0 rotate-[-120deg] scale-50"
          enterTo="opacity-100 rotate-0 scale-100"
        >
          <div className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-md w-[85vw] sm:w-full max-w-[450px] p-3">
            <div className="animate-pulse mt-2">
              <Image
                src="/images/airbnb-logo-red-sy.png"
                width={100}
                height={100}
              />
            </div>
            <h1 className=" my-2 text-2xl sm:text-3xl text-[#FF6A6F] font-bold">
              There was an issue!
            </h1>
            <p className="font-medium text-center text-[13px] sm:text-base">
              There was an unfortunate issue with signing in! Click the button
              below to go back to the sign in page
            </p>
            <button
              type="button"
              className="my-2 py-3 px-6 bg-gradient-to-r from-[#70019c] to-[#c6017e] gradient__button  text-white rounded-2xl font-semibold before:rounded-2xl text-[13px] sm:text-base"
            >
              Sign In Page
            </button>
          </div>
        </Transition>
      )}
    </div>
  );
};

LoginMessage.propTypes = {
  success: PropTypes.bool,
};

export default LoginMessage;
