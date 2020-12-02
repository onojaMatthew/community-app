const { ChatRoom } = require("../models/chatRoom");

exports.join = async (socketId, topicId, username, userId) => {
  if (!topicId) return { error: "No room name is given" };
  const user = await ChatRoom.findOne({ room: topicId });
  
  if (user && user.room === topicId && user.username === username) return { error: "Username already taken." };
  let newUser = new ChatRoom({socketId, room: topicId, username, userId });
  newUser = await newUser.save();
  return { newUser };
}

exports.getUser = async (room, userId) => {
  if (!room) return { error: "Room not found" };

  const user = await ChatRoom.findOne({ room: room, userId:userId });
  if (!user) return { error: "User does not exist" };
  return { user };
}

exports.getUsersInRoom = (room) => {
  if (!room) return { error: "Invalid parameter values" };
  ChatRoom.find({ roomName: room })
    .then(rooms => {
      if (!rooms) return { error: "No user in this room" };
      return rooms;
    })
    .catch(err => {
      return { error: err.message };
    });
}

exports.deleteRoom = (socketId) => {
  if (!socketId) return { error: "Invalid parameter values" };

  ChatRoom.findOneAndDelete({ socketId })
    .then(room => {
      if (!room) return { error: `Room with the ID not found`};
      return {room }
    })
    .catch(err => {
      return { error: err.message };
    });
}