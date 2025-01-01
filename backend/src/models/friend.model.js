import mongoose from "mongoose";

// The friend model is used to store the friend request between two users.
// The requesterId is the user who sent the friend request.
// The recieverId is the user who received the friend request.
// The status is used to store whether the friend request is accepted or not.(if true then both users are friends, if false then the request is pending)
// If the friend request is denied then the record is deleted from the database. 

const friendSchema = new mongoose.Schema({

    requesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    status: {
        type: Boolean,
        default: false,
    },
});

const Friend = mongoose.model("Friend", friendSchema);

export default Friend; 