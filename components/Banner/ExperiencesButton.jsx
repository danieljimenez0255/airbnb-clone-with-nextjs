import { SearchIcon } from "@heroicons/react/solid";
import format from "date-fns/format";
import { useRecoilValue } from "recoil";
import { checkInDate, checkOutDate, locationAtom } from "@/lib/atoms";

export const ExperiencesButton = () => {
  const searchInput = useRecoilValue(locationAtom);
  const startDate = useRecoilValue(checkInDate);
  const endDate = useRecoilValue(checkOutDate);

  return (
    <a
      className="absolute right-1"
      href={`https://airbnb.com/s/${searchInput[0]}--${
        searchInput[1]
      }/experiences?checkin=${format(
        new Date(startDate),
        "yyyy-MM-dd"
      )}&checkout=${format(new Date(endDate), "yyyy-MM-dd")}`}
      target="_blank"
    >
      <div className="p-3 bg-[#FF385C] rounded-[32px] text-white cursor-pointer hover:bg-[#DE1162] transition-colors duration-300">
        <SearchIcon className="h-6 w-6" />
      </div>
    </a>
  );
};

export default ExperiencesButton;
