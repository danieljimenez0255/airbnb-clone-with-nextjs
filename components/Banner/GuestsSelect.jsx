import { XCircleIcon } from "@heroicons/react/outline";
import { useSetRecoilState } from "recoil";
import { searchClickState } from "@/lib/atoms";
import PlusMinus from "../PlusMinus";

const GuestsSelect = () => {
  const setClickState = useSetRecoilState(searchClickState);

  return (
    <div className="relative w-full">
      <div className="w-1/2 bg-white rounded-[32px] shadow-2xl py-4 px-8 mt-4 overflow-hidden max-h-96 ml-auto">
        <button
          type="button"
          className={`border-b -mt-2 -mr-1 ml-auto flex items-center justify-center cursor-pointer leading-5  rounded-full  text-white bg-gradient-to-r from-[#e61e4d] via-[#e31c5f] to-[#d70466]
              h-8 px-3`}
          onClick={() => setClickState(0)}
        >
          <XCircleIcon className="inline-block h-6 w-6" />
          Close
        </button>
        <PlusMinus header="Adults" desc="Ages 13 or above" />
        <PlusMinus header="Children" desc="Ages 2-12" />
        <PlusMinus header="Infants" desc="Under 2" />
      </div>
    </div>
  );
};

export default GuestsSelect;
