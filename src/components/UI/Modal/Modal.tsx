import styles from "./Modal.module.scss";

export enum ModalTypeEnum {
  SUCCESS = "sucsess",
  ERROR = "error",
  WARNING = "warning",
}

interface ModalProps {
  readonly showModal: boolean;
  readonly type: ModalTypeEnum;
  readonly title: string;
  readonly text: string;
  readonly hideCancel?: boolean;
  readonly onCancel?: () => void;
  readonly onConfirm?: () => void;
}

export default function Modal(props: ModalProps) {
  const { showModal, type, title, text, hideCancel, onCancel, onConfirm } =
    props;

  if (!props.showModal) return null;

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalIcon}>
            {type === ModalTypeEnum.SUCCESS && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className={styles.modalIconSuccess}
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
            )}
            {type === ModalTypeEnum.ERROR && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className={styles.modalIconError}
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
              </svg>
            )}
            {type === ModalTypeEnum.WARNING && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className={styles.modalIconWarning}
              >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
            )}
            {title}
          </div>
          <button className={styles.modalCloseButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        </div>
        <div className={styles.modalBody}>{text}</div>
        <div className={styles.modalFooter}>
          {/* TODO: Replace with UI buttons */}
          {!hideCancel && (
            <button className={styles.modalCancelButton}>Cancelar</button>
          )}
          <button className={styles.modalConfirmButton} onClick={onConfirm}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
