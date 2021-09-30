import { Calendar } from "react-date-range";
import { useRecoilState, useRecoilValue } from "recoil";
import { checkInDate, checkOutDate, flexibleSelect } from "@/lib/atoms";
import { useSetRecoilState } from "recoil";
import { searchClickState } from "@/lib/atoms";

const CheckInOut = ({ checkOut }) => {
  const [startDate, setStartDate] = useRecoilState(checkInDate);
  const [endDate, setEndDate] = useRecoilState(checkOutDate);
  const setClickState = useSetRecoilState(searchClickState);
  const checkType = useRecoilValue(flexibleSelect);

  const handleCalendar = (date, item, next) => {
    date(item);
    if (next && next === "check in" && checkType?.type === "calendar") {
      setClickState(3);
    } else {
      setClickState(4);
    }
  };

  return (
    <div className="checkInOut">
      <Calendar
        date={checkOut === "check in" ? startDate : endDate}
        onChange={(item) =>
          handleCalendar(
            checkOut === "check in" ? setStartDate : setEndDate,
            item,
            checkOut
          )
        }
        color="#FD5861"
        minDate={checkOut === "check in" ? new Date() : startDate}
        months={2}
        direction="horizontal"
      />
    </div>
  );
};

export default CheckInOut;
