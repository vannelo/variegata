import styles from "./Icon.module.scss";
import IconSVG from "./IconSVG";

export enum IconNameEnum {
  STORE = "store",
  BID = "bid",
  CLOSE = "close",
  CLOSE_OUTLINE = "close-outline",
  EXPAND = "expand",
  CHECK = "check",
  BIDS_HISTORY = "bids-history",
  PLUS = "plus",
  MINUS = "minus",
  SHARE = "share",
  MAIL = "mail",
  WHATSAPP = "whatsapp",
  ARROW = "arrow",
  BURGER = "burger",
  SEARCH = "search",
  CHEVRON_DOWN = "chevron-down",
  CHEVRON_LEFT = "chevron-left",
  CHEVRON_RIGHT = "chevron-right",
  USER = "user",
  STAR = "star",
  FACEBOOK = "facebook",
  INSTAGRAM = "instagram",
  TIMER = "timer",
  CIRCLE_SUCCESS = "circle-success",
  CIRCLE_ERROR = "circle-error",
  CIRCLE_WARNING = "circle-warning",
}

export enum IconSizeEnum {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export enum IconColorEnum {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCCESS = "success",
  WARNING = "warning",
  DANGER = "danger",
  LIGHT = "light",
}

interface IconProps {
  readonly icon: IconNameEnum;
  readonly size?: IconSizeEnum;
  readonly color?: IconColorEnum;
}

export default function Icon(props: IconProps) {
  const { icon, size, color } = props;
  const sizeClass = size ? styles[size] : styles[IconSizeEnum.MEDIUM];
  const colorClass = color ? styles[color] : styles[IconColorEnum.PRIMARY];

  return (
    <div className={`${styles.iconContainer} ${sizeClass} ${colorClass}`}>
      <IconSVG iconName={icon} />
    </div>
  );
}
