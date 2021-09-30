import { useRecoilState, useSetRecoilState } from "recoil";
import { activeLinkM, tabM } from "@/lib/atoms";

const NavLink = ({
  linkUnderlineHover,
  setLinkUnderlineHover,
  text,
  num,
  bannerDisplay,
}) => {
  const [linkActive, setLinkActive] = useRecoilState(activeLinkM);
  const setTab = useSetRecoilState(tabM);

  return (
    <div className="flex flex-col items-center">
      <p
        className="sm:text-base md:text-xs lg:text-sm xl:text-base  cursor-pointer hover:opacity-70 my-2"
        onClick={() => {
          setLinkActive(num);
          text !== "Online Experiences" ? setTab(text) : null;
        }}
        onMouseEnter={() => setLinkUnderlineHover(num)}
        onMouseLeave={() => setLinkUnderlineHover(0)}
      >
        {text === "Online Experiences" ? (
          <a href="https://www.airbnb.com/s/experiences/online" target="_blank">
            {text}
          </a>
        ) : (
          text
        )}
      </p>
      <div
        className={`${
          linkUnderlineHover === num && linkActive !== num
            ? "w-2"
            : linkActive === num
            ? "w-5"
            : "w-0"
        } border-b-2 ${
          bannerDisplay ? "border-black" : "border-white"
        }  transition-all duration-150`}
      />
    </div>
  );
};

export default NavLink;
