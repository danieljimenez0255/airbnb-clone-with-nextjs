import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { searchClickState, updatedHeaderM } from "@/lib/atoms";
import BannerLocation from "./BannerLocation";
import DatesCal from "./DatesCal";
import ExperiencesButton from "./ExperiencesButton";
import ExperiencesCal from "./ExperiencesCal";
import LocationInput from "./LocationInput";

const Experiences = ({ bannerDisplay, banner }) => {
  const updateHeader = useRecoilValue(updatedHeaderM);
  const clickState = useRecoilValue(searchClickState);
  const [ani, setAni] = useState(false);

  useEffect(() => {
    let interval;
    let sub = true;
    if (sub) {
      if (bannerDisplay === true) {
        interval = setTimeout(() => {
          setAni(true);
        }, 100);
      }
    }
    return () => {
      setTimeout(interval);
      sub = false;
    };
  }, []);

  return (
    <div
      className={`flex flex-col items-center ${
        updateHeader && !bannerDisplay && !ani
          ? "scale-0"
          : !updateHeader && !bannerDisplay && !ani
          ? "scale-100"
          : updateHeader && bannerDisplay && ani
          ? "scale-100"
          : "scale-0"
      } transition-transform duration-500`}
    >
      <div className="flex flex-col">
        <div
          className={`${
            banner ? "border border-black shadow-lg " : "border-0  "
          } bg-white rounded-[32px] flex items-center h-[66px] md:w-[80vw] lg:w-[70vw] xl:w-[50vw] transition-all duration-500`}
        >
          <LocationInput />
          <ExperiencesCal />
          <ExperiencesButton />
        </div>
      </div>
      {clickState === 1 ? (
        <BannerLocation />
      ) : clickState === 2 ? (
        <DatesCal />
      ) : null}
    </div>
  );
};

export default Experiences;
