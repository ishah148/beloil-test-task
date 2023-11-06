import { FC, useEffect, useState } from "react";
import { Formatter } from "../../utils/timeHelper.ts";
import "./TimeBoard.scss";

const TimeBoard: FC = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Formatter.getTimeMMHH());
    }, 0);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <section className="timeboard-container">
        <div className="today-container">
          <p>Сегодня</p>
          <p>{Formatter.getDateDDMMYY()}</p>
        </div>
        <div className="time-container">
          <p className="time">{time}</p>
        </div>
      </section>
    </>
  );
};

export default TimeBoard;
