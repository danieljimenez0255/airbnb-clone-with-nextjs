import { ChevronLeftIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { displayM, locationAtom } from "@/lib/atoms";
import MobileOption from "./MobileOption";
import MobileCal from "./MobileCal";
import MobileGuests from "./MobileGuests";

const MobileSelect = () => {
  const [ani, setAni] = useState(false);
  const [mobileS, setMobileS] = useRecoilState(displayM);
  const searchInput = useRecoilValue(locationAtom);

  useEffect(() => {
    let interval = setTimeout(() => {
      setAni(true);
      clearTimeout(interval);
    }, 5);

    return () => clearTimeout(interval);
  }, []);

  return (
    <>
      {mobileS === 1 ? (
        <>
          <h1 className="text-white text-[26px] leading-[30px] font-semibold mb-4 pl-6">
            What are you looking for?
          </h1>

          <div
            className={`bg-white rounded-tl-xl rounded-tr-xl ${
              ani ? "h-[300px]" : "h-0"
            } transition-all duration-700`}
          >
            <header className="pt-5 pb-2 flex items-center">
              <button
                type="button"
                className="p-2 rounded-full hover:bg-[#F6F6F7] ml-3.5"
                onClick={() => setMobileS(0)}
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <h3 className="mx-auto text-lg font-semibold">
                {searchInput[0]}
              </h3>
            </header>
            <div className="py-3 px-6  mb-3">
              <MobileOption
                title="Find a place to stay"
                desc="Entire homes, rooms & more"
                path="/images/mobile_imgOne.png"
              />
              <MobileOption
                title="Find an Experience"
                desc="Activities hosted by locals"
                path="/images/mobile_imgTwo.png"
              />
            </div>
          </div>
        </>
      ) : mobileS === 2 ? (
        <div className="h-[600px] bg-white rounded-tl-xl rounded-tr-xl">
          <MobileCal />
        </div>
      ) : mobileS === 3 ? (
        <>
          <h1 className="text-white text-[26px] leading-[30px] font-semibold mb-4 pl-6">
            Whose Coming?
          </h1>
          <div className="h-[420px] bg-white rounded-tl-xl rounded-tr-xl">
            <MobileGuests />
          </div>
        </>
      ) : null}
    </>
  );
};

export default MobileSelect;
