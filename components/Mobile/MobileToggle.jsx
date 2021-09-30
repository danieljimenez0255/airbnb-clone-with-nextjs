import { Tab } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/outline";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import { useRecoilState } from "recoil";
import { checkInDate, checkOutDate, flexibleSelect } from "@/lib/atoms";
import { classNames, months } from "@/lib/DateFuncs";

const MobileToggle = () => {
  const [startDate, setStartDate] = useRecoilState(checkInDate);
  const [endDate, setEndDate] = useRecoilState(checkOutDate);
  const [checkType, setCheckType] = useRecoilState(flexibleSelect);

  // this sets up the date range and updated via state change
  let rangeSelection = {
    key: "selection",
    startDate: startDate === null ? new Date() : startDate,
    endDate: endDate === null ? new Date() : endDate,
  };

  const rangeSelect = (dates) => {
    setStartDate(dates.selection.startDate);
    setEndDate(dates.selection.endDate);
  };

  // this sorts the selected months under the flexible tab
  const copy = [...checkType?.info?.selectedMonths];
  const sortedArrM = copy?.sort((a, b) => a?.i - b?.i);

  return (
    <div>
      {/* copy code from time toggle here and make necessary modifications */}
      <div
        className="relative flex flex-col items-center justify-center  w-full bg-white rounded-3xl rdrCalendarWrapper-shadow mt-2"
        // ref={toggleRef}
      >
        <Tab.Group defaultIndex={checkType?.type === "calendar" ? 0 : 1}>
          <Tab.List className="mt-1 w-full max-w-[200px] flex p-1 space-x-1 bg-[#EBEBEB] rounded-full">
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
            <Tab.Panel className="mt-4 h-[370px]">
              <DateRangePicker
                months={1}
                rangeColors={["#FD5861"]}
                minDate={new Date()}
                maxDate={addDays(new Date(), 600)}
                direction="vertical"
                ranges={[rangeSelection]}
                onChange={rangeSelect}
                showDateDisplay={false}
                scroll={{ enabled: true }}
                showMonthArrow={false}
                staticRanges={[]}
                inputRanges={[]}
                monthDisplayFormat="MMMM yyyy"
              />
            </Tab.Panel>
            <Tab.Panel
              className={"bg-white flex flex-col items-center p-5 h-[390px]"}
            >
              <h2 className="mt-4 mb-8">
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
              <div className="flex space-x-2 ml-8 w-[100vw] overflow-x-auto pb-2">
                {months?.map(({ month }, i) => {
                  const checkSelected = checkType?.info?.selectedMonths?.filter(
                    (choosen) => choosen?.m === month
                  );
                  if (checkSelected.length > 0) {
                    return (
                      <div
                        key={i}
                        className="flex-grow-0 flex-shrink-0 relative w-[7rem] h-[7rem] inline-flex flex-col justify-center items-center cursor-pointer text-center border hover:border-black text-sm leading-4 rounded-2xl  border-black"
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
                      className="flex-grow-0 flex-shrink-0 relative w-[7rem] h-[7rem] inline-flex flex-col justify-center items-center cursor-pointer text-center border hover:border-black text-sm leading-4 rounded-2xl"
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
    </div>
  );
};

export default MobileToggle;
