import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/actions/chatActions";
import { X } from "lucide-react";

const ChatHeader = () => {
    const { selectedUser } = useSelector((state) => state.chat);
    const { onlineUsers } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

  return (
    <div className="p-2.5 border-b border-base-300">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="avatar">
                    <div className="size-10 rounded-full relative">
                        <img src={selectedUser.profilePic || "avatar.png"} alt={selectedUser.fullName} />
                    </div>
                </div>

                {/* User Info */}
                <div>
                    <h3 className="font-medium">{selectedUser.fullName}</h3>
                    <p className="text-sm text-base-content/70">
                        {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                    </p>
                </div>
            </div>

            {/* Close button */}
            <button 
                onClick={() => dispatch(setSelectedUser(null))}>
                    <X />
                </button>
        </div>
    </div>
  )
}

export default ChatHeader