import { SearchIcon } from "@heroicons/react/outline";
import { useRouter } from "next/dist/client/router";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  checkInDate,
  checkOutDate,
  displayM,
  locationAtom,
  flexibleSelect,
} from "@/lib/atoms";
import { checkMouse } from "@/lib/DomEventFuncs";
import { guestsCountM } from "@/lib/selectors";

const ProcessButton = ({ check }) => {
  const startDate = useRecoilValue(checkInDate);
  const endDate = useRecoilValue(checkOutDate);
  const setMobileS = useSetRecoilState(displayM);
  const guestsCount = useRecoilValue(guestsCountM);
  const searchInput = useRecoilValue(locationAtom);
  const checkType = useRecoilValue(flexibleSelect);
  const resetMobileS = useResetRecoilState(displayM);
  const router = useRouter();

  const search = () => {
    if (checkType?.type === "calendar") {
      router.push({
        pathname: "/search",
        query: {
          location: searchInput[0],
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          guests:
            guestsCount?.adults + guestsCount?.children + guestsCount?.infants,
        },
      });
    } else {
      window?.open(
        `https://www.airbnb.com/s/${searchInput[0].replace(
          /\s+/g,
          "-"
        )}--${searchInput[1].replace(
          /\s+/g,
          "-"
        )}/homes?tab_id=home_tab${checkType?.info?.selectedMonths
          .map((m) => "&flexible_trip_dates%5B%5D=" + m.m)
          ?.join("")}&flexible_trip_lengths%5B%5D=${
          checkType?.info.stayType === "Weekend"
            ? "weekend_trip"
            : checkType?.info.stayType === "Week"
            ? "one_week"
            : "one_month"
        }&date_picker_type=flexible_dates&adults=${guestsCount?.adults}${
          guestsCount?.children > 0 ? `&children=${guestsCount?.children}` : ""
        }${
          guestsCount?.infants > 0
            ? `&infants=${guestsCount?.infants}`
            : "&infants=0"
        }`
      );
    }
    resetMobileS();
  };

  const clear = () => {
    if (check === "cal" && startDate && endDate) {
      resetStartDate();
      resetEndDate();
    } else if (
      check === "guests" &&
      guestsCount.adults + guestsCount.children + guestsCount.infants > 0
    ) {
      resetCount();
    }
  };

  const nextStep = () => {
    if (check === "cal") {
      if ((startDate && endDate) || checkType?.type === "flexible") {
        setMobileS(3);
      }
    } else {
      search();
    }
  };

  return (
    <div className="flex items-center py-4 px-6 border-t border-[#ebebec]">
      <div className="flex-grow">
        <p
          onClick={clear}
          className={`text-center cursor-pointer w-16 text-lg leading-5 font-semibold rounded-lg p-[10px]   hover:bg-[#F6F6F7] underline ${
            (check === "cal" && !startDate && !endDate) ||
            (check === "guests" &&
              guestsCount.adults +
                guestsCount.children +
                guestsCount.infants ===
                0)
              ? "opacity-25 cursor-not-allowed"
              : "opacity-100"
          }`}
        >
          clear
        </p>
      </div>
      <div className="relative flex-grow flex justify-end">
        <button
          onMouseMove={checkMouse}
          type="button"
          className={`relative overflow-hidden text-center ml-auto text-lg cursor-pointer leading-5 font-semibold rounded-lg  text-white ${
            check == "guests"
              ? "bg-gradient-to-r from-[#e61e4d] via-[#e31c5f] to-[#d70466]"
              : "bg-black"
          } w-40 h-12 ${
            (check === "cal" &&
              !startDate &&
              !endDate &&
              check === "cal" &&
              checkType?.type !== "flexible") ||
            (check === "guests" &&
              guestsCount.adults +
                guestsCount.children +
                guestsCount.infants ===
                0)
              ? "opacity-25 cursor-not-allowed"
              : "opacity-100"
          } ${check === "guests" && "button-before-sty"}`}
          onClick={nextStep}
        >
          {check === "cal" ? (
            "Next"
          ) : (
            <>
              <SearchIcon className="inline-block mr-1 h-5 w-5" />
              Search
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProcessButton;
