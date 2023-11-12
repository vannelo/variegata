import { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { CreateBid } from "@/graphql/mutations/CreateProductBid.mutation";
import { GetProduct } from "@/graphql/queries/GetProduct.query";
import CurrencyInput from "react-currency-input-field";
import { motion } from "framer-motion";
import classnames from "classnames";
import styles from "./AuctionBidModal.module.scss";

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
  const { showModal, setShowModal, onSuccess, highestBid, productId } = props;
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
  ] = useMutation(CreateBid, {
    refetchQueries: [GetProduct, "GetProduct"],
    errorPolicy: "all",
  });

  // Focus on render
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  // Bid mutation
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
  }, [bidMutationData, bidMutationError]);

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5rem"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </button>
          </div>
          <div className={styles.modalHeader}>
            <div className={styles.modalIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5z" />
                <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zM3 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V9h-4.5A1.5 1.5 0 0 0 9 10.5V15H3.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V10.5a.5.5 0 0 1 .5-.5h4.293L10 14.793z" />
              </svg>
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
                {/* <FormattedNumber
                  value={highestBid ? highestBid.amount : 0}
                  style="currency"
                  currency="MXN"
                /> */}
              </div>
              <div className={styles.text}>
                <FormattedMessage id="subastaOfertaActual" />
              </div>
            </div>
            {auctionBidError && (
              <div className={styles.modalError}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5rem"
                  height="1.5rem"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                </svg>
                <p>{auctionBidError}</p>
              </div>
            )}
            <div className={styles.modalForm}>
              <form onSubmit={postBid}>
                <CurrencyInput
                  id="amount"
                  prefix="$"
                  name="amount"
                  placeholder="Cantidad a ofertar"
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
                  className={classnames("rounded-md", {
                    [styles.disabled]: auctionBidSubmitDisabled,
                  })}
                  disabled={auctionBidSubmitDisabled}
                >
                  {bidMutationLoading ? (
                    <svg
                      width="1rem"
                      height="1rem"
                      viewBox="0 0 13 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.spinner}
                    >
                      <path
                        d="M4.38798 12.616C3.36313 12.2306 2.46328 11.5721 1.78592 10.7118C1.10856 9.85153 0.679515 8.82231 0.545268 7.73564C0.411022 6.64897 0.576691 5.54628 1.02433 4.54704C1.47197 3.54779 2.1845 2.69009 3.08475 2.06684C3.98499 1.4436 5.03862 1.07858 6.13148 1.01133C7.22435 0.944078 8.31478 1.17716 9.28464 1.68533C10.2545 2.19349 11.0668 2.95736 11.6336 3.89419C12.2004 4.83101 12.5 5.90507 12.5 7"
                        stroke="white"
                      />
                    </svg>
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
