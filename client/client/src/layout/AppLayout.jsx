import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Title from "../shared/Title";
import ChatList from "../specific/ChatsList";
import { sampleChats } from "../constants/sampleData";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../redux/api/api";
import { useSelector, useDispatch } from "react-redux";
import { Skeleton, Drawer } from "@mui/material";
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from "../redux/reducers/misc";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { getSocket } from "../socket";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../constants/events";
import { useCallback } from "react";
import {
  incrementNotificationCount,
  setNewMessagesAlert,
} from "../redux/reducers/chat";
import { getOrSaveFromStorage } from "../lib/features";
import DeleteChatMenu from "../components/dialogs/DeleteChatMenu";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const socket = getSocket();

    const chatId = params.chatId;
    const deleteMenuAnchorRef = useRef(null);

    const [onlineUsers, setOnlineUsers] = useState([]);

    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
    }, [newMessagesAlert]);

    const handleDeleteChat = (e, _id, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({chatId, groupChat}));
      deleteMenuAnchorRef.current = e.currentTarget;
    };

    const handleMoblileClose = () => dispatch(setIsMobile(false));

    const newMessageAlertListener = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );

    const newRequestListener = useCallback(() => {
      dispatch(incrementNotificationCount());
    }, [dispatch]);

    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const onlineUsersListener = useCallback((data) => {
      setOnlineUsers(data);
        
      }, []);


    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertListener,
      [NEW_REQUEST]: newRequestListener,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUsersListener,
    };

    useSocketEvents(socket, eventHandlers);

    return (
      <>
        <Title />
        <Header />

        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchorRef={deleteMenuAnchorRef}
        />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMoblileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
              onlineUsers={onlineUsers}
            />
          </Drawer>
        )}

        <div className="grid grid-cols-12 h-[calc(100vh-4rem)] space-x-4">
          {/* <!-- First Section --> */}
          <div className="hidden sm:block sm:col-span-4 md:col-span-3 h-full bg-gradient-to-tr from-purple-600 to-orange-500 -my-1">
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
              />
            )}
          </div>

          {/* <!-- Middle Section --> */}
          <div className=" col-span-12 sm:col-span-8 md:col-span-5 lg:col-span-6 h-full ">
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </div>

          {/* <!-- Third Section --> */}
          <div className="hidden md:block md:col-span-4 lg:col-span-3 h-full  bg-gradient-to-tr from-orange-500 to-purple-600 -mt-1  ">
            <Profile user={user} />
          </div>
        </div>
      </>
    );
  };
};

export default AppLayout;
