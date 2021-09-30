import Image from "next/image";
import { GlobeAltIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import HeaderMenu from "./HeaderMenu";
import { useRecoilState, useRecoilValue } from "recoil";
import { headerDisplayM, tabM, updatedHeaderM } from "@/lib/atoms";
import HeaderNav from "./HeaderNav";
import TopSearch from "./TopSearch";
import BannerSearch from "../Banner/BannerSearch";
import format from "date-fns/format";
import Experiences from "../Banner/Experiences";

const Header = ({ searchDisplay }) => {
  const [updateHeader, setUpdateHeader] = useRecoilState(updatedHeaderM);
  const headerDisplay = useRecoilValue(headerDisplayM);
  const tabSelection = useRecoilValue(tabM);
  const [displaySearch, setDisplaySearch] = useState(false);
  const router = useRouter();

  // updates searchbar once user searches
  const { location, startDate, endDate, guests } = router?.query;
  const searchInfo =
    location && startDate && endDate && guests
      ? {
          location: location,
          timeFrame:
            format(new Date(startDate), "MMM dd") +
            "-" +
            format(new Date(endDate), "MMM dd"),
          guests: guests > 1 ? `${guests} guests` : `${guests} guest`,
        }
      : {};

  // detects when user begins to scroll which updates the header bg color
  const headerChange = () => {
    if (window.scrollY > 30) {
      setUpdateHeader(true);
    } else {
      setUpdateHeader(false);
    }
    let intervalM = setTimeout(() => {
      if (displaySearch === true) {
        setDisplaySearch(false);
      }
      clearTimeout(intervalM);
    }, 700);
  };
  useEffect(() => {
    headerChange();
  }, []);

  useEffect(() => {
    if (searchDisplay !== "search-header") {
      window.addEventListener("scroll", headerChange);
    } else {
      return;
    }
    return () => {
      window.removeEventListener("scroll", headerChange);
    };
  }, [displaySearch, searchDisplay]);

  return (
    <header
      className={`sticky top-0 w-full z-50  flex justify-between flex-wrap ${
        updateHeader || searchDisplay === "search-header"
          ? "bg-white"
          : "bg-transparent"
      } shadow-md p-4 md:px-10`}
    >
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-10 w-28 cursor-pointer my-auto mr-9"
      >
        {updateHeader || searchDisplay ? (
          <Image
            src={"/images/airbnb-logo-red.png"}
            alt="airbnb nextjs logo"
            layout="fill"
            objectFit="contain"
            objectPosition="left"
            priority={true}
          />
        ) : (
          <Image
            src={"/images/airbnb-logo-white.png"}
            alt="airbnb nextjs logo"
            layout="fill"
            objectFit="contain"
            objectPosition="left"
            priority={true}
          />
        )}
      </div>
      {headerDisplay > 950 && !updateHeader && !searchDisplay ? (
        <HeaderNav />
      ) : null}
      {headerDisplay > 950 &&
      updateHeader &&
      displaySearch &&
      !searchDisplay ? (
        <HeaderNav bannerDisplay={true} />
      ) : null}

      {(headerDisplay > 950 &&
        updateHeader &&
        searchDisplay !== "sign-in" &&
        !displaySearch) ||
      (headerDisplay > 950 && searchDisplay === "search-header") ? (
        <TopSearch
          searchDisplayState={displaySearch}
          setSearchDisplay={setDisplaySearch}
          searchInfo={searchInfo}
        />
      ) : null}
      <div
        className={`flex items-center space-x-4  justify-end ${
          updateHeader && !searchDisplay
            ? "text-gray-500"
            : searchDisplay
            ? "text-gray-500"
            : "text-white"
        }`}
      >
        <p className="hidden md:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <HeaderMenu />
      </div>
      {(displaySearch && tabSelection === "Places to Stay") ||
      (displaySearch && searchDisplay === "search-header") ? (
        <div
          className={`w-full mt-2
          flex justify-center z-30'`}
        >
          <div className="mt-5">
            <BannerSearch bannerDisplay={true} searchDisplay={searchDisplay} />
          </div>
        </div>
      ) : displaySearch && tabSelection !== "Places to Stay" ? (
        <div
          className={`w-full mt-2
          flex justify-center z-30'`}
        >
          <Experiences banner={true} bannerDisplay={true} />
        </div>
      ) : null}
    </header>
  );
};

export default Header;
