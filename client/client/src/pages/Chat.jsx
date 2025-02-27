import React, { Fragment, useRef, useState, useEffect, useCallback } from "react";
import AppLayout from "../layout/AppLayout";
import { Stack, IconButton, Skeleton } from "@mui/material";
// import { InputAdornment, Input } from "@mui/material";
// import InputBox from "../components/StyledComponents";
import { purple } from "@mui/material/colors";
import InputBase from "@mui/material/InputBase";
import { InputBase as InputBox} from "../components/StyledComponents"
import { AttachFile as AttachFileIcon, Send as SendIcon } from "@mui/icons-material";
import FileMenu  from "../components/dialogs/FileMenu";
import MessageComponent from "../shared/MessageComponent";
import { sampleMessage } from "../constants/sampleData";
import { getSocket } from "../socket";
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../constants/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { TypingLoader } from "../layout/Loaders";
import { useNavigate } from "react-router-dom";


const Chat = ({ chatId, user }) => {
  
  const containerRef = useRef(null);
  const socket = getSocket();
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  const [message, setMessage] = useState("");
   const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
   const [fileMenuAnchor, setIsFileMenuAnchor] = useState(null);
  

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);
  console.log(userTyping);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });
 
  const {data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  )
  
  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const members = chatDetails?.data?.chat?.members;

  const messageOnChange = (e) => {
    setMessage(e.target.value);
    
    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

   typingTimeout.current = setTimeout(() => { 
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [2000]);
  };

  const handleFileOpen = (e) => { 
    dispatch(setIsFileMenu(true));
    setIsFileMenuAnchor(e.currentTarget);
  };
 
  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Emitting message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
   
  };

  useEffect(() => {
    socket.emit(CHAT_JOINED,{userId:user._id,members});
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED, {userId:user._id,members});
    };
  }, [chatId]);

  
  useEffect(() => {
    if(bottomRef.current) bottomRef.current.scrollIntoView({behavior:"smooth"})
  }, [messages]);
  
  useEffect(() => {
    if(!chatDetails.data?.chat) return navigate("/")
  }, [chatDetails.data])

  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      
      setUserTyping(true);
    },
    [chatId]
  );

   const stopTypingListener = useCallback(
     (data) => {
       if (data.chatId !== chatId) return;
       
       setUserTyping(false);
     },
     [chatId]
  );
  
  const alertListener = useCallback((data) => {
    if (data.chatId !== chatId) return;
    const messageForAlert = {
      content: data.message,
      sender: {
        _id: "hgfdghjkkasjdhgf",
        name: "Admin",
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, messageForAlert]);

  }, [chatId]);



  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };
 
  useSocketEvents(socket, eventHandler);

  useErrors(errors)

 const allMessages = [...oldMessages, ...messages].sort((a, b) => {
   return new Date(a.createdAt) - new Date(b.createdAt);
 });

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        className="p-4 space-y-4 bg-purple"
        style={{
          overflowX: "hidden",
          overflowY: "auto",
          height: "90vh", 
        }}
      >
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}

        {userTyping && <TypingLoader />}

        <div ref={bottomRef} />
      </Stack>

      <form
        className="h-10 "
        onSubmit={submitHandler}
        style={{
          position: "relative",
          bottom: 40,
          background: "white",
          
        }}
      >
        <Stack
          direction={"row"}
          className="h-full p-4 flex items-center justify-between absolute"
        >
          <IconButton
            sx={{
              position: "absolute",
              marginLeft: "-2rem",
              rotate: "30deg",
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBase
            placeholder="Type Message Here........"
            value={message}
            onChange={messageOnChange}
            className="w-full"
            // sx={{ py: 1 }}
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
      <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  );
};

export default AppLayout()(Chat);
