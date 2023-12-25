import { getIconSvg } from "./Icon.utils";
import styles from "./Icon.module.scss";

export enum IconNameEnum {
  STORE = "store",
  BID = "bid",
  CLOSE = "close",
  CLOSE_OUTLINE = "close-outline",
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
}

interface IconProps {
  readonly icon: IconNameEnum;
  readonly size?: IconSizeEnum;
  readonly color?: IconColorEnum;
}

export default function Icon(props: IconProps) {
  const { icon, size, color } = props;
  const IconComponent = getIconSvg(icon);
  const sizeClass = size ? styles[size] : styles[IconSizeEnum.MEDIUM];
  const colorClass = color ? styles[color] : styles[IconColorEnum.PRIMARY];

  return (
    <div className={`${styles.iconContainer} ${sizeClass} ${colorClass}`}>
      <IconComponent />
    </div>
  );
}
