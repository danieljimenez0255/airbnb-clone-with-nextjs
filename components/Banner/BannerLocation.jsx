import {
  ChevronRightIcon,
  LocationMarkerIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { allLocations, locationAtom, searchClickState } from "@/lib/atoms";

const BannerLocation = () => {
  const [searchInput, setSearchInput] = useRecoilState(locationAtom);
  const setClickState = useSetRecoilState(searchClickState);
  const locationsM = useRecoilValue(allLocations);
  const allLocationsM = locationsM?.filter(({ city }) =>
    city
      .toLowerCase()
      .startsWith(searchInput[0].toLowerCase().replace(/\s+/g, " ").trim())
  );

  return (
    <div className="relative  w-full">
      {searchInput[0]?.length > 0 ? (
        <div className="w-1/2 z-20 bg-white rounded-[32px] shadow-2xl py-4 mt-4 overflow-hidden max-h-96">
          <button
            type="button"
            className={`border-b -mt-2  ml-auto mr-3 flex items-center justify-center cursor-pointer leading-5  rounded-full  text-white bg-gradient-to-r from-[#e61e4d] via-[#e31c5f] to-[#d70466]
              h-8 px-3`}
            onClick={() => setClickState(0)}
          >
            <XCircleIcon className="inline-block h-6 w-6" />
            Close
          </button>
          {allLocationsM?.length > 0 ? (
            allLocationsM?.map((item, i) => {
              if (i < 5) {
                return (
                  <div
                    key={item.city + " " + i}
                    onClick={(e) => {
                      setSearchInput([item.city, item.country]);
                      setClickState(2);
                    }}
                    className="flex items-center cursor-pointer py-2 pl-8  hover:bg-[#f7f7f7]"
                  >
                    <div className="flex justify-center items-center bg-[#f1f1f1] border border-[rgba(176,176,176,0.2)] rounded-lg w-12 h-12 mr-4">
                      <LocationMarkerIcon className="h-4 w-4" />
                    </div>
                    <p className="text-base leading-5 font-normal">
                      {item.city}, {item.country}
                    </p>
                  </div>
                );
              }
            })
          ) : (
            <>
              <div className="flex items-center cursor-pointer py-2 pl-8  hover:bg-[#f7f7f7]">
                <div className="flex justify-center items-center bg-[#f1f1f1] border border-[rgba(176,176,176,0.2)] rounded-lg w-12 h-12 mr-4">
                  <LocationMarkerIcon className="h-4 w-4" />
                </div>
                <p className="text-base leading-5 font-normal">
                  No locations found. Check search for typo
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="w-1/2 bg-white rounded-[32px] shadow-2xl py-4 px-8 mt-3">
          <div className="flex justify-between items-center">
            {" "}
            <h4 className="py-2 uppercase text-xs font-extrabold text-[#222222] font-sans">
              Go anywhere, anytime
            </h4>
            <button
              type="button"
              className={`border-b -mt-2  ml-auto mr-3 flex items-center justify-center cursor-pointer leading-5  rounded-full  text-white bg-gradient-to-r from-[#e61e4d] via-[#e31c5f] to-[#d70466]
              h-8 px-3`}
              onClick={() => setClickState(0)}
            >
              <XCircleIcon className="inline-block h-6 w-6" />
              Close
            </button>
          </div>

          <a
            href="https://www.airbnb.com/s/homes?date_picker_type=flexible_dates&search_mode=flex_destinations_search&search_type=AUTOSUGGEST"
            target="_blank"
          >
            <button
              type="button"
              className="inline-flex justify-between items-center mt-2 h-[58px] text-[#6F019C] shadow-lg py-2 px-6 rounded-[32px] w-full border border-[#DDDDDD] font-extrabold leading-5 text-[18px]"
            >
              I'm flexible
              <ChevronRightIcon className="h-8 w-8" />
            </button>
          </a>
        </div>
      )}
    </div>
  );
};

export default BannerLocation;
