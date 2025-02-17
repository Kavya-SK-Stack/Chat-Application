import React, { useEffect } from "react";
import Header from "./Header";
import Title from "../shared/Title";
import ChatsList from "../specific/ChatsList";
import { sampleChats } from "../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../redux/api/api";
import { useSelector, useDispatch } from "react-redux";
import { Skeleton, Drawer } from "@mui/material";
import { setIsMobile } from "../redux/reducers/misc";
import { useErrors } from "../hooks/hook";


const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const chatId = params.chatId;

    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.misc);
    
    const {isLoading, data, isError, error,refetch} = useMyChatsQuery("")

    useErrors([{ isError, error}]);
   

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete Chat", _id, groupChat);
    }

    const handleMoblileClose = () => dispatch(setIsMobile(false));


    return (
      <>
        <Title />
        <Header />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMoblileClose}>
            <ChatsList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}

        <div className="grid grid-cols-12 h-[calc(100vh-4rem)] space-x-4">
          {/* <!-- First Section --> */}
          <div className="hidden sm:block sm:col-span-4 md:col-span-3 h-full bg-gradient-to-tr from-purple-600 to-orange-500 -my-1">
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatsList
                  chats={data?.chats}
                  chatId={chatId}
                  handleDeleteChat={handleDeleteChat}
              />
            )}
          </div>

          {/* <!-- Middle Section --> */}
          <div className=" col-span-12 sm:col-span-8 md:col-span-5 lg:col-span-6 h-full">
            <WrappedComponent {...props} />
          </div>

          {/* <!-- Third Section --> */}
          <div className="hidden md:block md:col-span-4 lg:col-span-3 h-full  bg-gradient-to-tr from-orange-500 to-purple-600 -mt-1  ">
            <Profile user={user } />
          </div>
        </div>
      </>
    );
  };
};

export default AppLayout;
