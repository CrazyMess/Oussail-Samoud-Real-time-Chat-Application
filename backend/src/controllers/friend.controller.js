import User from "../models/user.model.js";
import Friend from "../models/friend.model.js";

// Get all friends
export const getFriends = async (req, res) => {
  try {
    const userId = req.user._id;

    const friends = await Friend.find({
      $or: [{ requesterId: userId }, { recieverId: userId }],
      status: true,
    });

    // get user ids of friends (excluding the current user id)
    const friendIds = friends.map((friend) => {
      return friend.requesterId !== userId ? friend.requesterId : friend.recieverId;
    });

    // and then get user details of friends
    const users = await User.find({ _id: { $in: friendIds } });

    res.status(200).json(users);
  } catch (error) {
    console.log("Error in getFriends controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all friend requests
export const getRequests = async (req, res) => {
  try {
    const userId = req.user._id;

    const requests = await Friend.find({
      recieverId: userId,
      status: false,
    });

    // get user ids of requesters
    const requesterIds = requests.map((request) => request.requesterId);

    // get user details of requesters
    const requesterDetails = await User.find({
      _id: { $in: requesterIds },
    });

    res.status(200).json(requesterDetails);
  } catch (error) {
    console.log("Error in getRequests controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all pending friend requests
export const getPendingRequests = async (req, res) => {
  try {
    const userId = req.user._id;

    const requests = await Friend.find({
      requesterId: userId,
    });

    // get user ids of recievers
    const recieverIds = requests.map((request) => request.recieverId);

    // get user details of recievers
    const recieverDetails = await User.find({
      _id: { $in: recieverIds },
    });

    res.status(200).json(recieverDetails);
  } catch (error) {
    console.log("Error in getPendingRequests controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Send friend request
export const sendRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const requesterId = req.user._id;

    const request = await Friend.create({
      requesterId,
      recieverId: id,
    });

    res.status(201).json(request);
  } catch (error) {
    console.log("Error in sendRequest controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Accept friend request
export const acceptRequest = async (req, res) => {
  try {
    const { friendId } = req.body;
    const userId = req.user._id;

    await Friend.findOneAndUpdate(
      {
        $or: [
          { requesterId: friendId, recieverId: userId },
          { requesterId: userId, recieverId: friendId },
        ],
      },
      {
        status: true,
      }
    );

    res.status(200).json({ message: "Request accepted" });
  } catch (error) {
    console.log("Error in acceptRequest controller: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Reject friend request
export const rejectRequest = async (req, res) => {
  try {
    const { friendId } = req.body;
    const userId = req.user._id;

    await Friend.findOneAndDelete({
      $or: [
        { requesterId: friendId, recieverId: userId },
        { requesterId: userId, recieverId: friendId },
      ],
    });

    res.status(200).json({ message: "Request rejected" });
  } catch (error) {
    console.log("Error in rejectRequest controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete friend
export const deleteFriend = async (req, res) => {
  try {
    const friendId = req.params.friendId;
    const userId = req.user._id;

    await Friend.findOneAndDelete({
      $or: [
        { requesterId: userId, recieverId: friendId },
        { requesterId: friendId, recieverId: userId },
      ],
      status: true,
    });

    res.status(200).json({ message: "Friend deleted" });
  } catch (error) {
    console.log("Error in deleteFriend controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
