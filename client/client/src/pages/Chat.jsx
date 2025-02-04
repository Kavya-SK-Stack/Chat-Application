import React, { Fragment, useRef } from "react";
import AppLayout from "../layout/AppLayout";
import { Stack, IconButton } from "@mui/material";
// import { InputAdornment, Input } from "@mui/material";
// import InputBox from "../components/StyledComponents";
import { purple } from "@mui/material/colors";
import InputBase from "@mui/material/InputBase";
import { InputBase as InputBox} from "../components/StyledComponents"
import { AttachFile as AttachFileIcon, Send as SendIcon } from "@mui/icons-material";
import FileMenu  from "../components/dialogs/FileMenu";
import MessageComponent from "../shared/MessageComponent";
import { sampleMessage } from "../constants/sampleData";


const user = {
  _id: "sdfghtf",
  name:"Heman"
}
const Chat = () => {
  const containerRef = useRef(null);

  return (
    <Fragment>
      <Stack
        ref={containerRef}
        className="p-4 space-x-4 bg-purple overflow-y-auto " 
        height={"88%"}
      >
       
        {
          sampleMessage.map(i => (
            <MessageComponent key={i._id} message={i} user={user} />
          ))
        }
        

      </Stack>

      <form className="h-10">
        <Stack
          direction={"row"}
          className="h-full p-4 flex items-center justify-between"
        >
          <IconButton
            sx={{
              position: "absolute",
              marginLeft: "-2rem",
              rotate: "30deg",
            }}
           
          >
            <AttachFileIcon />
          </IconButton>

          <InputBase
            placeholder="Type a Message Here........"
            className="w-full"
          />

          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              backgroundColor: "orange",
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                backgroundColor: "purple",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </Fragment>
  );
};

export default AppLayout()(Chat);
