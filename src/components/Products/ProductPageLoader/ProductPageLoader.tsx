import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import styles from "./ProductPageLoader.module.scss";

export default function ProductPageLoader() {
  return (
    <div className="container mx-auto">
      <article className={styles.product}>
        <div className={styles.left}>
          <Box sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
            <Skeleton variant="rectangular" width={"100%"} height={"600px"} />
            <Box sx={{ pt: 1 }}>
              <Skeleton width="80%" />
              <Skeleton width="60%" />
            </Box>
          </Box>
        </div>
        <div className={styles.right}>
          <Box sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
            <Box sx={{ pt: 2 }}>
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
