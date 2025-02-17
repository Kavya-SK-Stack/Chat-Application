import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { cookieOptions, emitEvent, sendToken, uploadFilesToCloudinary } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js"
import {Request} from "../models/request.js";
import { NEW_REQUEST } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";


// Create a new user and save it to the database and save in cookie and save token
const newUser = async (req, res, next) => {
  const { name, username, password, bio } = req.body;

  const file = req.file;

  if (!file) return next(new ErrorHandler("Please Upload Avatar"));

  const result = await uploadFilesToCloudinary([file]);

  const avatar = {
    public_id: result[0].public_id,
    url: result[0].url,
  };

  const user = await User.create({ name, bio, username, password, avatar });

  sendToken(res, user, 201, "User Created Successfully");
};

// Login user and save token in cookie
const login = TryCatch (async(req, res, next) => {

         const { username, password } = req.body;

         const user = await User.findOne({ username }).select("+password");

        if (!user) return next(new ErrorHandler("Invalid Username or Password", 404));
    
         const isMatch = await compare(password, user.password);

         if (!isMatch) return next(new Error("Invalid Username or Password", 404));

         sendToken(res, user, 201, `Welcome Back, ${user.name}`);
          
});

const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);

  if (!user) return next(new ErrorHandler("User not found", 404));

  res.status(200).json({
    success: true,
    user,
  });
});

const logout = TryCatch(async (req, res) => {
  
  return res.status(200).cookie("ourchat-token","",{...cookieOptions, maxAge: 0}).json({
    success: true,
    message: "Logged out successfully",
  });
});



// const searchUser = TryCatch(async (req, res) => {
//   const { name = "" } = req.query;

//   const myChats = await Chat.find({ groupChat: false, members: req.user });

//   // All users from my chats means frineds or people I have chatted with
  
//   const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);

// // searchuser showing empty array

//   const allUsersExceptMeAndFriends = await User.find({
//     _id: { $nin: allUsersFromMyChats },
//     name: { $regex: name, $options: "i" },
//   });

//   const users = allUsersExceptMeAndFriends.map(({user}) => ({
//     _id: user.id,
//     name:user.name,
//     avatar:user.avatar.url,
//   }));

//   return res.status(200).json({
//     success: true,
//     users,
//   });
// });

const searchUser = TryCatch(async (req, res) => {
  const { name = "" } = req.query;

  const myChats = await Chat.find({ groupChat: false, members: req.user });

  const allUsersFromMyChats = myChats.reduce((acc, chat) => acc.concat(chat.members), []);

  const allUsers = await User.find({ _id: { $ne: req.user._id } });

  let users = allUsers;

  if (name !== "") {
    users = await User.find({
      _id: { $ne: req.user._id },
      name: { $regex: name, $options: "i" },
    });
  }

  const formattedUsers = users.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }));

  return res.status(200).json({
    success: true,
    users: formattedUsers,
  });
});


const sendFriendRequest = TryCatch(async (req, res, next) => {
  const { userId } = req.body;

  const request = await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ],
  });

  if (request)
    return next(new ErrorHandler("You already sent a friend request", 400));

  await Request.create({
    sender: req.user,
    receiver: userId,
  });

  emitEvent(req, NEW_REQUEST, [userId]);

  return res.status(200).json({
    success: true,
    message: "Friend Request Sent successfully",
  });
});

// const acceptFriendRequest = TryCatch(async (req, res, next) => {
//   const { requestId, accept } = req.body;

//   const request = await Request.findById(requestId)
//     .populate("sender", "name")
//     .populate("receiver", "_id name");
  
//   console.log(request);

//   if (!request) return next(new ErrorHandler("Request not found", 404));
  
//    if (request.receiver && request.receiver._id && request.receiver._id.toString() !== req.user.toString()) {
//     return next(new ErrorHandler("You are not authorized to accept this request", 403));
//   }

//   if (!accept) {
//     await request.deleteOne();

//     return res
//       .status(200)  
//       .json({
//         success: true,
//         message: "Friend Request Rejected",
//       });
//   }

//   if (!request.receiver) {
//        console.log("Receiver not found");
//     console.log(request);
    
//       return res.status(404).json({ message: "Receiver not found" });
//     }
//   const members = [request.sender._id, request.receiver._id];

//   await Promise.all([
//     Chat.create({
//       members,
//       name: `${request.sender.name}-${request.receiver.name }`,
//     }),
//     request.deleteOne(),
//   ]);

//   emitEvent(req, REFETCH_CHATS, members);

//   return res
//     .status(200)
//     .json({
//       success: true,
//       message: "Friend Request Accepted",
//       senderId: request.sender._id,
//     });
// });

const acceptFriendRequest = TryCatch(async (req, res, next) => {
  try {
    const { requestId, accept } = req.body;

    // Log request body for debugging
    console.log("Incoming Request Body:", req.body);

    // Fetch request and populate sender & receiver details
    const request = await Request.findById(requestId)
      .populate("sender", "name")
      .populate("receiver", "_id name");

    // Log fetched request
    console.log("Fetched Request:", request);

    // Check if request exists
    if (!request) {
      console.log("Request not found:", requestId);
      return next(new ErrorHandler("Request not found", 404));
    }

    // Check if the current user is the receiver
    if (
      !request.receiver ||
      !request.receiver._id ||
      request.receiver._id.toString() !== req.user.toString()
    ) {
      console.log("Unauthorized access attempt by user:", req.user);
      return next(
        new ErrorHandler("You are not authorized to accept this request", 403)
      );
    }

    // If request is rejected
    if (!accept) {
      await request.deleteOne();
      return res.status(200).json({
        success: true,
        message: "Friend Request Rejected",
      });
    }

    // Check if sender exists before proceeding
    if (!request.sender || !request.sender._id) {
      console.log("Sender not found in request:", request);
      return res.status(404).json({ message: "Sender not found" });
    }

    // Ensure receiver exists
    if (!request.receiver) {
      console.log("Receiver not found in request:", request);
      return res.status(404).json({ message: "Receiver not found" });
    }

    // Define members of the chat
    const members = [request.sender._id, request.receiver._id];

    // Create a new chat and delete the request
    await Promise.all([
      Chat.create({
        members,
        name: `${request.sender.name}-${request.receiver.name}`,
      }),
      request.deleteOne(),
    ]);

    // Emit an event for real-time updates
    emitEvent(req, REFETCH_CHATS, members);

    // Success response
    return res.status(200).json({
      success: true,
      message: "Friend Request Accepted",
      senderId: request.sender._id,
    });
  } catch (error) {
    console.error("Error in acceptFriendRequest:", error);
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});



const getMyNotifications = TryCatch(async (req, res) => {
  const requests = await Request.find({ receiver: req.user }).populate(
    "sender",
    "name avatar"
  );

  const allRequests = requests.map((request) => ({
    _id: request._id,
    sender: {
      _id: request.sender._id,
      name: request.sender.name,
      avatar: request.sender.avatar.url,
    },
  }));

  return res.status(200).json({
    success: true,
    allrequests: allRequests,
  });
});

const getMyFriends = TryCatch(async (req, res) => {
  const chatId = req.query.chatId;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
 
  const chats = await Chat.find({ members: req.user._id }).populate(
    "members",
    "name avatar"
  );

console.log("Chats found:", chats);

  const friends = chats.map(({ members }) => {
    const otherUser = getOtherMember(members, req.user);
     console.log("Other User:", otherUser);
    
    return {
      _id: otherUser._id,
      name: otherUser.name,
      avatar: otherUser.avatar.url,
    };
  });

   console.log(friends);
  
  if (chatId) {

    const chat = await Chat.findById(chatId);

    const availableFriends = friends.filter((friend) => !chat.members.includes(friend._id));

    return res.status(200).json({
      success: true,
     friends: availableFriends,
    });
  } else {
     return res.status(200).json({
       success: true,
       friends,
     });
    
  }
});


export {
  login,
  newUser,
  getMyProfile,
  logout,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getMyNotifications,
  getMyFriends,
};