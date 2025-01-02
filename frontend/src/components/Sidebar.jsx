import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, setSelectedUser } from "../redux/actions/chatActions";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { UserRoundPlus, Users, X, Ellipsis } from "lucide-react";
import { getFriends, sendFriendRequest, removeFriend } from "../redux/actions/friendActions";

const Sidebar = () => {
  const { selectedUser, isUsersLoading, users } = useSelector((state) => state.chat);
  const { friendsList } = useSelector((state) => state.friends);
  const { onlineUsers } = useSelector((state) => state.auth);

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [localFriendsList, setLocalFriendsList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriends());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    setLocalFriendsList(friendsList);
  },[friendsList])

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearch = () => {
    setFoundUsers(
      users.filter(
        (user) =>
          !friendsList.some((friend) => friend.id === user.id) && // Exclude users already on the friends list
          user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) // Match the search term
      )
    );
  };

  const handleAddFriend = (userId) => {
    dispatch(sendFriendRequest(userId));
  };

  // TODO/FIXME: make this work from fist click (dispatch get friends only updates frontend after second click)
  const handleUnfriend = (userId) => {
    setLocalFriendsList(localFriendsList.filter((friend) => friend._id !== userId));
    dispatch(removeFriend(userId)).then(() =>{
      dispatch(getFriends());
    })
  }

  const toggleDropdown = (userId) => {
    setActiveDropdown((prev) => (prev === userId ? null : userId));
  }

  const filteredUsers = showOnlineOnly
    ? friendsList.filter((user) => onlineUsers.includes(user._id))
    : friendsList;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="flex flex-col border-b border-base-300 w-full p-5">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6" />
            <span className="font-medium hidden lg:block">Friends</span>
          </div>

          <div>
            <UserRoundPlus
              className="w-6 h-6 cursor-pointer"
              onClick={toggleModal}
            />
          </div>
        </div>

        <div className="my-3 hideen lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={() => setShowOnlineOnly(!showOnlineOnly)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show Online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-base-300 rounded-lg p-6 w-1/3 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add a New Friend</h2>
              <X
                className="w-6 h-6 cursor-pointer hover:text-white"
                onClick={toggleModal}
              />
            </div>
            {/* Top Section: Search Bar */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900"
              >
                Search
              </button>
            </div>

            {/* Bottom Section: List of Found Users */}
            <div className="flex-1 overflow-y-auto">
              {foundUsers.length > 0 ? (
                foundUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center gap-3 p-2 hover:bg-base-100 rounded-lg"
                  >
                    <img
                      src={user.profilePic || "/avatar.png"}
                      alt={user.fullName}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium">{user.fullName}</span>
                    <button
                      onClick={() => handleAddFriend(user._id)}
                      className="ml-auto px-3 py-1 bg-green-800 text-white text-sm rounded-lg hover:bg-green-900"
                    >
                      Add
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No users found. Try searching for a username.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
         <div key={user._id} className="relative group">
         <button
           onClick={() => dispatch(setSelectedUser(user))}
           className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
             selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""
           }`}
         >
           <div className="relative mx-auto lg:mx-0">
             <img
               src={user.profilePic || "/avatar.png"}
               alt={user.name}
               className="size-12 object-cover rounded-full"
             />
             {onlineUsers.includes(user._id) && (
               <span
                 className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 
                                     rounded-full ring-2 ring-zinc-900"
               />
             )}
           </div>
           <div className="hidden lg:block text-left min-w-0">
             <div className="font-medium truncate">{user.fullName}</div>
             <div className="text-sm text-zinc-400">
               {onlineUsers.includes(user._id) ? "Online" : "Offline"}
             </div>
           </div>
         </button>

         {/* Dropdown Toggle Button */}
         <button
           onClick={() => toggleDropdown(user._id)}
           className="absolute top-4 right-3 text-gray-500 hover:text-white lg:group-hover:visible"
         >
           <Ellipsis className="size-8"/>
         </button>

         {/* Dropdown Menu */}
         {activeDropdown === user._id && (
           <div className="absolute top-10 right-3 bg-gray-400 border border-gray-300 rounded-md shadow-lg z-10">
             <button
               onClick={() => handleUnfriend(user._id)}
               className="block w-full px-4 py-2 text-left font-bold text-red-500 hover:bg-red-50"
             >
               Unfriend
             </button>
           </div>
         )}
       </div>

        ))}
        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No friends found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
