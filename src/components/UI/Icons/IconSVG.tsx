import BidIcon from "./Assets/BidIcon";
import CloseIcon from "./Assets/CloseIcon";
import CloseOutlineIcon from "./Assets/CloseOutlineIcon";
import StoreIcon from "./Assets/StoreIcon";
interface IconSVGProps {
  readonly iconName: string;
}

export default function IconSVG(props: IconSVGProps) {
  const { iconName } = props;
  switch (iconName) {
    case "store":
      return <StoreIcon />;
    case "bid":
      return <BidIcon />;
    case "close":
      return <CloseIcon />;
    case "close-outline":
      return <CloseOutlineIcon />;
    default:
      return <></>;
  }
}
