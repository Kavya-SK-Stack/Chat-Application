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
import {  matblack } from "../constants/color";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { Link } from "../components/StyledComponents";
import { Link } from "react-router-dom";
import AvatarCard from "../shared/AvatarCard";
import { sampleChats, sampleUsers } from "../constants/sampleData";
import UserItem from "../shared/UserItem";
// import { confirmDeleteDialog } from "../components/dialogs/confirmDeleteDialog";
import Loading from "../pages/admin/Loading";

// import { ConfirmDeleteDialog } from "../components/dialogs/confirmDeleteDialog";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/confirmDeleteDialog")
);


const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const isAddMember = false;

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();

  console.log(chatId);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    setIsEdit(false);
    console.log(groupNameUpdatedValue);
  };

  const openconfirmDeleteHandler = () => {
     console.log("Delete Group");
    setConfirmDeleteDialog(true);
   
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };
  const openAddMemberHandler = () => {
    console.log("Add Member");
  };
  console.log(confirmDeleteDialog);
  const deleteHandler = () => {
    console.log("Delete Handler");
     closeConfirmDeleteHandler();
  };

  const removeMemberHandler = (id) => {
    console.log("Remove Member", id);
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
    <div className="flex flex-row items-center justify-center p-8 gap-4 " >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
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
        onClick={openconfirmDeleteHandler}
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

  return (
    <div className="h-screen grid grid-cols-1 sm:grid-cols-4">
      <div className="hidden sm:block bg-gradient-to-tr from-purple-700 to-orange-500 ">
        <GroupsList myGroups={sampleChats} chatId={chatId} />
      </div>
      <div className="col-span-1 sm:col-span-3 flex flex-col items-center relative p-4 sm:p-12">
        {IconBtns}

        {groupName && (
          <>
            {GroupName}

            <div className="flex variant-[body1] self-start m-12">Members</div>

            <div className="max-w-[45rem] w-full box-border p-4 sm:p-4 md:p-4 md:px-16 h-[50vh] overflow-auto">
              {/* Members */}

              {sampleUsers.map((i) => (
                <UserItem
                  user={i}
                  key={i._id}
                  isAdded
                  styling={{
                    boxShadow: "0 0 1rem rgba(0,0,0,0.2)",
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                  }}
                  handler={removeMemberHandler}
                />
              ))}
            </div>

            {ButtonGroup}
          </>
        )}
      </div>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog
          />
        </Suspense>
      )}

      {confirmDeleteDialog && 
        <Suspense fallback={<Loading/>}>
      <ConfirmDeleteDialog
        // open={confirmDeleteDialog}
        // handleClose={closeConfirmDeleteHandler}
        // deleteHandler={deleteHandler}
        
      />
      </Suspense>
       } 

      <Drawer
        className="block sm:hidden "
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupsList w={"50vw"} myGroups={sampleChats} chatId={chatId} />
      </Drawer>
    </div>
  );
};

const GroupsList = ({ w = "100", myGroups = [], chatId }) => (
  // add a bg-color group
  <Stack width={w}  >
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
