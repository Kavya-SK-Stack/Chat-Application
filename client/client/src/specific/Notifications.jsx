import React, { memo, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  ListItem,
  ListItemText,
  List,
  Typography,
  Button,
  Avatar,
  Skeleton,
} from "@mui/material";
import { sampleNotifications } from "../constants/sampleData";
import { useGetNotificationsQuery } from "../redux/api/api";
import { useErrors } from "../hooks/hook";

const Notifications = () => {
  const [allRequests, setAllRequests] = useState([]); // Define allRequests as an empty array

  const { isLoading, data, error, isError } = useGetNotificationsQuery();

  const friendRequestHandler = ({ _id, accept }) => {};

  useErrors([{ error, isError }]);

  console.log(data);

  return (
    <Dialog open>
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        maxWidth={"25rem"}
        className="bg-gradient-to-r from-purple-600 to-orange-400"
      >
        <DialogTitle>Notifications</DialogTitle>

        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {allRequests && allRequests.length > 0 ? (
              allRequests?.map(({ request }) => (
                <NotificationItem
                  sender={request.sender}
                  _id={request._id}
                  handler={friendRequestHandler}
                  key={request._id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>0 notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar />

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
          {`${name} sent you a friend request.`}
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button
             onClick={() => handler({ _id, accept: true })}
          >
            Accept
          </Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
