import styles from "./Page.module.scss";

export enum PagePaddingSize {
  NONE = "padding-none",
  EXTRA_SMALL = "padding-extra-small",
  SMALL = "padding-small",
  MEDIUM = "padding-medium",
  LARGE = "padding-large",
}

interface PageProps {
  readonly children: React.ReactNode;
  readonly padding: PagePaddingSize;
  readonly contained?: boolean;
  readonly className?: string;
}

export default function Page(props: PageProps) {
  const { children, padding, contained, className } = props;

  return (
    <div
      className={`${styles.page} ${styles[padding]} ${
        contained ? "container mx-auto" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
