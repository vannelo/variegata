"use client";
import { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import styles from "./ProductTabs.module.scss";
import Reviews from "@/components/Reviews/Reviews";
import { FormattedMessage } from "react-intl";
import { Auction, Product } from "@/utils/types";
import Button, {
  ButtonColorEnum,
  ButtonSizeEnum,
} from "@/components/UI/Button/Button";
import { useMutation } from "@apollo/client";
import { CreateReviewMutation } from "@/graphql/mutations/CreateReview.mutation";
import { GetProductQuery } from "@/graphql/queries/GetProduct.query";
import Modal, { ModalTypeEnum } from "@/components/UI/Modal/Modal";
import Icon, { IconNameEnum, IconSizeEnum } from "@/components/UI/Icons/Icon";

interface ProductTabsProps {
  product: Auction | Product;
}

export default function ProductTabs(props: ProductTabsProps) {
  const { product } = props;
  const [tabActive, setTabActive] = useState<Number>(1);
  const [subtabActive, setSubtabActive] = useState<Number | null>();
  const [starsGiven, setStarsGiven] = useState<Number>(0);
  const [reviewCreated, setReviewCreated] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [
    createReview,
    {
      data: createReviewData,
      loading: createReviewLoading,
      error: createReviewError,
    },
  ] = useMutation(CreateReviewMutation, {
    refetchQueries: [GetProductQuery, "GetProductQuery"],
    errorPolicy: "all",
  });

  const getSubtabButtonIcon = (subtab: Number) => {
    return subtabActive === subtab ? (
      <Icon icon={IconNameEnum.MINUS} size={IconSizeEnum.LARGE} />
    ) : (
      <Icon icon={IconNameEnum.PLUS} size={IconSizeEnum.LARGE} />
    );
  };

  const onReviewSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = commentRef.current?.value;
    if (!comment) {
      alert("Agrega un comentario");
      return;
    }
    createReview({
      variables: {
        comment: comment,
        rating: starsGiven.valueOf(),
        storeId: product.store.id,
        userId: "user-1",
      },
    });
  };

  useEffect(() => {
    if (createReviewData) {
      setReviewCreated(true);
    }
    if (createReviewError) {
      setShowModal(true);
    }
  }, [createReviewData, createReviewError]);

  return (
    <>
      <Modal
        showModal={showModal}
        type={ModalTypeEnum.ERROR}
        title="Error al registrar tu reseña"
        text="Ya has dejado una reseña para esta tienda, si deseas modificarla puedes hacerlo desde la sección de reseñas de la tienda, eliminando la reseña anterior y creando una nueva."
        hideCancel
        onConfirm={() => setShowModal(false)}
      />
      <section>
        <div className={styles.tabs}>
          <button
            className={classnames(styles.tab, {
              [styles.active]: tabActive === 1,
            })}
            onClick={() => setTabActive(1)}
          >
            <FormattedMessage id="politicasTitle" />
          </button>
          <button
            className={classnames(styles.tab, {
              [styles.active]: tabActive === 2,
            })}
            onClick={() => setTabActive(2)}
          >
            <FormattedMessage id="resenasTitle" />
          </button>
        </div>
        {tabActive === 1 && (
          <div className={styles.contents}>
            <div className={styles.content}>
              <button
                onClick={() => {
                  subtabActive === 1
                    ? setSubtabActive(null)
                    : setSubtabActive(1);
                }}
                className={styles.subtabButton}
              >
                <div className={styles.subtabButtonText}>
                  <h4>
                    <FormattedMessage id="politicasSubastasTitle" />
                  </h4>
                  <p>Una transferencia justa, confiable y eficiente</p>
                </div>
                {getSubtabButtonIcon(1)}
              </button>
              {subtabActive === 1 && (
                <div className={styles.subtabContent}>
                  <p>
                    <FormattedMessage id="politicasSubastasT2" />
                  </p>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT3" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT4" />
                    </li>
                    <li>
                      <FormattedMessage id="politicasSubastasT5" />
                    </li>
                  </ul>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT6" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT7" />
                    </li>
                    <li>
                      <FormattedMessage id="politicasSubastasT8" />
                    </li>
                  </ul>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT9" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT10" />
                    </li>
                    <li>
                      <FormattedMessage id="politicasSubastasT11" />
                    </li>
                  </ul>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT12" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT13" />
                    </li>
                    <li>
                      <FormattedMessage id="politicasSubastasT14" />
                    </li>
                  </ul>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT15" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT16" />
                    </li>
                    <li>
                      <FormattedMessage id="politicasSubastasT17" />
                    </li>
                  </ul>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT18" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT19" />
                    </li>
                    <li>
                      <FormattedMessage id="politicasSubastasT20" />
                    </li>
                  </ul>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT21" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT22" />
                    </li>
                  </ul>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT23" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT24" />
                    </li>
                  </ul>
                  <p>
                    <FormattedMessage id="politicasSubastasT25" />
                  </p>
                </div>
              )}
              <button
                onClick={() => {
                  subtabActive === 2
                    ? setSubtabActive(null)
                    : setSubtabActive(2);
                }}
                className={styles.subtabButton}
              >
                <div className={styles.subtabButtonText}>
                  <h4>
                    <FormattedMessage id="politicasSubastasT26" />
                  </h4>
                  <p>Un entorno de subastas transparente y seguro</p>
                </div>
                {getSubtabButtonIcon(2)}
              </button>
              {subtabActive === 2 && (
                <div className={styles.subtabContent}>
                  <p>
                    <FormattedMessage id="politicasSubastasT27" />
                  </p>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT28" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT29" />
                    </li>
                  </ul>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT30" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT31" />
                    </li>
                    <li>
                      <FormattedMessage id="politicasSubastasT32" />
                    </li>
                  </ul>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT33" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT34" />
                    </li>
                    <li>
                      <FormattedMessage id="politicasSubastasT35" />
                    </li>
                  </ul>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT36" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT37" />
                    </li>
                  </ul>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT38" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT39" />
                    </li>
                  </ul>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT40" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT41" />
                    </li>
                    <li>
                      <FormattedMessage id="politicasSubastasT42" />
                    </li>
                  </ul>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT43" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT44" />
                    </li>
                  </ul>
                  <p>
                    <FormattedMessage id="politicasSubastasT45" />
                  </p>
                </div>
              )}
              <button
                onClick={() => {
                  subtabActive === 3
                    ? setSubtabActive(null)
                    : setSubtabActive(3);
                }}
                className={styles.subtabButton}
              >
                <div className={styles.subtabButtonText}>
                  <h4>
                    <FormattedMessage id="politicasSubastasT46" />
                  </h4>
                  <p>Un proceso de envío y entrega eficiente y seguro</p>
                </div>
                {getSubtabButtonIcon(3)}
              </button>
              {subtabActive === 3 && (
                <div className={styles.subtabContent}>
                  <p>
                    <FormattedMessage id="politicasSubastasT47" />
                  </p>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT48" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT49" />
                    </li>
                    <li>
                      <FormattedMessage id="politicasSubastasT50" />
                    </li>
                  </ul>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT51" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT52" />
                    </li>
                  </ul>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT53" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT54" />
                    </li>
                    <li>
                      <FormattedMessage id="politicasSubastasT55" />
                    </li>
                  </ul>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT56" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT57" />
                    </li>
                  </ul>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT58" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT59" />
                    </li>
                  </ul>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT60" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT61" />
                    </li>
                    <li>
                      <FormattedMessage id="politicasSubastasT62" />
                    </li>
                  </ul>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT63" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT64" />
                    </li>
                  </ul>
                  <p>
                    <b>
                      <FormattedMessage id="politicasSubastasT65" />
                    </b>
                  </p>
                  <ul>
                    <li>
                      <FormattedMessage id="politicasSubastasT66" />
                    </li>
                  </ul>
                  <p>
                    <FormattedMessage id="politicasSubastasT67" />
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {tabActive === 2 && (
          <div className={styles.contents}>
            <div className={styles.content}>
              <h4>Reseñas de la tienda</h4>
              <Reviews reviews={product?.store.reviews ?? []} />
              {createReviewLoading && <p>Enviando reseña...</p>}
              {reviewCreated && (
                <p>Gracias por compartir tu experiencia con esta tienda.</p>
              )}
              {!reviewCreated && !createReviewLoading && (
                <div className={styles.reviewForm}>
                  <h4>Deja una reseña</h4>
                  <p>Comparte tu experiencia de comprar con este proveedor</p>
                  {/* TODO: Refactor this stars logic */}
                  <form onSubmit={onReviewSubmitHandler}>
                    <div className={styles.stars}>
                      <div
                        className={`${styles.star} ${
                          starsGiven.valueOf() > 0
                            ? styles.starActive
                            : styles.starInactive
                        }`}
                        onClick={() => setStarsGiven(1)}
                      >
                        <Icon
                          icon={IconNameEnum.STAR}
                          size={IconSizeEnum.SMALL}
                        />
                      </div>
                      <div
                        className={`${styles.star} ${
                          starsGiven.valueOf() > 1
                            ? styles.starActive
                            : styles.starInactive
                        }`}
                        onClick={() => setStarsGiven(2)}
                      >
                        <Icon
                          icon={IconNameEnum.STAR}
                          size={IconSizeEnum.SMALL}
                        />
                      </div>
                      <div
                        className={`${styles.star} ${
                          starsGiven.valueOf() > 2
                            ? styles.starActive
                            : styles.starInactive
                        }`}
                        onClick={() => setStarsGiven(3)}
                      >
                        <Icon
                          icon={IconNameEnum.STAR}
                          size={IconSizeEnum.SMALL}
                        />
                      </div>
                      <div
                        className={`${styles.star} ${
                          starsGiven.valueOf() > 3
                            ? styles.starActive
                            : styles.starInactive
                        }`}
                        onClick={() => setStarsGiven(4)}
                      >
                        <Icon
                          icon={IconNameEnum.STAR}
                          size={IconSizeEnum.SMALL}
                        />
                      </div>
                      <div
                        className={`${styles.star} ${
                          starsGiven.valueOf() > 4
                            ? styles.starActive
                            : styles.starInactive
                        }`}
                        onClick={() => setStarsGiven(5)}
                      >
                        <Icon
                          icon={IconNameEnum.STAR}
                          size={IconSizeEnum.SMALL}
                        />
                      </div>
                    </div>
                    <textarea
                      placeholder="Escribe tu reseña"
                      ref={commentRef}
                      className={styles.textArea}
                    ></textarea>
                    <Button
                      size={ButtonSizeEnum.SMALL}
                      color={ButtonColorEnum.PRIMARY}
                    >
                      Enviar
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
