import WidgetsIcon from "@mui/icons-material/Widgets";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DryCleaningIcon from "@mui/icons-material/DryCleaning";

interface Route {
  path: string;
  content: string;
  icon: React.ReactElement;
}

const routes: Route[] = [
  { path: "/drawer", content: "Client", icon: <WidgetsIcon /> },
  { path: "/drawer/order", content: "Orders", icon: <DryCleaningIcon /> },
  { path: "/drawer/servise", content: "Service", icon: <InboxIcon/> },
];

export default routes;
