import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Typography, Stack } from "@mui/material";
import AvatarCard from "../shared/AvatarCard"
// or
// import { Avatar } from "@mui/material";



 const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link 
      className="-my-1"
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <div
        className={`flex gap-4 items-center p-4 ${
          sameSender ? "bg-black text-white" : ""
        } relative`}
      >
        <AvatarCard avatar={avatar} />



        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Message</Typography>
          )}
        </Stack>
        {isOnline && (
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 absolute top-1/2 right-4 transform -translate-y-1/2"></div>
        )}
      </div>
    </Link>
  );
};

export default memo( ChatItem );
