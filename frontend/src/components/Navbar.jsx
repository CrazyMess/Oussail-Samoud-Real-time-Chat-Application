import { Link } from "react-router-dom";
import { Bell, House, LogOut, User, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { useEffect, useState } from "react";
import {
  acceptFriendRequest,
  getFriends,
  getRequests,
  rejectFriendRequest,
} from "../redux/actions/friendActions";

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [localRequestList, setLocalRequestList] = useState([]);

  const { authUser } = useSelector((state) => state.auth);
  const { requestList } = useSelector((state) => state.friends);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequests());
  }, [dispatch]);

  useEffect(() => {
    setLocalRequestList(requestList);
  }, [requestList]);

  const handleAcceptRequest = (id) => {
    setLocalRequestList(
      localRequestList.filter((request) => request._id !== id)
    );
    dispatch(acceptFriendRequest(id)).then(() => {
      dispatch(getRequests());
      dispatch(getFriends());
    });
  };

  const handleDenyRequest = (id) => {
    setLocalRequestList(
      localRequestList.filter((request) => request._id !== id)
    );
    dispatch(rejectFriendRequest(id)).then(() => {
      dispatch(getRequests());
    });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`absolute h-screen z-40 bg-gray-800 text-white ${
          isSidebarOpen ? "block" : "hidden"
        } lg:block`}
      >
        <aside className="h-full w-16 lg:w-20 flex flex-col items-center space-y-10 justify-center ">
          {/* home */}
          <div
            className="h-10 w-10 lg:w-20 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800
        hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
          >
            <Link to="/">
              <House size={28} strokeWidth={2} />
            </Link>
          </div>
          {/* Profile */}
          {authUser && (
            <>
              <div
                className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800
               hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
              >
                <Link to="/profile">
                  <User size={28} strokeWidth={2} />
                </Link>
              </div>

              {/* Friend Requests */}
              <div
                className="relative h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800
               hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
              >
                <Bell
                  size={28}
                  strokeWidth={2}
                  onClick={() => setShowNotifications(!showNotifications)}
                />
                {localRequestList.length > 0 && (
                  <span className="absolute top-0 right-0 bg-white text-gray-800 border-2 border-gray-800 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {localRequestList.length}
                  </span>
                )}
              </div>

              {/* Logout */}
              <div
                className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer bg-red-800 hover:text-gray-800
               hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
              >
                <button onClick={handleLogout}>
                  <LogOut size={28} strokeWidth={2} />
                </button>
              </div>
            </>
          )}
        </aside>
      </div>
      {/* Sidebar Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-full"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X size={24} strokeWidth={2} />
        ) : (
          <House size={24} strokeWidth={2} />
        )}
      </button>

      {/*  Friend Requests Modal  */}
      {showNotifications && (
        <div className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-base-300 rounded-lg p-6 w-11/12 sm:w-2/3 lg:w-1/3 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Friend Requests</h2>
              <X
                className="w-6 h-6 cursor-pointer hover:text-white"
                onClick={() => setShowNotifications(false)}
              />
            </div>

            {/* Bottom Section: List of Found Users */}
            <div className="flex-1 overflow-y-auto">
              {localRequestList.length > 0 ? (
                <div>
                  {localRequestList.map((request) => (
                    <div
                      key={request._id}
                      className="flex justify-between items-center p-3 px-8 bg-base-100 rounded-md shadow-md mb-2"
                    >
                      {/* user info */}
                      <div className="flex items-center space-x-4">
                        <img
                          src={request.profilePic || "/avatar.png"}
                          alt={request.fullName}
                          className="h-10 w-10 sm:h-14 sm:w-14 rounded-full object-cover border-2 border-gray-300"
                        />
                        <span className="font-bold text-sm sm:text-lg">
                          {request.fullName}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAcceptRequest(request._id)}
                          className="bg-green-800 text-white px-2 sm:px-3 py-1 rounded-md hover:bg-green-900 transition duration-300"
                        >
                          ✓ Accept
                        </button>
                        <button
                          onClick={() => handleDenyRequest(request._id)}
                          className="bg-red-800 text-white px-2 sm:px-3 py-1 rounded-md hover:bg-red-900 transition duration-300"
                        >
                          ✕ Deny
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  You have no friend requests
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
