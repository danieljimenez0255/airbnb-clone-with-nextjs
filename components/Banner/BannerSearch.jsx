import { useState } from "react";
import { useRecoilValue } from "recoil";
import {
  checkInDate,
  checkOutDate,
  flexibleSelect,
  searchClickState,
  updatedHeaderM,
} from "@/lib/atoms";
import { useEffect } from "react";
import BannerLocation from "./BannerLocation";
import BannerBar from "./BannerBar";
import TimeToggle from "./TimeToggle";
import GuestsSelect from "./GuestsSelect";

const BannerSearch = ({ bannerDisplay, searchDisplay }) => {
  const updateHeader = useRecoilValue(updatedHeaderM);
  const startDate = useRecoilValue(checkInDate);
  const endDate = useRecoilValue(checkOutDate);
  const clickState = useRecoilValue(searchClickState);
  const checkType = useRecoilValue(flexibleSelect);
  const [ani, setAni] = useState(false);

  useEffect(() => {
    let sub = true;
    if (sub) {
      if (endDate !== null && endDate < startDate) {
        alert(
          "You need to fix your check out date! As the check in is ahead of the check out!"
        );
      }
    }
    return () => (sub = false);
  }, [startDate, endDate]);

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
        updateHeader && !bannerDisplay && !ani && !searchDisplay
          ? "scale-0"
          : !updateHeader && !bannerDisplay && !ani && !searchDisplay
          ? "scale-100"
          : updateHeader && bannerDisplay && ani && !searchDisplay
          ? "scale-100"
          : bannerDisplay && ani && searchDisplay === "search-header"
          ? "scale-100"
          : "scale-0"
      } transition-transform duration-500`}
    >
      <BannerBar banner={bannerDisplay} />

      {clickState === 1 ? (
        <BannerLocation />
      ) : clickState === 2 ? (
        <TimeToggle checkOut="check in" />
      ) : clickState === 3 && checkType?.type === "calendar" ? (
        <TimeToggle checkOut="check out" />
      ) : clickState === 4 ? (
        <GuestsSelect />
      ) : null}
    </div>
  );
};

export default BannerSearch;
