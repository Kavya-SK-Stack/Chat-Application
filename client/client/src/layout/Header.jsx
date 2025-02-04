import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Backdrop,
} from "@mui/material";
import React, { Suspense, useState, lazy } from "react";
import {
  Logout as LogoutIcon,
  Group as GroupIcon,
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  // Notification as NotificationIcon,
} from "@mui/icons-material";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationsDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotifications, setIsNotifications] = useState(false);

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };

  const openSearchDialog = () => {
    setIsSearch((prev) => !prev);
  };

  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };

  const openNotifications = () => {
    setIsNotifications((prev) => !prev);
  };

  const navigateToGroup = () => navigate("/groups");

  const logouthandler = () => {
    console.log("Logout");
  };

  return (
    <>
      {/* <!-- AppBar content goes here --> */}
      <div className="flex-grow h-16">
        <div className="bg-orange-400 static"></div>

        <div className="flex items-center bg-gradient-to-r from-purple-400 to-orange-400 p-4">
          <h6 className="hidden sm:block text-lg font-semibold text-white">
            Ourchat
          </h6>

          <div className="sm:hidden ">
            <button className="text-white" onClick={handleMobile}>
              <MenuIcon />
            </button>
          </div>

          <div className="flex-grow"></div>

          <Tooltip title="Search">
            <div>
              <button
                className="text-white size-auto"
                onClick={openSearchDialog}
              >
                <SearchIcon />
              </button>
            </div>
          </Tooltip>

          <Tooltip title="New Group">
            <div>
              <button
                className="text-white size-auto ml-5 mr-5"
                onClick={openNewGroup}
              >
                <AddIcon />
                
              </button>
            </div>
          </Tooltip>

          <Tooltip title="Manage Groups">
            <div>
              <button
                className="text-white size-auto"
                onClick={navigateToGroup}
              >
                <GroupIcon />
              </button>
            </div>
          </Tooltip>

          <Tooltip title="Notifications">
            <div>
              <button
                className="text-white size-auto ml-5"
                onClick={openNotifications}
              >
                <NotificationsIcon />
              </button>
            </div>
          </Tooltip>

          <Tooltip title="Logout">
            <div>
              <button
                className="text-white size-auto mr-5 ml-5"
                onClick={logouthandler}
              >
                <LogoutIcon />
              </button>
            </div>
          </Tooltip>
        </div>
      </div>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNotifications && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationsDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

export default Header;
