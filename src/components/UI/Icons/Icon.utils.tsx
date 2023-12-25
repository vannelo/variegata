import BidIcon from "./Assets/BidIcon";
import CloseIcon from "./Assets/CloseIcon";
import CloseOutlineIcon from "./Assets/CloseOutlineIcon";
import StoreIcon from "./Assets/StoreIcon";

export const getIconSvg = (iconName: string): React.FC => {
  switch (iconName) {
    case "store":
      return StoreIcon;
    case "bid":
      return BidIcon;
    case "close":
      return CloseIcon;
    case "close-outline":
      return CloseOutlineIcon;
    default:
      return () => <></>;
  }
};
