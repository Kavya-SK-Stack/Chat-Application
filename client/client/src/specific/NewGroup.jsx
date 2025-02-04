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
} from "@mui/material";
import { sampleUsers } from "../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";

const NewGroup = () => {
  const NewGroup = useInputValidation("");
  const GroupName = useInputValidation("");

  const [members, setMembers] = useState(sampleUsers);

  const [selectedMembers, setSelectedMembers] = useState([]);

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

  const submitHandler = () => {};

  const closeHandler = () => {};

  return (
    <Dialog open onClose={closeHandler}>
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
          {members.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={selectMemberHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
              isAdded={selectedMembers.includes(i._id)}
            />
          ))}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant="outlined" color="error" size="large">
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
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
