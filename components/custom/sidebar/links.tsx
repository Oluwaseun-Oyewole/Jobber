import JobIcon from "@/assets/briefcase.svg";
import DashboardIcon from "@/assets/dash.svg";
import ProfileIcon from "@/assets/profile.svg";
import SettingsIcon from "@/assets/setting-2.svg";
import { SettingsIcon as Settings } from "lucide-react";
import { ReactNode } from "react";
import { FaUser } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { Routes } from "./routes";

export interface IRoutesType {
  id: number;
  path?: string;
  icon?: HTMLImageElement;
  ActiveIcon?: ReactNode;
  title: string;
  subRoutes?: {
    id: number;
    title?: string;
    url: string;
  }[];
  disabled?: boolean;
}
[];

export const routes: IRoutesType[] = [
  {
    id: 0,
    path: Routes.dashboard,
    icon: DashboardIcon,
    title: "Dashboard",
    ActiveIcon: <RxDashboard className="text-deepBlue text-xl " />,
  },

  {
    id: 1,
    icon: JobIcon,
    title: "Jobs",
    ActiveIcon: <FaBagShopping className="text-deepBlue text-2xl" />,
    subRoutes: [
      {
        id: 1,
        title: "All Jobs",
        url: "/dashboard/jobs/all-jobs",
      },

      {
        id: 2,
        title: "Job For Me",
        url: "/dashboard/jobs/jobs-for-me",
      },

      {
        id: 3,
        title: "My Jobs",
        url: "/dashboard/jobs/my-jobs",
      },
    ],
  },
  {
    id: 2,
    icon: ProfileIcon,
    title: "Profile",
    subRoutes: [
      {
        title: "Public Profile",
        id: 1,
        url: "/dashboard/profile/profile-view",
      },
      {
        title: "Public Profile",
        id: 2,
        url: "/dashboard/profile/public-profile",
      },
      {
        title: "Search Appearances",
        id: 3,
        url: "/dashboard/profile/search-appearances",
      },
    ],
    ActiveIcon: <FaUser className="text-deepBlue text-2xl" />,
    disabled: true,
  },

  {
    id: 3,
    path: Routes.settings,
    icon: SettingsIcon,
    title: "Settings",
    ActiveIcon: <Settings className="text-deepBlue text-2xl" />,
    subRoutes: [
      {
        id: 1,
        title: "General Settings",
        url: "/dashboard/settings/general-settings",
      },

      {
        id: 2,
        title: "Private Settings",
        url: "/dashboard/settings/private-settings",
      },
    ],
  },
];
