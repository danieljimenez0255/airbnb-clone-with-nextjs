import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { displayM, locationAtom } from "@/lib/atoms";
import MobileLocations from "./MobileLocations";
import MobileScheduler from "./MobileScheduler";

const MobileSearch = ({ locations }) => {
  const [searchState, setSearchState] = useState(false);
  const [searchInput, setSearchInput] = useRecoilState(locationAtom);
  const [activeInput, setActiveInput] = useState(false);
  const [mobileS, setMobileS] = useRecoilState(displayM);
  const [header, setHeader] = useState(false);
  const inputRef = useRef(null);
  const inputFocus = useRef(null);
  const locationsRef = useRef(null);

  const inputFocusOrBlur = (e) => {
    if (
      inputRef?.current?.contains(e.target) ||
      locationsRef?.current?.contains(e.target)
    ) {
      setActiveInput(true);
      const interval = setTimeout(() => {
        inputFocus?.current?.focus();
        clearTimeout(interval);
      }, 10);
    } else {
      setActiveInput(false);
    }
  };

  const headerDisplay = (e) => {
    if (window.scrollY > 30) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", inputFocusOrBlur);
    window.addEventListener("scroll", headerDisplay);
    return () => {
      document.removeEventListener("mousedown", inputFocusOrBlur);
      window.removeEventListener("scroll", headerDisplay);
    };
  }, []);

  const allLocations = locations?.filter((item) =>
    item.city.toLowerCase().startsWith(searchInput[0].toLowerCase().trim())
  );

  return (
    <>
      {mobileS === 5 ? (
        <div
          className={`sticky top-0 z-30 ${
            header ? "bg-white" : "bg-transparent"
          } transition-colors duration-700 p-4`}
        >
          <div
            onClick={() => {
              setSearchState(!searchState);
              setMobileS(0);
            }}
            className={`border flex items-center justify-center ${
              header ? "bg-[#f7f7f7]" : "bg-white"
            }  mx-6 rounded-[32px] h-12 cursor-pointer`}
          >
            <SearchIcon className="h-6 w-6 text-[#FF385C] rounded-[32px]" />
            <p className="font-bold">Where are you going?</p>
          </div>
        </div>
      ) : mobileS === 0 ? (
        <>
          <div className="w-full  absolute z-[30] overflow-hidden scrollbar-hide bg-white h-screen rounded-[32px]">
            <div className="relative mt-4 mx-6 flex ">
              <button
                type="button"
                className="p-2 mr-2 rounded-full bg-[#F6F6F7] hover:bg-gray-500 transition-all duration-300"
                onClick={() => setMobileS(5)}
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <div
                ref={inputRef}
                className="relative flex w-full rounded-[32px] bg-white shadow-xl border border-black"
              >
                {!activeInput ? (
                  <div className=" flex justify-center items-center py-2 px-6">
                    <SearchIcon className="h-6 w-6 text-[#FF385C] rounded-[32px]" />
                    <p className="font-semibold">Where are you going?</p>
                  </div>
                ) : (
                  <div className="flex items-center rounded-[32px] overflow-hidden">
                    <input
                      className="py-4 px-6 font-semibold h-full w-full outline-none"
                      ref={inputFocus}
                      type="text"
                      value={searchInput[0]}
                      onChange={(e) =>
                        setSearchInput([e.target.value, searchInput.country])
                      }
                      placeholder="Where are you going?"
                    />
                    {searchInput[0].length > 0 ? (
                      <XCircleIcon
                        className="absolute right-2 h-5 w-5 cursor-pointer"
                        onClick={() => {
                          setSearchInput(["", ""]);
                        }}
                      />
                    ) : null}
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white w-full shadow-sm h-full pt-4 px-6">
              {searchInput[0].length === 0 || !activeInput ? (
                <>
                  <h4 className="py-2 uppercase text-xs font-extrabold text-[#222222] font-sans">
                    Go anywhere, anytime
                  </h4>
                  <a
                    href="https://www.airbnb.com/s/homes?date_picker_type=flexible_dates&search_mode=flex_destinations_search&search_type=AUTOSUGGEST"
                    target="_blank"
                  >
                    <button
                      type="button"
                      className="inline-flex justify-between items-center mt-2 h-[58px] text-[#6F019C] shadow-lg  hover:shadow-xl py-2 px-6 rounded-[32px] w-full border border-[#DDDDDD] font-extrabold leading-5 text-[18px]"
                    >
                      I'm flexible
                      <ChevronRightIcon className="h-8 w-8" />
                    </button>
                  </a>
                </>
              ) : searchInput[0].length > 0 && activeInput ? (
                <>
                  <MobileLocations
                    ref={locationsRef}
                    locations={allLocations}
                  />
                </>
              ) : null}
            </div>
          </div>
        </>
      ) : mobileS >= 1 && mobileS < 5 ? (
        <>
          <MobileScheduler />
        </>
      ) : null}
    </>
  );
};

export default MobileSearch;
