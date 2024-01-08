import BidIcon from "./Assets/BidIcon";
import CheckIcon from "./Assets/CheckIcon";
import CloseIcon from "./Assets/CloseIcon";
import CloseOutlineIcon from "./Assets/CloseOutlineIcon";
import ExpandIcon from "./Assets/ExpandIcon";
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
    case "expand":
      return <ExpandIcon />;
    case "check":
      return <CheckIcon />;
    default:
      return <></>;
  }
}
