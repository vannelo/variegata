import styles from "./Section.module.scss";

interface PageProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export default function Section(props: PageProps) {
  const { children, className } = props;

  return (
    <section className={`${styles.section} ${className}`}>{children}</section>
  );
}
