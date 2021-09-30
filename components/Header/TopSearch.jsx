import { SearchIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { useState } from "react";

const TopSearch = ({ searchDisplayState, setSearchDisplay, searchInfo }) => {
  const [ani, setAni] = useState(false);

  useEffect(() => {
    const interval = setTimeout(() => {
      setAni(true);
    }, 10);
    return () => clearTimeout(interval);
  });

  return (
    <div
      className={`flex items-center justify-between ${
        ani
          ? "scale-100 py-0 pl-6 pr-2 rounded-[40px] border border-[#DDDDDD] shadow-md text-[#222222] cursor-pointer hover:shadow-lg"
          : "scale-0"
      } transition-transform duration-500 min-w-[348px]`}
      onClick={() => setSearchDisplay(!searchDisplayState)}
    >
      <p className="inline-flex items-center space-x-2">
        {searchInfo.location && searchInfo.timeFrame && searchInfo.guests ? (
          <>
            <span className="font-semibold">
              {searchInfo.location} <span className="font-normal">|</span>
            </span>{" "}
            <span className="font-semibold">
              {searchInfo.timeFrame} <span className="font-normal">|</span>
            </span>{" "}
            <span className="inline-block font-semibold">
              {searchInfo.guests}{" "}
            </span>{" "}
          </>
        ) : (
          "Start your search"
        )}
      </p>
      <div className="p-2 bg-[#FF385C] rounded-[32px] text-white ml-2">
        <SearchIcon className="h-4 w-4" />
      </div>
    </div>
  );
};

export default TopSearch;
