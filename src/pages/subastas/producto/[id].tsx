import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/store";
import { getProducts } from "@/redux/slices/products-slice";
import { useQuery } from "@apollo/client";
import { GetProduct } from "@/graphql/queries/GetProduct.query";
import { GetProductBids } from "@/graphql/queries/GetProductBids.query";
import { Auction, Bid } from "@/utils/types";
import AuctionPageLoader from "@/components/Auctions/AuctionPageLoader/AuctionPageLoader";
import AuctionBidModal from "@/components/Auctions/AuctionBidModal/AuctionBidModal";
import AuctionPageProduct from "@/components/Auctions/AuctionPageProduct/AuctionPageProduct";
import RelatedAuctions from "@/components/Auctions/RelatedAuctions/RelatedAuctions";
import Page, { PagePaddingSize } from "@/components/Layout/Page/Page";

export default function Producto() {
  const { auctions } = useAppSelector((state) => state.products);
  const dispatch = useDispatch();
  const router = useRouter();
  const productId = router.query.id as string;
  const [product, setProduct] = useState<Auction>();
  const [productImageActive, setProductImageActive] = useState<string>();
  const [productPhotos, setProductPhotos] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isAuctionActive, setIsAuctionActive] = useState<boolean>(true);
  const [isBidsListActive, setIsBidsListActive] = useState<boolean>(false);
  const [auctionBidSuccess, setAuctionBidSuccess] = useState<boolean>(false);
  const [latestBids, setLatestBids] = useState<Bid[]>([]);
  const [highestBid, setHighestBid] = useState<Bid>({} as Bid);
  const {
    loading: productLoading,
    error: productError,
    data: productData,
  } = useQuery(GetProduct, {
    variables: { productId },
  });
  const {
    loading: productBidsLoading,
    error: productBidsError,
    data: productBidsData,
  } = useQuery(GetProductBids, {
    variables: { productId },
    pollInterval: 1000,
  });

  // First render fetch
  useEffect(() => {
    dispatch<any>(getProducts());
  }, []);

  // Fetch product
  useEffect(() => {
    const mapProduct = (product: any) => {
      const productMapped = {
        id: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        endTime: product.endTime,
        store: product.store.name,
        photos: product.photos,
        bids: product.bids,
      };
      const sortedBids = [...product.bids];
      sortedBids.sort((a: Bid, b: Bid) => b.amount - a.amount);
      const end = new Date(product.endTime);
      const now = new Date();
      setIsAuctionActive(!(end < now));
      setProduct(productMapped);
      setProductImageActive(product.photos[0].url);
      setProductPhotos(
        product?.photos.map((photo: any) => {
          return {
            src: photo.url,
          };
        })
      );
      setLatestBids(sortedBids.slice(0, 3));
      setHighestBid(sortedBids[0]);
    };

    if (productData) {
      mapProduct(productData.product);
    }
  }, [productData]);

  // Fetch product bids
  useEffect(() => {
    if (productBidsData) {
      const sortedBids = [...productBidsData.getProductBids];
      sortedBids.sort((a: Bid, b: Bid) => b.amount - a.amount);
      setLatestBids(sortedBids.slice(0, 3));
      setHighestBid(sortedBids[0]);
    }
  }, [productBidsData]);

  // Product not found or fetch error
  if (productError) {
    console.log(productError);
    router.push("/404");
  }

  return productLoading ? (
    <AuctionPageLoader />
  ) : (
    product && (
      <Page padding={PagePaddingSize.MEDIUM}>
        <AuctionBidModal
          showModal={showModal}
          setShowModal={setShowModal}
          onSuccess={() => setAuctionBidSuccess(true)}
          highestBid={highestBid}
          productId={productId}
        />
        <AuctionPageProduct
          product={product}
          productId={productId}
          productPhotos={productPhotos}
          highestBid={highestBid}
          isAuctionActive={isAuctionActive}
          auctionBidSuccess={auctionBidSuccess}
          latestBids={latestBids}
          setShowModal={setShowModal}
        />
        <RelatedAuctions auctions={auctions} />
      </Page>
    )
  );
}
