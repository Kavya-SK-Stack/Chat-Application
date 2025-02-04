import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";

const Profile = ({ text, Icon, heading }) => {
  return (
    <Stack
      spacing={"1rem"}
      direction={"column"}
      alignItems={"center"}
      marginTop={"2rem"}
    >
      <Avatar
        sx={{
          width: 150,
          height: 150,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={"Lorem ipsum dolor sit amet."} />

      <ProfileCard
        heading={"Username"}
        text={"username"}
        Icon={<UserNameIcon />}
      />
      <ProfileCard heading={"Name"} text={"Abhishek"} Icon={<FaceIcon />} />

      <ProfileCard
        heading={"Joined"}
        text={moment("2025-01-29T00:00:00.000Z").fromNow()}
        Icon={<CalendarIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    color={"white"}
    textAlign={"center"}
    spacing={"1rem"}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color={"gray"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
