import React, { useState, memo } from "react";
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
import { sampleUsers } from "../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";
import { useDispatch, useSelector } from "react-redux";
import { useAvailableFriendsQuery, useNewGroupMutation } from "../redux/api/api";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import { setIsNewGroup } from "../redux/reducers/misc";
import toast from "react-hot-toast";

const NewGroup = () => {
  const { isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();

  const [newGroup,isLoadingNewGroup ] = useAsyncMutation(useNewGroupMutation);

  const GroupName = useInputValidation("");
  const NewGroupName = useInputValidation("");

  const [selectedMembers, setSelectedMembers] = useState([]);
 
  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const isLoadingSendFriendRequest = false;

  const selectMemberHandler = (id) => {
    // setMembers((prev) => prev.map((user) => user._id === id? {...user, isAdded: !user.isAdded}: user));

    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };
  console.log(selectedMembers);

  const submitHandler = () => {
    if (!GroupName.value) return toast.error("Group name is required");
    
    if (selectedMembers.length < 2)
      return toast.error("Please Select at least 3 members");

    newGroup("Creating New Group...", { name: GroupName.value, members: selectedMembers });

    closeHandler();
    
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <Dialog onClose={closeHandler} open={isNewGroup}>
      <Stack
        p={{ xs: "1rem", sm: "3rem" }}
        width={"25rem"}
        spacing={"1rem"}
        className="bg-gradient-to-l from-purple-600 to-orange-400"
      >
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={GroupName.value}
          onChange={GroupName.changeHandler}
        />

        <Typography variant="body1">Members</Typography>
        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                handlerIsLoading={isLoadingSendFriendRequest}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          )}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant="outlined" color="error" size="large" onClick={closeHandler}
          disabled={isLoadingNewGroup}>
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={submitHandler}
            sx={{
              backgroundImage: "linear-gradient(to right, purple, orange)",
            }}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default memo(NewGroup);
