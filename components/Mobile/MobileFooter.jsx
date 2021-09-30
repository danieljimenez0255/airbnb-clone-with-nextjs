import {
  HeartIcon,
  SearchIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { activeLinkM } from "@/lib/atoms";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ChatAltIcon,
  UserCircleIcon as UserCircleSolid,
} from "@heroicons/react/solid";
import { verifyInfoDecrypt } from "@/lib/selectors";

const MobileFooter = () => {
  const [activeLink, setActiveLink] = useRecoilState(activeLinkM);
  const { data: session, status } = useSession();
  const [vInfo, setLoginInfo] = useRecoilState(verifyInfoDecrypt);
  const [bottomPage, setBottomPage] = useState(false);
  const [ani, setAni] = useState(false);

  const endOfPage = (e) => {
    if (
      window.innerHeight + Math.ceil(window.pageYOffset) >=
      document.body.offsetHeight - 2
    ) {
      setBottomPage(true);
      const interval = setTimeout(() => {
        setAni(true);
        clearTimeout(interval);
      }, 100);
    } else {
      setBottomPage(false);
      const interval = setTimeout(() => {
        setAni(false);
        clearTimeout(interval);
      }, 100);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", endOfPage);
    return () => window.removeEventListener("scroll", endOfPage);
  }, []);

  return (
    <div
      className={`sticky bottom-0 z-50 flex justify-center space-x-16 bg-white w-full ${
        bottomPage ? " hidden " : " block"
      } ${
        ani ? "h-0" : " h-16 pt-2 px-6 border-t-2"
      } transition-all duration-200`}
    >
      <section
        className="flex flex-col items-center cursor-pointer"
        onClick={() => (activeLink === 1 ? null : setActiveLink(1))}
      >
        <SearchIcon
          className={`block mb-1 h-[30px] w-[30px] ${
            activeLink === 1
              ? "text-airbnb-red"
              : "text-black hover:text-airbnb-red"
          } transition-colors duration-500`}
        />
        <h5 className="text-[10px] leading-3 font-semibold">Explore</h5>
      </section>
      <section
        className="flex flex-col items-center cursor-pointer"
        onClick={() => (activeLink === 2 ? null : setActiveLink(2))}
      >
        <HeartIcon
          className={`block mb-1 h-[30px] w-[30px] ${
            activeLink === 2
              ? "text-airbnb-red"
              : "text-black hover:text-airbnb-red"
          } transition-colors duration-500`}
        />
        <a href="https://www.airbnb.com/wishlists" target="_blank">
          {" "}
          <h5 className="text-[10px] leading-3 font-semibold">Wishlists</h5>
        </a>
      </section>
      {/* add new items to mobile menu if user is signed in */}
      {session || vInfo[0]?.loginInfo[0]?.info ? (
        <>
          <section
            className="flex flex-col items-center cursor-pointer"
            onClick={() => (activeLink === 4 ? null : setActiveLink(4))}
          >
            <FontAwesomeIcon
              icon={["fab", "airbnb"]}
              size="2x"
              className={`block mb-1  ${
                activeLink === 4
                  ? "text-airbnb-red"
                  : "text-black hover:text-airbnb-red"
              } transition-colors duration-500`}
            />
            <h5 className="text-[10px] leading-3 font-semibold">Trips</h5>
          </section>

          <section
            className="flex flex-col items-center cursor-pointer"
            onClick={() => (activeLink === 5 ? null : setActiveLink(5))}
          >
            <ChatAltIcon
              className={`block mb-1 h-[30px] w-[30px] ${
                activeLink === 5
                  ? "text-airbnb-red"
                  : "text-black hover:text-airbnb-red"
              }  transition-colors duration-500`}
            />
            <h5 className="text-[10px] leading-3 font-semibold">Inbox</h5>
          </section>

          <section
            className="flex flex-col items-center cursor-pointer"
            onClick={() => {
              if (activeLink === 6) {
                return;
              } else {
                setActiveLink(6);
                if (session) {
                  signOut({ callbackUrl: "/" });
                } else {
                  setLoginInfo({ loginInfo: [] });
                }
              }
            }}
          >
            <UserCircleSolid
              className={`block mb-1 h-[30px] w-[30px] ${
                activeLink === 6
                  ? "text-airbnb-red"
                  : "text-black hover:text-airbnb-red"
              } transition-colors duration-500`}
            />
            <h5 className="text-[10px] leading-3 font-semibold">Logout</h5>
          </section>
        </>
      ) : (
        <Link href="/auth/signin">
          <section
            className="flex flex-col items-center cursor-pointer"
            onClick={() => (activeLink === 3 ? null : setActiveLink(3))}
          >
            <UserCircleIcon
              className={`block mb-1 h-[30px] w-[30px] ${
                activeLink === 3
                  ? "text-airbnb-red"
                  : "text-black hover:text-airbnb-red"
              } transition-colors duration-500`}
            />
            <h5 className="text-[10px] leading-3 font-semibold">Log in</h5>
          </section>
        </Link>
      )}
    </div>
  );
};

export default MobileFooter;
