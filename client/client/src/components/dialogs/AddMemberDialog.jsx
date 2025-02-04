import { Button, Dialog, DialogTitle, Typography } from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../../shared/UserItem";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {

    const [members, setMembers] = useState(sampleUsers);
    
      const [selectedMembers, setSelectedMembers] = useState([]);
    
      const selectMemberHandler = (id) => {
        setSelectedMembers((prev) =>
          prev.includes(id)
            ? prev.filter((currElement) => currElement !== id)
            : [...prev, id]
        );
      };
    
const closeHandler = () => {
  setSelectedMembers([]);
  setMembers([]);

}
  const addMemberSubmitHandler = () => {
    closeHandler();
  };
    
    
  return (
    <Dialog open onClose={closeHandler}>
      <div className="p-8 w-[20rem] flex flex-col gap-8 bg-gradient-to-t from-purple-600 to bg-orange-400">
        <DialogTitle className="text-center ">Add Member</DialogTitle>

        <div className="flex flex-col gap-4">
          {members.length > 0 ? (
            members.map((i) => (
              <UserItem key={i._id} user={i} handler={selectMemberHandler} isAdded={selectedMembers.includes(i._id)} />
            ))
          ) : (
            <Typography className="flex items-center justify-center">No Friends</Typography>
          )}
        </div>
        <div className="flex flex-row items-center justify-evenly">
          <Button color="error" onClick={closeHandler}>Cancel</Button>
          <Button onClick={addMemberSubmitHandler} variant="contained" disabled={isLoadingAddMember}>Submit Changes</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default AddMemberDialog;
