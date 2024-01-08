import Link from "next/link";
import styles from "./Button.module.scss";

export enum ButtonSizeEnum {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export enum ButtonColorEnum {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DARK = "dark",
  LIGHT = "light",
}

export enum ButtonTypeEnum {
  NORMAL = "normal",
  FLAT = "flat",
}

interface ButtonProps {
  children: string | JSX.Element;
  size?: ButtonSizeEnum;
  color?: string;
  href?: string;
  type?: ButtonTypeEnum;
  fluid?: boolean;
  onClick?: () => void;
}

export default function Button(props: ButtonProps) {
  const { size, color, href, type, children, fluid, onClick } = props;
  const sizeClass = size ? styles[size] : styles[ButtonSizeEnum.MEDIUM];
  const colorClass = color ? styles[color] : styles[ButtonSizeEnum.MEDIUM];

  return type === ButtonTypeEnum.FLAT ? (
    <div
      className={`${styles.flatButton} ${sizeClass} ${
        fluid ? styles.fluid : ""
      }`}
    >
      <Link href={href ?? "/"}>
        <button className="rounded-md" onClick={onClick}>
          {children}
        </button>
      </Link>
    </div>
  ) : (
    <div
      className={`${styles.button} ${sizeClass} ${colorClass} ${
        fluid ? styles.fluid : ""
      }`}
    >
      {href ? (
        <Link href={href}>
          <button className="rounded-md">{children}</button>
        </Link>
      ) : (
        <button className="rounded-md">{children}</button>
      )}
    </div>
  );
}
