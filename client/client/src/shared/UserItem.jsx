import { Add, Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Avatar, Icon, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { transformImage } from "../lib/features";

const UserItem = ({ user, handler, handlerIsLoading, isAdded=false, styling={}, }) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        {...styling}
      >
        <Avatar src= {transformImage(avatar)} />
       
        <Typography
          variant="body1"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {name}
        </Typography>
        <IconButton
          size="small"
          sx={{
            backgroundImage: isAdded
              ? "linear-gradient(to left, purple, orange)"
              : "linear-gradient(to right, purple, orange)",
            color: "white",
            "&:hover": {
              backgroundImage: isAdded
                ? "linear-gradient(to right, purple, orange)"
                : "linear-gradient(to left, purple, orange)",
            },
            borderRadius: "50%",
          }}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >
          {isAdded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
