import { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";
import { CreateBidMutation } from "@/graphql/mutations/CreateProductBid.mutation";
import { GetProductQuery } from "@/graphql/queries/GetProduct.query";
import CurrencyInput from "react-currency-input-field";
import { motion } from "framer-motion";
import classnames from "classnames";
import styles from "./AuctionBidModal.module.scss";
import Icon, { IconColorEnum, IconNameEnum } from "@/components/UI/Icons/Icon";
import Loader from "@/components/UI/Loader/Loader";

interface AuctionBidModalProps {
  readonly showModal: boolean;
  readonly setShowModal: (showModal: boolean) => void;
  readonly onSuccess: () => void;
  readonly highestBid: {
    readonly amount: number;
  };
  readonly productId: string;
}

export default function AuctionBidModal(props: AuctionBidModalProps) {
  const { showModal, setShowModal, onSuccess, productId, highestBid } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [auctionBidError, setAuctionBidError] = useState<string>("");
  const [auctionBidSubmitDisabled, setAuctionBidSubmitDisabled] =
    useState<boolean>(true);
  const [
    createBid,
    {
      data: bidMutationData,
      loading: bidMutationLoading,
      error: bidMutationError,
    },
  ] = useMutation(CreateBidMutation, {
    refetchQueries: [GetProductQuery, "GetProductQuery"],
    errorPolicy: "all",
  });
  const intl = useIntl();

  const postBid = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const convertedAmount = Number(
      inputRef?.current?.value.replace(/[^0-9.-]+/g, "")
    );
    if (!inputRef?.current?.value) {
      setAuctionBidError("Ingresa una cantidad");
      return;
    }
    createBid({ variables: { productId: productId, amount: convertedAmount } });
  };

  // Focus on render
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  useEffect(() => {
    if (bidMutationData) {
      setShowModal(false);
      onSuccess();
    }
    if (bidMutationError) {
      console.log("bidMutationError", bidMutationError);
      const errorData = JSON.parse(JSON.stringify(bidMutationError));
      setAuctionBidError(JSON.parse(errorData.message).message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bidMutationData, bidMutationError]);

  if (!showModal) return null;

  return (
    <div className={styles.modal}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalClose}>
            <button onClick={() => setShowModal(false)}>
              <Icon icon={IconNameEnum.CLOSE} />
            </button>
          </div>
          <div className={styles.modalHeader}>
            <div className={styles.modalIcon}>
              <Icon icon={IconNameEnum.BID} />
            </div>
            <div className={styles.modalTitle}>
              <h4>
                <FormattedMessage id="subastaHacerOferta" />
              </h4>
            </div>
            <div className={styles.modalText}>
              <p>
                <FormattedMessage id="subastaOfertaTexto" />
              </p>
            </div>
            <div className={styles.modalCurrentOffer}>
              <div className={styles.amount}>
                <FormattedNumber
                  value={highestBid ? highestBid.amount : 0}
                  style="currency"
                  currency="MXN"
                />
              </div>
              <div className={styles.text}>
                <FormattedMessage id="subastaOfertaActual" />
              </div>
            </div>
            {auctionBidError && (
              <div className={styles.modalError}>
                <Icon
                  icon={IconNameEnum.CLOSE_OUTLINE}
                  color={IconColorEnum.DANGER}
                />
                <p>{auctionBidError}</p>
              </div>
            )}
            <div className={styles.modalForm}>
              <form onSubmit={postBid}>
                <CurrencyInput
                  id="amount"
                  prefix="$"
                  name="amount"
                  placeholder={intl.formatMessage({
                    id: "subastaOfertaPlaceholder",
                  })}
                  decimalsLimit={2}
                  className={classnames(styles.input, {
                    [styles.danger]: auctionBidError,
                  })}
                  ref={inputRef}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setAuctionBidSubmitDisabled(!event.target.value)
                  }
                  allowDecimals={false}
                  required
                />
                <button
                  type="submit"
                  className={classnames({
                    [styles.disabled]: auctionBidSubmitDisabled,
                  })}
                  disabled={auctionBidSubmitDisabled}
                >
                  {bidMutationLoading ? (
                    <Loader />
                  ) : (
                    <FormattedMessage id="subastaOfertar" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
