import {
  LayoutDashboard,
  ShoppingBag,
  Download,
  MapPin,
  User2,
} from "lucide-react";

const tabsData = [
  {
    title: "dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: "account details",
    icon: <User2 className="w-5 h-5" />,
  },
  {
    title: "addresses",
    icon: <MapPin className="w-5 h-5" />,
  },
  {
    title: "orders",
    icon: <ShoppingBag className="w-5 h-5" />,
  },
];

export default tabsData;
