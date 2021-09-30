import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useRecoilState } from "recoil";
import { verifyInfo } from "@/lib/atoms";

const Upcoming = () => {
  const [open, setOpen] = useState(true);
  const [vInfo, setVInfo] = useRecoilState(verifyInfo);
  const closeModal = () => {
    setVInfo({
      loginInfo: [
        {
          info: vInfo?.loginInfo[0]?.info,
          infoS: vInfo?.loginInfo[0]?.infoS,
          first: vInfo?.loginInfo[0]?.first,
          infoSeen: true,
          image: vInfo?.loginInfo[0]?.image,
        },
      ],
    });
    setOpen(false);
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[65] overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-semibold leading-6 text-[#FF385C] "
              >
                Welcome to my Airbnb Clone!
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  You have successfully signed in for the first time! More
                  updates will come soon where you'll be able to update account
                  info and more! This is a one time pop up just to inform you!
                </p>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  This project was built for educational purposes only! More
                  info on how this is built will be coming soon:)
                </p>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-semibold text-white bg-[#FF385C] hover:bg-[#DE1362] rounded-md transition-all duration-200"
                  onClick={closeModal}
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Upcoming;
