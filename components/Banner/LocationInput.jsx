import { useEffect, useRef } from "react";
import { XCircleIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { locationAtom, searchClickState, searchHoverState } from "@/lib/atoms";

const LocationInput = () => {
  const [clickState, setClickState] = useRecoilState(searchClickState);
  const [hoverState, setHoverState] = useRecoilState(searchHoverState);
  const [searchInput, setSearchInput] = useRecoilState(locationAtom);
  const locationInputRef = useRef(null);

  useEffect(() => {
    if (clickState === 1 && locationInputRef?.current) {
      locationInputRef?.current?.focus();
    }
  }, [clickState]);

  return (
    <>
      <div
        className={`relative cursor-pointer py-[13px] px-8 flex-grow rounded-[32px] ${
          clickState !== 1 ? " hover:bg-[#EBEBEB]" : "  border border-black"
        }`}
        onMouseEnter={() => setHoverState(1)}
        onMouseLeave={() => setHoverState(0)}
        onClick={() => {
          if (clickState !== 1) {
            setClickState(1);
          } else {
            return;
          }
        }}
      >
        <div className="relative flex justify-between items-center">
          <div>
            <h4 className="text-xs font-extrabold leading-4 pb-[2px] tracking-[0.04em]">
              Location
            </h4>
            <div className="text-sm leading-[18px]  font-normal overflow-hidden overflow-ellipsis">
              <input
                ref={locationInputRef}
                type="text"
                placeholder="Where are you going?"
                className={
                  " bg-transparent outline-none flex-grow text-sm text-black placeholder-gray-400 w-full font-bold"
                }
                value={searchInput[0]}
                onChange={(event) =>
                  setSearchInput([event.target.value, searchInput?.country])
                }
              />
            </div>
          </div>

          {searchInput[0] !== "" && clickState === 1 && (
            <XCircleIcon
              className="absolute -right-5 h-5 z-40"
              onClick={() => {
                setSearchInput(["", ""]);
                locationInputRef?.current?.blur();
              }}
            />
          )}
        </div>
      </div>
      <div className={`border-r ${hoverState === 1 ? "h-0" : "h-8"}`} />
    </>
  );
};

export default LocationInput;
