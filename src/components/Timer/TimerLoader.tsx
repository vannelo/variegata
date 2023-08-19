import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { TimerTypeEnum } from "./Timer";

interface TimerProps {
  type: TimerTypeEnum;
}

export default function TimerLoader(props: TimerProps) {
  const { type } = props;

  return (
    <>
      <Box
        sx={{
          width: "30px",
          margin: `${
            type === TimerTypeEnum.GRID ? ".3rem auto" : ".6rem auto"
          }`,
        }}
      >
        <Skeleton
          width={"100%"}
          height={"10px"}
          sx={{ bgcolor: `${type === TimerTypeEnum.GRID ? "white" : "black"}` }}
        />
      </Box>
    </>
  );
}
