import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function ProductLoader() {
  return (
    <Box sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
      <Skeleton variant="rectangular" width={"100%"} height={"250px"} />
      <Box sx={{ pt: 1 }}>
        <Skeleton width="80%" />
        <Skeleton width="60%" />
      </Box>
    </Box>
  );
}
