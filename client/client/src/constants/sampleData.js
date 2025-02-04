import { use } from "react";

export const sampleChats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Heman",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },

  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Babu",
    _id: "2",
    groupChat: true,
    members: ["1", "2"],
  },
  
];

export const sampleUsers = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Heman",
    _id: "1",
  },

  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Babu",
    _id: "2",
  },
];

export const sampleNotifications = [
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Heman",
    },
    _id: "1",
  },

  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Babu",
    },
    _id: "2",
  },
];

export const sampleMessage = [
  {
    attachments: [],
    content: "Say Hello",
    _id: "sfnsdfsdnkfjnddds",
    sender: {
      _id: "user._id",
      name: "Dhanu",
    },
    chat: "chatId", 
    createdAt: "2025-01-29T08:50:06.753Z",
  },

  {
    attachments: [
      {
        public_id: "asdsad",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    _id: "sfnsdfsdnkfjfghnds",
    sender: {
      _id: "sdfghtf",
      name: "Dhanu 2",
    },
    chat: "chatId",
    createdAt: "2025-01-29T08:50:06.753Z",
  },
];


export const dashboardData = {
  users: [
    {
      name: "Heman",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "1",
      username: "heman",
      friends: 20,
      groups: 5,
    },
    {
      name: "Babu",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "2",
      username: "babu",
      friends: 20,
      groups: 25,
    },
  ],

  chats: [
    {
      name: "Rocks Group",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "1",
      groupChat: false,
      members: [
        {
          _id: "1",
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
        },

        {
          _id: "2",
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "Heman",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
    {
      name: "Angels Group",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "2",
      groupChat: true,
      members: [
        {
          _id: "1",
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
        },

        {
          _id: "2",
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "Heman",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
  ],

  messages: [
    {
      attachments: [],
      content: "Say Hello",
      _id: "sfnsdfsdnkfjnddds",
      sender: {
        _id: "user._id",
        name: "Dhanu",
      },
      chat: "chatId",
      groupChat: false,
      createdAt: "2025-01-29T08:50:06.753Z",
    },

    {
      attachments: [
        {
          public_id: "asdsad",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      _id: "sfnsdfsdnkfjfghnds",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Dhanu 2",
      },
      chat: "chatId",
      groupChat: true,
      createdAt: "2025-01-29T08:50:06.753Z",
    },
  ],
};