import { useRecoilState, useRecoilValue } from "recoil";
import {
  flexibleSelect,
  locationAtom,
  searchClickState,
  searchHoverState,
} from "@/lib/atoms";

const FlexibleInput = () => {
  const [clickState, setClickState] = useRecoilState(searchClickState);
  const [hoverState, setHoverState] = useRecoilState(searchHoverState);
  const checkType = useRecoilValue(flexibleSelect);
  const searchInput = useRecoilValue(locationAtom);

  const copy = [...checkType?.info?.selectedMonths];
  const sortedArrM = copy?.sort((a, b) => a?.i - b?.i);

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
          if (searchInput[0] === "") {
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
              Flexible dates
            </h4>

            {sortedArrM?.length === 1 ? (
              <p className="text-sm leading-[18px] text-[#717171] font-normal overflow-hidden overflow-ellipsis">
                {checkType?.info?.stayType} in{" "}
                {sortedArrM?.map(({ m }) => m)?.toString()}
              </p>
            ) : sortedArrM?.length > 1 ? (
              <p className="text-sm leading-[18px] text-[#717171] font-normal overflow-hidden overflow-ellipsis">
                {checkType?.info?.stayType} in{" "}
                {sortedArrM?.map(({ m }) => m?.substring(0, 3))?.toString()}
              </p>
            ) : (
              <p className="text-sm leading-[18px] text-[#717171] font-normal overflow-hidden overflow-ellipsis">
                Cannot find flexible dates
              </p>
            )}
          </div>
        </div>
      </div>
      <div className={`border-r ${hoverState === 2 ? "h-0" : "h-8"}`} />
    </>
  );
};

export default FlexibleInput;
