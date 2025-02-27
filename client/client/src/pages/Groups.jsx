import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import {
  IconButton,
  Tooltip,
  Box,
  Drawer,
  Typography,
  Stack,
  TextField,
  ButtonGroup,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
  Edit as EditIcon,
  Done as DoneIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Add,
  Padding,
} from "@mui/icons-material";
import { matblack } from "../constants/color";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { Link } from "../components/StyledComponents";
import { Link } from "react-router-dom";
import AvatarCard from "../shared/AvatarCard";
import { sampleChats, sampleUsers } from "../constants/sampleData";
import UserItem from "../shared/UserItem";
// import { confirmDeleteDialog } from "../components/dialogs/confirmDeleteDialog";
import Loading from "../pages/admin/Loading";

// import { ConfirmDeleteDialog } from "../components/dialogs/confirmDeleteDialog";

import ConfirmDeleteDialog from "../components/dialogs/confirmDeleteDialog";
import {
  useAddGroupMembersMutation,
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import { LayoutLoader } from "../layout/Loaders";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducers/misc";

const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);

  const myGroups = useMyGroupsQuery("");

  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(
    useRenameGroupMutation
  );

  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );

  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
    useDeleteChatMutation
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");

  // console.log(groupDetails?.data?.chat?.members);

  const [members, setMembers] = useState([]);
  

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },

    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];
  useErrors(errors);

 useEffect(() => {
   const groupData = groupDetails.data;
   if (groupData && groupData.chat && groupData.chat.members) {
     setGroupName(groupData.chat.name);
     setGroupNameUpdatedValue(groupData.chat.name);
     setMembers(groupData.chat.members);
     
   }

   return () => {
     setGroupName("");
     setGroupNameUpdatedValue("");
     setIsEdit(false);
   };
 }, [groupDetails.data]);
  
  
  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("Update Group Name...", {
      chatId,
      name: groupNameUpdatedValue,
    });
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  };

  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId);
    closeConfirmDeleteHandler();
    navigate("/groups");
  };

  const removeMemberHandler = (userId) => {
    removeMember("Removing Member...", { chatId, userId });
  };

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);
  const IconBtns = (
    <>
      <div className="block sm:hidden fixed top-8 right-8">
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </div>

      <Tooltip title="Back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matblack,
            color: "white",
            ":hover": { bgcolor: "rgba(0,0,0,0.7)" },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <div className="flex flex-row items-center justify-center p-8 gap-4 ">
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton
            disabled={isLoadingGroupName}
            onClick={() => setIsEdit(true)}
          >
            <EditIcon />
          </IconButton>
        </>
      )}
    </div>
  );

  const ButtonGroup = (
    <div className="flex flex-col-reverse sm:flex-row gap-4 p-0 sm:p-4 md:px-16 md:py-4">
      <Button
        size="large"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
        className="bg-gradient-to-r from-purple-600 to-orange-500"
      >
        Add Member
      </Button>
    </div>
  );

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <div className="h-screen grid grid-cols-1 sm:grid-cols-4">
      <div className="hidden sm:block bg-gradient-to-tr from-purple-700 to-orange-500 ">
        <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </div>
      <div className="col-span-1 sm:col-span-3 flex flex-col items-center relative p-4 sm:p-12">
        {IconBtns}

        {groupName && (
          <>
            {GroupName}

            <div className="flex variant-[body1] self-start m-12">Members</div>

            <div className="max-w-[45rem] w-full box-border p-4 sm:p-4 md:p-4 md:px-16 h-[50vh] overflow-auto">
              {/* Members */}

                {
                  isLoadingRemoveMember ? (
                <CircularProgress />
              ) : (
                members.map((user, index) => (
                  <UserItem
                    user={user}
                    key={index}
                    isAdded
                    styling={{
                      boxShadow: "0 0 1rem rgba(0,0,0,0.2)",
                      padding: "1rem 2rem",
                      borderRadius: "1rem",
                    }}
                    handler={removeMemberHandler}
                  />
                )
                )
              )}
            </div>

            {ButtonGroup}
          </>
        )}
      </div>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <ConfirmDeleteDialog
          open={confirmDeleteDialog}
          handleClose={closeConfirmDeleteHandler}
          deleteHandler={deleteHandler}
        />
      )}

      <Drawer
        className="block sm:hidden "
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupsList
          w={"50vw"}
          myGroups={myGroups?.data?.groups}
          chatId={chatId}
        />
      </Drawer>
    </div>
  );
};

const GroupsList = ({ w = "100", myGroups = [], chatId }) => (
  // add a bg-color group
  <Stack width={w}>
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupsListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography className="flex items-center p-4">No groups</Typography>
    )}
  </Stack>
);

const GroupsListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <div className="flex items-center flex-row ">
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </div>
    </Link>
  );
});

export default Groups;
