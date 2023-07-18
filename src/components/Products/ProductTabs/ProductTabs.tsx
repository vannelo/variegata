"use client";
import { useState } from "react";
import classnames from "classnames";
import styles from "./ProductTabs.module.scss";
import Reviews from "@/components/Reviews/Reviews";

export default function ProductTabs() {
  const [tabActive, setTabActive] = useState<Number>(0);

  return (
    <section>
      <div className={styles.tabs}>
        <button
          className={classnames(styles.tab, {
            [styles.active]: tabActive === 0,
          })}
          onClick={() => setTabActive(0)}
        >
          Políticas de compra
        </button>
        <button
          className={classnames(styles.tab, {
            [styles.active]: tabActive === 1,
          })}
          onClick={() => setTabActive(1)}
        >
          Reseñas de la tienda
        </button>
      </div>
      {tabActive === 0 && (
        <div className={styles.contents}>
          <div className={styles.content}>
            <h4>Políticas de subastas</h4>
            <p>
              Tempor ea amet eiusmod reprehenderit proident consequat irure
              magna aliqua reprehenderit laboris irure qui mollit. Consequat qui
              nisi consectetur ipsum tempor dolore dolor. Minim enim incididunt
              amet Lorem. Voluptate magna do eiusmod excepteur commodo id duis.
            </p>
            <h4>Políticas de pagos</h4>
            <p>
              Magna in non id esse adipisicing ut pariatur Lorem ullamco veniam
              proident enim proident mollit. Et amet aliqua nostrud elit duis
              minim duis in. Tempor proident nostrud consequat dolor sunt
              aliquip aliqua minim deserunt officia. Consectetur sunt quis
              eiusmod ea duis aute qui Lorem id aute. Sit elit id consectetur
              esse sit pariatur enim consectetur sint nostrud pariatur.
            </p>
            <h4>Políticas de envíos</h4>
            <p>
              Laborum excepteur fugiat elit excepteur enim. Ex cillum
              adipisicing sit consequat nulla sunt pariatur minim ex dolore anim
              aliqua. Elit laboris qui irure ex duis ea et eiusmod. Ad qui culpa
              mollit labore aliqua commodo cillum duis sit adipisicing aute amet
              reprehenderit nisi.
            </p>
          </div>
        </div>
      )}
      {tabActive === 1 && (
        <div className={styles.contents}>
          <div className={styles.content}>
            <h4>Reseñas de la tienda</h4>
            <Reviews />
          </div>
        </div>
      )}
    </section>
  );
}
