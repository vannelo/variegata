import styles from "./Page.module.scss";

export enum PagePaddingSize {
  SMALL = "padding-small",
  MEDIUM = "padding-medium",
  LARGE = "padding-large",
}

interface PageProps {
  readonly children: React.ReactNode;
  readonly padding: PagePaddingSize;
}

export default function Page(props: PageProps) {
  const { children, padding } = props;

  return <div className={`${styles.page} ${styles[padding]}`}>{children}</div>;
}
