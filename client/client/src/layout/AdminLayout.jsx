import React, { useState } from "react";
import { Menu as MenuIcon, Close as CloseIcon, ManageAccounts as ManageAccountsIcon, Group as GroupIcon, Message as MessageIcon, ExitToApp as ExitToAppIcon} from "@mui/icons-material";
import { IconButton, Drawer, Typography, styled} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import { Dashboard as DashboardIcon } from "@mui/icons-material";
// import { Link } from "../components/StyledComponents";
import { Navigate } from "react-router-dom";


const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  }, 

  {
    name: "Users",
    path: "/admin/users",
    icon:<ManageAccountsIcon />,
  },

  {
    name: "Chats",
    path: "/admin/chats",
    icon: <GroupIcon />,
  },

  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageIcon />,
  },
];   
    
const Sidebar = ({ w = "100%" }) => {
    const location = useLocation();
    
    const logouthandler = () => {
        console.log("Logout");
    }


  return (
    <div style={{ width: w }} className=" flex flex-col p-12 gap-12">
      <Typography variant="h5" textTransform={"uppercase"}>
        Our chat
      </Typography>

      <div className="flex flex-col gap-8 ">
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`
                 ${
                   location.pathname === tab.path && "bg-gray-800 text-white "
                 } flex items-center gap-4 px-4 py-2 rounded-3xl `}
          >
            <div className="flex items-center gap-4  hover:text-gray-400">
              {tab.icon}

              <Typography >{tab.name}</Typography>
            </div>
          </Link>
        ))}

        <Link onClick={logouthandler}>
          <div className="flex items-center gap-4 px-4 py-2 hover:text-gray-400">
            <ExitToAppIcon />

            <Typography>Logout</Typography>
          </div>
        </Link>
      </div>
    </div>
  );
};

const isAdmin = true;
const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => setIsMobile(!isMobile);

    const handleClose = () => setIsMobile(false);
    
    if (!isAdmin) return <Navigate to="/admin" />;


  return (
    <div className="h-screen flex flex-row">
      <div className="block md:hidden fixed top-4 right-4">
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </div>

      <div className="hidden md:flex md:w-1/4">
        <Sidebar />
      </div>
      <div className="bg-gray-300 w-full" xs={12} md={8} lg={9}>
        {children}
      </div>

      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="50vw" />
      </Drawer>
    </div>
  );
};

export default AdminLayout;
