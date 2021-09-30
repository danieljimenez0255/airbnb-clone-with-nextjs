import { useRecoilValue } from "recoil";
import { flexibleSelect } from "@/lib/atoms";
import BannerGuests from "./BannerGuests";
import CheckIn from "./CheckIn";
import CheckOut from "./CheckOut";
import FlexibleInput from "./FlexibleInput";
import LocationInput from "./LocationInput";

const BannerBar = ({ banner }) => {
  const checkType = useRecoilValue(flexibleSelect);

  return (
    <div className="flex flex-col">
      <div
        className={`relative ${
          banner ? " border border-black shadow-lg " : " border-0 "
        } bg-white rounded-[32px] flex items-center h-[66px] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] transition-all duration-500`}
      >
        <LocationInput />
        {checkType?.type === "calendar" ? (
          <>
            <CheckIn />
            <CheckOut />{" "}
          </>
        ) : (
          <FlexibleInput />
        )}
        <BannerGuests />
      </div>
    </div>
  );
};

export default BannerBar;
