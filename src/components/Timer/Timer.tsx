import { useEffect } from "react";
import styles from "./Timer.module.scss";
import { FormattedMessage } from "react-intl";
import classnames from "classnames";

export enum TimerTypeEnum {
  PRODUCT = "product",
  GRID = "grid",
}

interface TimerProps {
  id: string;
  type: TimerTypeEnum;
}

export default function Timer(props: TimerProps) {
  const { id: timerId, type } = props;

  useEffect(() => {
    const CountDownTimer = (date: string, id: string) => {
      const end: any = new Date(date);
      const _second = 1000;
      const _minute = _second * 60;
      const _hour = _minute * 60;
      const _day = _hour * 24;
      let timer: number;

      const showRemaining = () => {
        const now: any = new Date();
        const distance = end - now;
        const divDays = document.querySelector(`#${timerId} .days`);
        const divHours = document.querySelector(`#${timerId} .hours`);
        const divMinutes = document.querySelector(`#${timerId} .minutes`);
        const divSeconds = document.querySelector(`#${timerId} .seconds`);

        if (divDays && divHours && divMinutes && divSeconds) {
          if (distance < 0) {
            clearInterval(timer);
            return;
          }
          let days = Math.floor(distance / _day);
          let hours = Math.floor((distance % _day) / _hour);
          let minutes = Math.floor((distance % _hour) / _minute);
          let seconds = Math.floor((distance % _minute) / _second);
          divDays.innerHTML = days.toString();
          divHours.innerHTML = hours.toString();
          divMinutes.innerHTML = minutes.toString();
          divSeconds.innerHTML = seconds.toString();
        }
      };

      timer = window.setInterval(showRemaining, 1000);
    };
    // Timer
    CountDownTimer("09/20/2023 10:30 AM", "hora");
  }, []);

  return (
    <div
      className={classnames(styles.timeContainer, {
        [styles.grid]: type === TimerTypeEnum.GRID,
      })}
      id={timerId}
    >
      <div className={`${styles.time} rounded-md`}>
        <div className={styles.timeSlot}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5rem"
            height="1.5rem"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
          </svg>
        </div>
        <div className={styles.timeSlot}>
          <div className={`${styles.head} days`} />
          <div className={styles.text}>
            <FormattedMessage id="timerDias" />
          </div>
        </div>
        <div className={styles.timeSlot}>
          <div className={`${styles.head} hours`} />
          <div className={styles.text}>
            <FormattedMessage id="timerHoras" />
          </div>
        </div>
        <div className={styles.timeSlot}>
          <div className={`${styles.head} minutes`} />
          <div className={styles.text}>
            <FormattedMessage id="timerMins" />
          </div>
        </div>
        <div className={styles.timeSlot}>
          <div className={`${styles.head} seconds`} />
          <div className={styles.text}>
            <FormattedMessage id="timerSegs" />
          </div>
        </div>
      </div>
      {type !== TimerTypeEnum.GRID && (
        <h4 className={styles.title}>
          <FormattedMessage id="subastaActiva" />
        </h4>
      )}
    </div>
  );
}
