import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Backdrop,
  Badge,
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
import { UserNotExists } from "../redux/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../constants/config";
import { setIsMobile, setIsNewGroup } from "../redux/reducers/misc";
import { setIsSearch, setIsNotification } from "../redux/reducers/misc";
import { resetNotificationCount } from "../redux/reducers/chat";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationsDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  ); 
    const { notificationCount } = useSelector((state) => state.chat); 


  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };

  const openSearch = () => {
    dispatch(setIsSearch(true));

  };

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };

  const openNotification = () => {
     dispatch(setIsNotification(true));
     dispatch(resetNotificationCount());

  }
   
  const navigateToGroup = () => navigate("/groups");

  const logouthandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(UserNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    }
  };

  return (
    <>
      {/* <!-- AppBar content goes here --> */}
      <div className="flex-grow h-16">
        <div className="bg-orange-400 static"></div>

        <div className="flex items-center bg-gradient-to-r from-purple-600 to-orange-500 p-4">
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
                onClick={openSearch}
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

          {/* <Tooltip title="Notifications">
            <div>
              <button
                className="text-white size-auto ml-5"
                onClick={openNotification}
                
              >
                <NotificationsIcon />
              </button>
            </div>
          </Tooltip> */}

          <IconBtn
  title="Notifications"
  icon={<NotificationsIcon />}
  onClick={openNotification}
  value={notificationCount}
/>

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

      {isNotification && (
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

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <button className="text-white size-auto pl-4" onClick={onClick}>
        {value ? <Badge badgeContent={value} color="error"> {icon} </Badge>: icon }
  
      </button>
    </Tooltip>
  );
}

export default Header;
