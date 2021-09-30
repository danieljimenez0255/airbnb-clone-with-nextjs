import { ChevronLeftIcon } from "@heroicons/react/outline";
import { useSetRecoilState } from "recoil";
import { displayM } from "@/lib/atoms";
import MobileToggle from "./MobileToggle";
import ProcessButton from "./ProcessButton";

const MobileCal = () => {
  const setMobileS = useSetRecoilState(displayM);

  return (
    <div className="relative">
      <header className="pt-5 pb-2 flex items-center">
        <button
          type="button"
          className="p-2 rounded-full hover:bg-[#F6F6F7] ml-3.5"
          onClick={() => setMobileS(1)}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <h3 className="mx-auto text-lg font-semibold">
          When will you be there?
        </h3>
      </header>
      <div className="mobile__cal">
        <MobileToggle />
      </div>
      <ProcessButton check="cal" />
    </div>
  );
};

export default MobileCal;
