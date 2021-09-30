import { useEffect } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { updatedHeaderM } from "@/lib/atoms";
import NavLink from "./NavLink";

const HeaderNav = ({ bannerDisplay }) => {
  const [linkUnderlineHover, setLinkUnderlineHover] = useState(0);
  const [ani, setAni] = useState(true);
  const updateHeader = useRecoilValue(updatedHeaderM);

  const aniOnScroll = () => {
    let interval;
    if (!updateHeader && window.scrollY > 30) {
      interval = setTimeout(() => {
        setAni(false);
      }, 10);
      clearTimeout(interval);
    } else if (!updateHeader && window.scrollY < 30 && window.scrollY !== 0) {
      interval = setTimeout(() => {
        setAni(true);
      }, 10);
      clearTimeout(interval);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", aniOnScroll);
    return () => window.removeEventListener("scroll", aniOnScroll);
  }, [updateHeader]);

  return (
    <div
      className={`${!updateHeader || bannerDisplay ? "flex items-center" : ""}`}
    >
      <div
        className={`${
          !updateHeader || bannerDisplay
            ? `flex items-center sm:space-x-8 md:justify-center ${
                bannerDisplay ? "text-black" : "text-white"
              }`
            : "h-0 w-0"
        } ${
          ani === true ? "scale-100" : !ani ? "scale-0" : "scale-0"
        } transition-transform duration-500`}
      >
        <NavLink
          linkUnderlineHover={linkUnderlineHover}
          setLinkUnderlineHover={setLinkUnderlineHover}
          text="Places to Stay"
          num={1}
          bannerDisplay={bannerDisplay}
        />
        <NavLink
          linkUnderlineHover={linkUnderlineHover}
          setLinkUnderlineHover={setLinkUnderlineHover}
          text="Experiences"
          num={2}
          bannerDisplay={bannerDisplay}
        />
        <NavLink
          linkUnderlineHover={linkUnderlineHover}
          setLinkUnderlineHover={setLinkUnderlineHover}
          text="Online Experiences"
          num={3}
          bannerDisplay={bannerDisplay}
        />
      </div>
    </div>
  );
};

export default HeaderNav;
