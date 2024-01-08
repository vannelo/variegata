import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import classnames from "classnames";
import styles from "./Timer.module.scss";
import TimerLoader from "./TimerLoader";
import Icon, { IconNameEnum } from "../UI/Icons/Icon";

const _second = 1000;
const _minute = _second * 60;
const _hour = _minute * 60;
const _day = _hour * 24;

export enum TimerTypeEnum {
  PRODUCT = "product",
  GRID = "grid",
}

interface TimerProps {
  id: string;
  type: TimerTypeEnum;
  endTime: string;
}

type TimerData = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Timer(props: TimerProps) {
  const { id: timerId, type, endTime } = props;
  const [timerData, setTimerData] = useState<TimerData>();
  const [isPast, setIsPast] = useState<boolean>();

  useEffect(() => {
    const CountDownTimer = (date: string) => {
      const end = new Date(date);
      const now = new Date();
      let timer: number;

      if (end < now) {
        setIsPast(true);
        return;
      }

      const showRemaining = () => {
        const now: any = new Date();
        const distance = end.getTime() - now.getTime();

        if (distance < 0) {
          clearInterval(timer);
          return;
        }

        const days = Math.floor(distance / _day);
        const hours = Math.floor((distance % _day) / _hour);
        const minutes = Math.floor((distance % _hour) / _minute);
        const seconds = Math.floor((distance % _minute) / _second);
        setTimerData({ days, hours, minutes, seconds });
      };

      timer = window.setInterval(showRemaining, 1000);
    };
    endTime && CountDownTimer(endTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={classnames(styles.timeContainer, {
        [styles.grid]: type === TimerTypeEnum.GRID,
      })}
      id={timerId}
    >
      <div
        className={classnames(styles.time, {
          [styles.timeCentered]: isPast,
        })}
      >
        <div className={styles.timeSlot}>
          <Icon icon={IconNameEnum.TIMER} />
        </div>
        {!isPast && (
          <>
            <div className={styles.timeSlot}>
              <div className={`${styles.head} days`}>
                {timerData?.days ?? <TimerLoader type={type} />}
              </div>
              <div className={styles.text}>
                <FormattedMessage id="timerDias" />
              </div>
            </div>
            <div className={styles.timeSlot}>
              <div className={`${styles.head} hours`}>
                {timerData?.hours ?? <TimerLoader type={type} />}
              </div>
              <div className={styles.text}>
                <FormattedMessage id="timerHoras" />
              </div>
            </div>
            <div className={styles.timeSlot}>
              <div className={`${styles.head} minutes`}>
                {timerData?.minutes ?? <TimerLoader type={type} />}
              </div>
              <div className={styles.text}>
                <FormattedMessage id="timerMins" />
              </div>
            </div>
            <div className={styles.timeSlot}>
              <div className={`${styles.head} seconds`}>
                {timerData?.seconds ?? <TimerLoader type={type} />}
              </div>
              <div className={styles.text}>
                <FormattedMessage id="timerSegs" />
              </div>
            </div>
          </>
        )}
        {isPast && type === TimerTypeEnum.GRID && (
          <FormattedMessage id="subastaFinalizada" />
        )}
        {isPast && type === TimerTypeEnum.PRODUCT && (
          <h4 className={styles.ended}>
            <FormattedMessage id="subastaFinalizada" />
          </h4>
        )}
      </div>
    </div>
  );
}
