import { XCircleIcon } from "@heroicons/react/solid";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  locationAtom,
  searchClickState,
  searchHoverState,
  checkInDate,
  checkOutDate,
} from "@/lib/atoms";
import format from "date-fns/format";

const ExperiencesCal = () => {
  const [clickState, setClickState] = useRecoilState(searchClickState);
  const setHoverState = useSetRecoilState(searchHoverState);
  const searchInput = useRecoilValue(locationAtom);
  const startDate = useRecoilValue(checkInDate);
  const endDate = useRecoilValue(checkOutDate);

  return (
    <>
      <div
        className={`py-[14px] px-6 flex-grow  rounded-[32px] cursor-pointer  ${
          clickState !== 2
            ? "hover:bg-[#EBEBEB]"
            : "bg-white search__shadow border border-black"
        }`}
        onMouseEnter={() => setHoverState(2)}
        onMouseLeave={() => setHoverState(2)}
        onClick={() => {
          if (searchInput[0] === "") {
            setClickState(0);
            alert("Choose a location before selecting check in and out dates ");
          } else {
            return;
          }
        }}
      >
        <div className="relative flex justify-between items-center">
          <div>
            <h4 className="text-xs font-extrabold leading-4 pb-[2px] tracking-[0.04em]">
              Date
            </h4>

            <p
              className={`text-sm leading-[18px]  ${
                startDate && endDate
                  ? "font-bold text-black"
                  : "font-normal text-[#717171]"
              } overflow-hidden overflow-ellipsis`}
            >
              {!startDate && !endDate
                ? "Add when you want to go"
                : startDate && endDate
                ? `${format(new Date(startDate), "MMM dd")} - ${format(
                    new Date(endDate),
                    "MMM dd"
                  )}`
                : null}
            </p>
          </div>
          {clickState === 2 ? (
            <XCircleIcon
              className="absolute right-9 h-5 "
              onClick={() => {
                setClickState(0);
              }}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ExperiencesCal;
