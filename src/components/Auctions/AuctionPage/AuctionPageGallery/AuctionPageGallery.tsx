import { useState } from "react";
import { SlideshowLightbox } from "lightbox.js-react";
import { Auction } from "@/utils/types";
import styles from "./AuctionPageGallery.module.scss";
import Icon, { IconNameEnum, IconSizeEnum } from "@/components/UI/Icons/Icon";

interface AuctionPageGalleryProps {
  readonly product: Auction;
}

export default function AuctionPageGallery({
  product,
}: AuctionPageGalleryProps) {
  const [productImageActive, setProductImageActive] = useState<string>("");
  const productPhotos = product?.photos;

  return (
    <div className={styles.gallery}>
      <div className={`${styles.thumbs} hide-mobile`}>
        {product?.photos.map((photo: any) => (
          <button
            key={photo.url}
            className={styles.thumb}
            style={{
              backgroundImage: `url(${photo.url})`,
            }}
            onClick={() => setProductImageActive(photo.url)}
          />
        ))}
      </div>
      <div className={styles.mainImage}>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${
              productImageActive ? productImageActive : product?.photos[0].url
            })`,
          }}
        >
          {/* @ts-expect-error Server Component */}
          <SlideshowLightbox
            lightboxIdentifier="product"
            framework="next"
            images={productPhotos}
            showControls={false}
            theme="day"
            showThumbnails
          >
            <button className={styles.fullScreenIcon} data-lightboxjs="product">
              <Icon icon={IconNameEnum.EXPAND} size={IconSizeEnum.SMALL} />
            </button>
          </SlideshowLightbox>
        </div>
      </div>
      <div className={`${styles.thumbs} show-mobile-flex`}>
        {product?.photos.map((photo: any) => (
          <button
            key={photo.url}
            className={styles.thumb}
            style={{
              backgroundImage: `url(${photo.url})`,
            }}
            onClick={() => setProductImageActive(photo.url)}
          />
        ))}
      </div>
    </div>
  );
}
