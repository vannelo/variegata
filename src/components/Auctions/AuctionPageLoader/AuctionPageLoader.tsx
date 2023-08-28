import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import styles from "./AuctionPageLoader.module.scss";

export default function AuctionPageLoader() {
  return (
    <div className="container mx-auto">
      <article className={styles.product}>
        <div className={styles.left}>
          <div className={styles.gallery}>
            <div className={styles.thumbs}>
              <Skeleton variant="rectangular" width={"100%"} height={"90px"} />
              <Skeleton variant="rectangular" width={"100%"} height={"90px"} />
              <Skeleton variant="rectangular" width={"100%"} height={"90px"} />
              <Skeleton variant="rectangular" width={"100%"} height={"90px"} />
            </div>
            <div className={styles.mainImg}>
              <Box sx={{ width: "100%" }}>
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={"700px"}
                />
              </Box>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ mb: 2 }}>
              <Skeleton width="100%" height={"50px"} />
              <Skeleton width="10%" height={"10px"} />
            </Box>
            <Box>
              <Skeleton width="30%" />
              <Skeleton width="40%" />
            </Box>
            <Box sx={{ pt: 5 }}>
              <Skeleton width="80%" />
              <Skeleton width="70%" />
              <Skeleton width="70%" />
              <Skeleton width="80%" />
              <Skeleton width="80%" />
              <Skeleton width="70%" />
            </Box>
            <Box sx={{ pt: 5 }}>
              <Skeleton width="30%" />
              <Skeleton width="20%" />
            </Box>
          </Box>
        </div>
      </article>
    </div>
  );
}
