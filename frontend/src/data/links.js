import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";

export const volunteer = [
  { link: "/profile", title: "Profile", Icon: PersonOutlineOutlinedIcon },
  { link: "/request", title: "Request", Icon: RequestPageOutlinedIcon },
  { link: "/my-events", title: "My Event", Icon: EventAvailableOutlinedIcon },
];
export const organizer = [
  { link: "/dashboard", title: "Dashboard", Icon: DashboardOutlinedIcon },
  { link: "/profile", title: "Profile", Icon: PersonOutlineOutlinedIcon },
  { link: "/event", title: "Event", Icon: EventAvailableOutlinedIcon },
];
export const admin = [
  { link: "/admin", title: "Dashboard", Icon: DashboardOutlinedIcon },
  { link: "/user", title: "Volunteer", Icon: PersonOutlineOutlinedIcon },
  { link: "/organizer", title: "Organizer", Icon: AccountBalanceIcon },
  { link: "/profile", title: "Profile", Icon: PersonOutlineOutlinedIcon },
];
