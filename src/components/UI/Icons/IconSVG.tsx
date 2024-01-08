import ArrowIcon from "./Assets/ArrowIcon";
import BidIcon from "./Assets/BidIcon";
import BidsHistoryIcon from "./Assets/BidsHistoryIcon";
import BurgerIcon from "./Assets/BurgerIcon";
import CheckIcon from "./Assets/CheckIcon";
import ChevronDownIcon from "./Assets/ChevronDownIcon";
import ChevronLeftIcon from "./Assets/ChevronLeftIcon";
import ChevronRightIcon from "./Assets/ChevronRightIcon";
import CircleErrorIcon from "./Assets/CircleErrorIcon";
import CircleSuccessIcon from "./Assets/CircleSuccessIcon";
import CircleWarningIcon from "./Assets/CircleWarningIcon";
import CloseIcon from "./Assets/CloseIcon";
import CloseOutlineIcon from "./Assets/CloseOutlineIcon";
import ExpandIcon from "./Assets/ExpandIcon";
import FacebookIcon from "./Assets/FacebookIcon";
import InstagramIcon from "./Assets/InstagramIcon";
import MailIcon from "./Assets/MailIcon";
import MinusIcon from "./Assets/MinusIcon";
import PlusIcon from "./Assets/PlusIcon";
import SearchIcon from "./Assets/SearchIcon";
import ShareIcon from "./Assets/ShareIcon";
import StarIcon from "./Assets/StarIcon";
import StoreIcon from "./Assets/StoreIcon";
import TimerIcon from "./Assets/TimerIcon";
import UserIcon from "./Assets/UserIcon";
import WhatsAppIcon from "./Assets/WhatsAppIcon";
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
    case "bids-history":
      return <BidsHistoryIcon />;
    case "plus":
      return <PlusIcon />;
    case "minus":
      return <MinusIcon />;
    case "share":
      return <ShareIcon />;
    case "mail":
      return <MailIcon />;
    case "whatsapp":
      return <WhatsAppIcon />;
    case "arrow":
      return <ArrowIcon />;
    case "burger":
      return <BurgerIcon />;
    case "search":
      return <SearchIcon />;
    case "chevron-down":
      return <ChevronDownIcon />;
    case "chevron-left":
      return <ChevronLeftIcon />;
    case "chevron-right":
      return <ChevronRightIcon />;
    case "user":
      return <UserIcon />;
    case "star":
      return <StarIcon />;
    case "facebook":
      return <FacebookIcon />;
    case "instagram":
      return <InstagramIcon />;
    case "timer":
      return <TimerIcon />;
    case "circle-success":
      return <CircleSuccessIcon />;
    case "circle-error":
      return <CircleErrorIcon />;
    case "circle-warning":
      return <CircleWarningIcon />;
    default:
      return <></>;
  }
}
