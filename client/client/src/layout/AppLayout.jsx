import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import ChatsList from "../specific/ChatsList";
import { sampleChats } from "../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";


const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete Chat", _id, groupChat);
    }

    return (
      <>
        <Title />
        <Header />

        <div className="grid grid-cols-12 h-[calc(100vh-4rem)] space-x-4">
          {/* <!-- First Section --> */}
          <div className="hidden sm:block sm:col-span-4 md:col-span-3 h-full bg-gradient-to-tr from-purple-400 to-orange-500 -my-1">
            <ChatsList
              chats={sampleChats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </div>

          {/* <!-- Middle Section --> */}
          <div className=" col-span-12 sm:col-span-8 md:col-span-5 lg:col-span-6 h-full">
            <WrappedComponent {...props} />
          </div>

          {/* <!-- Third Section --> */}
          <div className="hidden md:block md:col-span-4 lg:col-span-3 h-full  bg-gradient-to-tr from-orange-400 to-purple-500 -mt-1  ">
            <Profile />
          </div>
        </div>
      </>
    );
  };
};

export default AppLayout;
