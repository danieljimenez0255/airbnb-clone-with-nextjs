import { XCircleIcon } from "@heroicons/react/solid";
import format from "date-fns/format";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  checkInDate,
  checkOutDate,
  locationAtom,
  searchClickState,
  searchHoverState,
} from "@/lib/atoms";

const CheckIn = ({} /* , ref */) => {
  const [clickState, setClickState] = useRecoilState(searchClickState);
  const [hoverState, setHoverState] = useRecoilState(searchHoverState);
  const [startDate, setStartDate] = useRecoilState(checkInDate);
  const searchInput = useRecoilValue(locationAtom);
  const setEndDate = useSetRecoilState(checkOutDate);

  return (
    <>
      <div
        className={`py-[14px] px-6 flex-grow  rounded-[32px] cursor-pointer  ${
          clickState !== 2
            ? "hover:bg-[#EBEBEB]"
            : "bg-white search__shadow border border-black"
        }`}
        onMouseEnter={() => setHoverState(2)}
        onMouseLeave={() => setHoverState(0)}
        onClick={() => {
          if (searchInput[0] === "" && startDate === null) {
            alert("Choose a location before selecting check in date ");
            if (clickState !== 1) {
              setClickState(1);
            }
          } else {
            if (clickState !== 2) {
              setClickState(2);
            }
          }
        }}
      >
        <div className="relative flex justify-between items-center">
          <div>
            <h4 className="text-xs font-extrabold leading-4 pb-[2px] tracking-[0.04em]">
              Check in
            </h4>

            {startDate === null ? (
              <p className="text-sm leading-[18px] text-[#717171] font-normal overflow-hidden overflow-ellipsis">
                Add dates
              </p>
            ) : (
              <p className="text-xs font-extrabold leading-4 pb-[2px] tracking-[0.04em]">
                {format(new Date(startDate), "MMM dd")}
              </p>
            )}
          </div>
          {startDate !== null && clickState === 2 ? (
            <XCircleIcon
              className="absolute -right-5 h-5"
              onClick={() => {
                setStartDate(null);
                setEndDate(null);
                setClickState(0);
              }}
            />
          ) : null}
        </div>
      </div>
      <div className={`border-r ${hoverState === 2 ? "h-0" : "h-8"}`} />
    </>
  );
};

export default CheckIn;
