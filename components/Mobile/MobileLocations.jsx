import { LocationMarkerIcon } from "@heroicons/react/outline";
import { forwardRef } from "react";
import { useSetRecoilState } from "recoil";
import { displayM, locationAtom } from "@/lib/atoms";

const MobileLocations = ({ locations }, ref) => {
  const setSearchInput = useSetRecoilState(locationAtom);
  const setMobileS = useSetRecoilState(displayM);

  return (
    <div ref={ref}>
      {locations?.length > 0 ? (
        locations?.map((item, i) => {
          if (i < 5) {
            return (
              <div
                key={item.city + " " + i}
                onClick={() => {
                  setSearchInput([item.city, item.country]);

                  setMobileS(1);
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
        <div className="flex items-center cursor-pointer py-2 pl-8  hover:bg-[#f7f7f7]">
          <div className="flex justify-center items-center bg-[#f1f1f1] border border-[rgba(176,176,176,0.2)] rounded-lg w-12 h-12 mr-4">
            <LocationMarkerIcon className="h-4 w-4" />
          </div>
          <p className="text-base leading-5 font-normal">
            No locations found. Check search for typo
          </p>
        </div>
      )}
    </div>
  );
};

export default forwardRef(MobileLocations);
