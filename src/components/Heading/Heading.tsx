import styles from "./Heading.module.scss";

export enum HeadingTypeEnum {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export enum HeadingAlignEnum {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right",
}

interface HeadingProps {
  type: HeadingTypeEnum;
  heading: string | JSX.Element;
  subheading?: string | JSX.Element;
  align?: HeadingAlignEnum;
}

export default function Heading(props: HeadingProps) {
  const { type, heading, subheading, align } = props;
  const alignClass = align ? styles[align] : styles[HeadingAlignEnum.LEFT];

  return (
    <div className={`${styles.heading} ${alignClass}`}>
      {subheading && (
        <div className={styles.subheading}>
          <div className={styles.divider} />
          <h2>{subheading}</h2>
        </div>
      )}
      {type === HeadingTypeEnum.PRIMARY && <h1>{heading}</h1>}
      {type === HeadingTypeEnum.SECONDARY && (
        <>
          <h2>{heading}</h2>
          {!subheading && <div className={styles.divider} />}
        </>
      )}
    </div>
  );
}
