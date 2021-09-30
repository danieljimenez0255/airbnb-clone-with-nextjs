import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  checkInDate,
  checkOutDate,
  displayM,
  flexibleSelect,
  locationAtom,
} from "@/lib/atoms";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import format from "date-fns/format";
import PlusMinus from "../PlusMinus";
import ProcessButton from "./ProcessButton";
import { guestsCountM } from "@/lib/selectors";

const MobileGuests = () => {
  const setMobileS = useSetRecoilState(displayM);
  const searchInput = useRecoilValue(locationAtom);
  const startDate = useRecoilValue(checkInDate);
  const endDate = useRecoilValue(checkOutDate);
  const guestsCount = useRecoilValue(guestsCountM);
  const checkType = useRecoilValue(flexibleSelect);
  const combinedGuests =
    guestsCount?.adults + guestsCount?.children + guestsCount?.infants;

  return (
    <div className="relative">
      <header className="pt-5 pb-2 flex items-center">
        <button
          type="button"
          className="p-2 rounded-full hover:bg-[#F6F6F7] ml-3.5"
          onClick={() => setMobileS(2)}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <div className="mx-auto flex flex-col items-center">
          <h3 className="text-lg font-semibold">
            {searchInput[0]},{searchInput[1]}
          </h3>
          <div className="flex items-center">
            <p className="text-xs leading-4 font-normal mt-[2px] text-[#717171]">
              {checkType?.type === "calendar"
                ? format(new Date(startDate), "MMM dd") +
                  "-" +
                  format(new Date(endDate), "MMM dd")
                : "Flexible Dates"}
            </p>
            {combinedGuests > 0 && (
              <div className="ml-1 flex items-center mt-[2px]">
                <p className="text-xs font-normal text-[#717171]">
                  {combinedGuests === 1
                    ? "• " + combinedGuests + " guest"
                    : "• " + combinedGuests + " guests"}
                </p>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className=" py-4 px-8 mt-4 overflow-hidden">
        <PlusMinus header="Adults" desc="Ages 13 or above" />
        <PlusMinus header="Children" desc="Ages 2-12" />
        <PlusMinus header="Infants" desc="Under 2" />
      </div>
      <ProcessButton check="guests" />
    </div>
  );
};

export default MobileGuests;
