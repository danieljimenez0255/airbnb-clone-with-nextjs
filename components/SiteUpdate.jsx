import { Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
import { activeLinkM } from "@/lib/atoms";

const SiteUpdate = ({ type }) => {
  const [open, setOpen] = useState(false);
  const setActiveLink = useSetRecoilState(activeLinkM);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(true);
      clearTimeout(timeout);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="relative z-[90] h-full flex flex-col justify-center items-center">
      <Transition
        show={open}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
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
            Coming Soon!
          </h1>
          <p className="font-medium text-center text-[13px] sm:text-base">
            The {type} section will be coming soon in later site updates. You
            Can Click the button below to dismiss the message
          </p>
          <button
            type="button"
            className="mt-2 bg-airbnb-red py-3 px-4 text-white font-semibold rounded-lg"
            onClick={() => {
              setOpen(false);
              const timeout = setTimeout(() => {
                setActiveLink(1);
                clearTimeout(timeout);
              }, 1000);
            }}
          >
            Close Message
          </button>
        </div>
      </Transition>
    </div>
  );
};

SiteUpdate.propTypes = {
  type: PropTypes.string,
};

export default SiteUpdate;
