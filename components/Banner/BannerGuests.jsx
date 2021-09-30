import { SearchIcon } from "@heroicons/react/solid";
import { useRouter } from "next/dist/client/router";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  checkInDate,
  checkOutDate,
  locationAtom,
  searchClickState,
  flexibleSelect,
} from "@/lib/atoms";
import { guestsDisplay } from "@/lib/locationsInfo";
import { guestsCountM } from "@/lib/selectors";

const BannerGuests = () => {
  const [clickState, setClickState] = useRecoilState(searchClickState);
  const startDate = useRecoilValue(checkInDate);
  const endDate = useRecoilValue(checkOutDate);
  const guestsCount = useRecoilValue(guestsCountM);
  const searchInput = useRecoilValue(locationAtom);
  const checkType = useRecoilValue(flexibleSelect);
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
  };
  return (
    <>
      <div
        className={`relative z-5 flex justify-between items-center py-[14px] pl-6 pr-3 flex-grow  rounded-[32px]  ${
          clickState !== 4 ? "hover:bg-[#EBEBEB]" : "bg-white search__shadow"
        } cursor-pointer`}
        onClick={() => setClickState(4)}
      >
        <div className="flex flex-col justify-center">
          <h4 className="text-xs font-extrabold leading-4 pb-[2px] tracking-[0.04em]">
            Guests
          </h4>
          <p
            className={` text-sm leading-[18px]   whitespace-nowrap ${
              guestsCount?.adults > 0 ||
              guestsCount?.children > 0 ||
              guestsCount?.infants > 0
                ? "font-semibold"
                : "font-normal"
            }`}
          >
            {guestsDisplay(guestsCount)}
          </p>
        </div>
      </div>
      <div
        className="absolute z-80 right-1 p-3 bg-[#FF385C] rounded-[32px] text-white cursor-pointer hover:bg-[#DE1162] transition-colors duration-300"
        onClick={() => {
          if (
            (checkType?.type === "calendar" &&
              searchInput !== "" &&
              startDate &&
              endDate &&
              guestsCount?.adults +
                guestsCount?.children +
                guestsCount?.infants >
                0) ||
            checkType?.type === "flexible"
          ) {
            search();
          } else {
            alert("Make sure to fill out all fields before searching");
          }
        }}
      >
        <SearchIcon className="h-6 w-6" />
      </div>
    </>
  );
};

export default BannerGuests;
