import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  Input,
  Stack,
  TextField,
  ListItem,
  ListItemText,
  List,
} from "@mui/material";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../constants/sampleData";
import { useSelector, useDispatch } from "react-redux";
import { setIsSearch } from "../redux/reducers/misc";
import { useLazySearchUserQuery, useSendFriendRequeustMutation } from "../redux/api/api";
import { toast } from "react-hot-toast";
import { useAsyncMutation } from "../hooks/hook";


const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();
  
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequeustMutation);

  const dispatch = useDispatch();

  const search = useInputValidation();

  const [users, setUsers] = useState(sampleUsers);

  const addFriendHandler = async (id) => {
   await sendFriendRequest ("Sending Friend Request...", { userId: id})
   
  };

  const searchCloseHandler = () => {
    dispatch(setIsSearch(false));
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack
        padding={"2rem"}
        direction={"column"}
        width={"25rem"}
        className="bg-gradient-to-l from-purple-600 to-orange-400"
      >
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          background={"green"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
