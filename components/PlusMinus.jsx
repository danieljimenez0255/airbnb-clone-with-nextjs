import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { guestsReducer } from "@/lib/reducers";
import { guestsCountM } from "@/lib/selectors";

const PlusMinus = ({ header, desc }) => {
  let stateKey = header.toLowerCase();
  const [guestsState, setGuestsState] = useRecoilState(guestsCountM);

  useEffect(() => {
    if (stateKey === "adults") {
      if (
        (guestsState["infants"] > 0 || guestsState["children"] > 0) &&
        guestsState.adults === 0
      ) {
        if (guestsState.adults < 1) {
          setGuestsState(guestsReducer(guestsState, { type: "adultsInc" }));
        }
      }
    }
  }, [guestsState]);

  return (
    <div className="flex justify-between border-b">
      <div className="py-4">
        <h5 className="text-base leading-5 font-semibold">{header}</h5>
        <p className="text-[14px] leading-[18px] font-normal text-auth-gray">
          {desc}
        </p>
      </div>
      <div className={`flex items-center justify-between w-[98px]`}>
        {(stateKey === "children" || stateKey === "infants") && (
          <MinusCircleIcon
            className={`h-8 w-8 ${
              guestsState[stateKey] > 0
                ? "opacity-100 cursor-pointer"
                : "opacity-30 cursor-not-allowed"
            }`}
            onClick={() =>
              guestsState[stateKey] > 0 &&
              setGuestsState(
                guestsReducer(guestsState, { type: stateKey + "Desc" })
              )
            }
          />
        )}
        {stateKey === "adults" && (
          <MinusCircleIcon
            className={`h-8 w-8 ${
              guestsState[stateKey] > 0
                ? "opacity-100 cursor-pointer"
                : "opacity-30 cursor-not-allowed"
            }`}
            onClick={() => {
              // guestsState[stateKey] > 0 && guestsState.infants === 0 &&
              if (guestsState[stateKey] > 0 && guestsState.infants === 0) {
                setGuestsState(
                  guestsReducer(guestsState, { type: stateKey + "Desc" })
                );
              } else if (guestsState[stateKey] > 1 && guestsState.infants > 0) {
                setGuestsState(
                  guestsReducer(guestsState, { type: stateKey + "Desc" })
                );
              }
            }}
          />
        )}

        <p>{guestsState[stateKey]}</p>
        {stateKey === "adults" && (
          <PlusCircleIcon
            className={`h-8 w-8 ${
              guestsState[stateKey] < 16 && guestsState[stateKey] >= 0
                ? "opacity-100 cursor-pointer"
                : " opacity-30 cursor-not-allowed"
            }`}
            onClick={() =>
              guestsState[stateKey] < 16 &&
              guestsState[stateKey] >= 0 &&
              setGuestsState(guestsReducer(guestsState, { type: "adultsInc" }))
            }
          />
        )}
        {(stateKey === "children" || stateKey === "infants") && (
          <PlusCircleIcon
            className={`h-8 w-8 cursor-pointer ${
              guestsState[stateKey] < 5 && guestsState[stateKey] >= 0
                ? "opacity-100 cursor-pointer"
                : "cursor-not-allowed opacity-30"
            }`}
            onClick={() =>
              guestsState[stateKey] < 5 &&
              guestsState[stateKey] >= 0 &&
              setGuestsState(
                guestsReducer(guestsState, { type: stateKey + "Inc" })
              )
            }
          />
        )}
      </div>
    </div>
  );
};

export default PlusMinus;
