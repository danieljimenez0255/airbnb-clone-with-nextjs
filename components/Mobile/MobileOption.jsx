import Image from "next/image";
import { useSetRecoilState } from "recoil";
import { displayM } from "@/lib/atoms";

const MobileOption = ({ title, desc, path }) => {
  const setMobileS = useSetRecoilState(displayM);

  return (
    <section
      onClick={() => (title === "Find a place to stay" ? setMobileS(2) : null)}
      className="flex p-4 mb-3 rounded-xl cursor-pointer border shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex-grow">
        <h4 className="text-sm leading-[18px] font-semibold text-[#222222]">
          {title}
        </h4>
        <p className="text-xs leading-4 font-normal text-[#717171] mt-[2px]">
          {desc}
        </p>
      </div>
      <div>
        <Image
          className="rounded-lg flex-grow"
          src={path}
          width={50}
          height={50}
          alt="find a place stay"
        />
      </div>
    </section>
  );
};

export default MobileOption;
