import styles from "./StorePageLoader.module.scss";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Page, { PagePaddingSize } from "@/components/Layout/Page/Page";

export default function StorePageLoader() {
  return (
    <Page padding={PagePaddingSize.MEDIUM} contained>
      <section className={styles.storePageLoader}>
        <div className={styles.logo}>
          <Box sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
            <Skeleton variant="rectangular" width={"100%"} height={"50px"} />
            <Box sx={{ pt: 1 }}>
              <Skeleton width="100%" />
              <Skeleton width="100%" />
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                columnGap: "1rem",
              }}
            >
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="100%" />
            </Box>
          </Box>
        </div>
        <div className={styles.bio}>
          <Box>
            <Skeleton width="100%" />
            <Skeleton width="100%" />
            <Skeleton width="100%" />
          </Box>
        </div>
      </section>
    </Page>
  );
}
