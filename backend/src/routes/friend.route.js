import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  acceptRequest,
  deleteFriend,
  getFriends,
  getPendingRequests,
  getRequests,
  rejectRequest,
  sendRequest,
} from "../controllers/friend.controller.js";

const router = express.Router();

router.get("/", protectRoute, getFriends); // get all friends

router.post("/sendRequest/:id", protectRoute, sendRequest); // send friend request

router.get("/getRequests", protectRoute, getRequests); // get all friend requests

router.get("/getPendingRequests", protectRoute, getPendingRequests); // get all pending friend requests

router.post("/acceptRequest/", protectRoute, acceptRequest); // accept friend request

router.post("/rejectRequest/", protectRoute, rejectRequest); // reject friend request

router.delete("/deleteFriend/:friendId", protectRoute, deleteFriend); // delete friend

export default router;
