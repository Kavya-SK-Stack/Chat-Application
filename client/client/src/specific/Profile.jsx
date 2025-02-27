import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../lib/features";

const Profile = ({ user }) => {
  return (
    <Stack
      spacing={"1rem"}
      direction={"column"}
      alignItems={"center"}
      marginTop={"2rem"}
    >
      <Avatar
        src={transformImage(user?.avatar?.url)}
        // src={user?.avatar?.url}
        sx={{
          width: 150,
          height: 150,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />

      <ProfileCard heading={"Bio"} text={user?.bio} />

      <ProfileCard
        heading={"Username"}
        text={user?.username}
        Icon={<UserNameIcon />}
      />
      <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />

      <ProfileCard
        heading={"Joined"}
        text={moment(user?.createdAt).fromNow()}
        // 2025-01-29T00:00:00.000Z
        Icon={<CalendarIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    color={"black"}
    textAlign={"center"}
    spacing={"1rem"}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography className="text-gray-300" variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
