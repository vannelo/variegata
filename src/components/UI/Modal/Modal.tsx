import Icon, { IconColorEnum, IconNameEnum, IconSizeEnum } from "../Icons/Icon";
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
              <Icon
                icon={IconNameEnum.CIRCLE_SUCCESS}
                color={IconColorEnum.SUCCCESS}
                size={IconSizeEnum.MEDIUM}
              />
            )}
            {type === ModalTypeEnum.ERROR && (
              <Icon
                icon={IconNameEnum.CIRCLE_ERROR}
                color={IconColorEnum.DANGER}
                size={IconSizeEnum.MEDIUM}
              />
            )}
            {type === ModalTypeEnum.WARNING && (
              <Icon
                icon={IconNameEnum.CIRCLE_WARNING}
                color={IconColorEnum.WARNING}
                size={IconSizeEnum.MEDIUM}
              />
            )}
            {title}
          </div>
          <button className={styles.modalCloseButton}>
            <Icon
              icon={IconNameEnum.CLOSE}
              size={IconSizeEnum.SMALL}
              color={IconColorEnum.SECONDARY}
            />
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
