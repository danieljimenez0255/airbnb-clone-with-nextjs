import BannerSearch from "./BannerSearch";
import { useRecoilValue } from "recoil";
import { headerDisplayM, tabM } from "@/lib/atoms";
import Experiences from "./Experiences";

const Banner = ({ locations }) => {
  const headerDisplay = useRecoilValue(headerDisplayM);
  const tabSelection = useRecoilValue(tabM);
  return (
    <div className="relative h-[500px] sm:h-screen lg:h-screen xl:h-[600px] 2xl:h-[700px]">
      {headerDisplay > 950 && (
        <div className="absolute top-[18%] w-full flex justify-center z-30">
          {tabSelection === "Places to Stay" ? (
            <BannerSearch bannerDisplay={false} />
          ) : (
            <Experiences locations={locations} />
          )}
        </div>
      )}
      <div className="absolute top-1/2 w-full text-center">
        <p className="text-sm sm:text-lg">Not sure where to go? Perfect.</p>
        <a
          href="https://www.airbnb.com/s/homes?search_mode=flex_destinations_search&date_picker_type=flexible_dates"
          target="_blank"
        >
          <button
            type="button"
            className="text-purple-500 bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150"
          >
            I'm flexible
          </button>
        </a>
      </div>
    </div>
  );
};

export default Banner;
