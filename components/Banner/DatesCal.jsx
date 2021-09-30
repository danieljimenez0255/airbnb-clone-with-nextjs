import { XCircleIcon } from "@heroicons/react/solid";
import { DateRangePicker } from "react-date-range";
import { useRecoilState, useSetRecoilState } from "recoil";
import { checkInDate, checkOutDate, searchClickState } from "@/lib/atoms";

const DatesCal = () => {
  const [startDate, setStartDate] = useRecoilState(checkInDate);
  const [endDate, setEndDate] = useRecoilState(checkOutDate);
  const setClickState = useSetRecoilState(searchClickState);

  let rangesSelection = {
    startDate: startDate,
    endDate: endDate === null ? new Date("") : endDate,
    key: "selection",
  };

  const rangesSelect = (dates) => {
    setStartDate(dates.selection.startDate);
    setEndDate(dates.selection.endDate);
  };

  return (
    <div className="relative w-full flex justify-center">
      <div className="relative bg-white rounded-[32px] shadow-2xl py-4 mt-4 overflow-hidden max-h-96">
        <button
          type="button"
          className={`ml-auto mr-2 flex items-center justify-center cursor-pointer leading-5  rounded-full  text-white bg-gradient-to-r from-[#e61e4d] via-[#e31c5f] to-[#d70466]
              h-8 px-3`}
          onClick={() => setClickState(0)}
        >
          <XCircleIcon className="inline-block h-6 w-6" />
          Close
        </button>
        <DateRangePicker
          months={2}
          rangeColors={["#FD5861"]}
          minDate={new Date()}
          direction="horizontal"
          ranges={[rangesSelection]}
          onChange={rangesSelect}
          showMonthAndYearPickers={false}
          showDateDisplay={false}
          staticRanges={[]}
          inputRanges={[]}
          monthDisplayFormat="MMMM yyyy"
        />
      </div>
    </div>
  );
};

export default DatesCal;
