import { Tab } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/outline";
import CheckInOut from "./CheckInOut";
import { useRecoilState, useSetRecoilState } from "recoil";
import { searchClickState, flexibleSelect } from "@/lib/atoms";
import { XCircleIcon } from "@heroicons/react/solid";
import { classNames, months } from "@/lib/DateFuncs";

const TimeToggle = ({ checkOut }) => {
  const setClickState = useSetRecoilState(searchClickState);
  const [checkType, setCheckType] = useRecoilState(flexibleSelect);

  const copy = [...checkType?.info?.selectedMonths];
  const sortedArrM = copy?.sort((a, b) => a?.i - b?.i);

  return (
    <div className="relative flex flex-col items-center justify-center  w-full bg-white rounded-3xl rdrCalendarWrapper-shadow mt-2">
      <button
        type="button"
        className={`absolute right-3 top-1 flex items-center justify-center cursor-pointer leading-5  rounded-full  text-white bg-gradient-to-r from-[#e61e4d] via-[#e31c5f] to-[#d70466]
              h-8 px-3`}
        onClick={() => setClickState(0)}
      >
        <XCircleIcon className="inline-block h-6 w-6" />
        Close
      </button>
      <Tab.Group defaultIndex={checkType?.type === "calendar" ? 0 : 1}>
        <Tab.List className="absolute top-[30px] w-full max-w-[200px] flex p-1 space-x-1 bg-[#EBEBEB] rounded-full">
          <Tab
            className={({ selected }) =>
              classNames(
                " w-full  text-sm leading-5 font-bold text-[#FD5861] rounded-full ",

                selected ? " bg-white shadow " : ""
              )
            }
          >
            <span
              className="inline-block w-full h-full py-[5px] rounded-full"
              onClick={() =>
                setCheckType({ type: "calendar", info: checkType?.info })
              }
            >
              Calendar
            </span>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full  text-sm leading-5 font-bold text-[#FD5861] rounded-full ",

                selected ? " bg-white shadow " : ""
              )
            }
          >
            <span
              className="inline-block w-full h-full py-[5px] rounded-full"
              onClick={() =>
                setCheckType({ type: "flexible", info: checkType?.info })
              }
            >
              I'm Flexible
            </span>
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2 w-full">
          <Tab.Panel className={"bg-white p-3"}>
            <CheckInOut checkOut={checkOut} />
          </Tab.Panel>
          <Tab.Panel className={"bg-white flex flex-col items-center p-5"}>
            <h2 className="mt-16 mb-8">
              Stay for a{" "}
              <strong>{checkType?.info?.stayType?.toLowerCase()}</strong>
            </h2>
            <div className="flex space-x-4">
              <div
                className={`cursor-pointer text-center border hover:border-black rounded-[30px] py-2 px-4 bg-white text-black ${
                  checkType?.info?.stayType === "Weekend" && "border-black"
                }`}
                onClick={() =>
                  checkType?.info?.stayType !== "Weekend"
                    ? setCheckType({
                        type: "flexible",
                        info: {
                          stayType: "Weekend",
                          selectedMonths: checkType?.info?.selectedMonths,
                        },
                      })
                    : null
                }
              >
                Weekend
              </div>
              <div
                className={`cursor-pointer text-center border hover:border-black rounded-[30px] py-2 px-4 bg-white text-black ${
                  checkType?.info?.stayType === "Week" && "border-black"
                }`}
                onClick={() =>
                  checkType?.info?.stayType !== "Week"
                    ? setCheckType({
                        type: "flexible",
                        info: {
                          stayType: "Week",
                          selectedMonths: checkType?.info?.selectedMonths,
                        },
                      })
                    : null
                }
              >
                Week
              </div>
              <div
                className={`cursor-pointer text-center border hover:border-black rounded-[30px] py-2 px-4 bg-white text-black ${
                  checkType?.info?.stayType === "Month" && "border-black"
                }`}
                onClick={() =>
                  checkType?.info?.stayType !== "Month"
                    ? setCheckType({
                        type: "flexible",
                        info: {
                          stayType: "Month",
                          selectedMonths: checkType?.info?.selectedMonths,
                        },
                      })
                    : null
                }
              >
                Month
              </div>
            </div>
            <h2 className="mt-8 mb-4">
              Go In{" "}
              <strong>
                {checkType?.info?.selectedMonths?.length > 1
                  ? sortedArrM?.map(({ m }) => m)?.toString()
                  : checkType?.info?.selectedMonths
                      ?.map(({ m }) => m)
                      ?.toString()}
              </strong>
            </h2>
            <div className="flex space-x-2">
              {months?.map(({ month }, i) => {
                const checkSelected = checkType?.info?.selectedMonths?.filter(
                  (choosen) => choosen?.m === month
                );
                if (checkSelected.length > 0) {
                  return (
                    <div
                      key={i}
                      className="inline-flex flex-col justify-center items-center cursor-pointer text-center border hover:border-black text-sm leading-4 rounded-2xl w-[111px] h-[120px] border-black"
                      onClick={() => {
                        if (i === 0) {
                          return;
                        } else {
                          const otherSelected = checkType?.info?.selectedMonths?.filter(
                            (choosen) => choosen?.m !== month
                          );
                          setCheckType({
                            type: "flexible",
                            info: {
                              stayType: checkType?.info?.stayType,
                              selectedMonths: otherSelected,
                            },
                          });
                        }
                      }}
                    >
                      <CalendarIcon className="h-8 w-8" />
                      <p>{month}</p>
                    </div>
                  );
                }
                return (
                  <div
                    key={i}
                    className="inline-flex flex-col justify-center items-center cursor-pointer text-center border hover:border-black text-sm leading-4 rounded-2xl w-[111px] h-[120px]"
                    onClick={() =>
                      setCheckType({
                        type: "flexible",
                        info: {
                          stayType: checkType?.info?.stayType,
                          selectedMonths: [
                            ...checkType?.info?.selectedMonths,
                            { i: i, m: month },
                          ],
                        },
                      })
                    }
                  >
                    <CalendarIcon className="h-8 w-8" />
                    <p>{month}</p>
                  </div>
                );
              })}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TimeToggle;
