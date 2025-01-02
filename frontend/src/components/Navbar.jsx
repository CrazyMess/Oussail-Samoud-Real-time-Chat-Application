import { Link } from "react-router-dom";
import { Bell, House, LogOut, User, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { useEffect, useState } from "react";
import { acceptFriendRequest, getFriends, getRequests, rejectFriendRequest } from "../redux/actions/friendActions";

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const { authUser } = useSelector((state) => state.auth);
  const { requestList } = useSelector((state) => state.friends);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequests());
  }, [dispatch]);

  // TODO/FIXME: make this work from fist click (dispatch getFriends and getRequests only updates frontend after second click)
  const handleAcceptRequest = (id) => {
    dispatch(acceptFriendRequest(id));
    dispatch(getRequests());
    dispatch(getFriends());
  }

  const handleDenyRequest = (id) => {
    dispatch(rejectFriendRequest(id));
    dispatch(getRequests());
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {/* Sidebar */}
      <div className="h-screen absolute flex overflow-hidden">
        <aside
          className="h-full w-16 flex flex-col space-y-10 items-center justify-center 
      relative bg-gray-800 text-white"
        >
          {/* home */}
          <div
            className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800
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
                className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800
               hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white"
              >
                <Bell
                  size={28}
                  strokeWidth={2}
                  onClick={() => setShowNotifications(!showNotifications)}
                />
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

      {/* Request list modal */}
      {showNotifications && (
        <div className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-base-300 rounded-lg p-6 w-1/3 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Friend Requests</h2>
              <X
                className="w-6 h-6 cursor-pointer hover:text-white"
                onClick={() => setShowNotifications(false)}
              />
            </div>

            {/* Bottom Section: List of Found Users */}
            <div className="flex-1 overflow-y-auto">
              {requestList.length > 0 ? (
                <div>
                  {requestList.map((request) => (
                    <div
                      key={request._id}
                      className="flex justify-between items-center p-3 px-8 bg-base-100 rounded-md shadow-md"
                    >
                      {/* user info */}
                      <div className="flex items-center space-x-4">
                        <img
                          src={request.profilePic || "/avatar.png"}
                          alt={request.fullName}
                          className="h-14 w-14 rounded-full object-cover border-2 border-gray-300"
                        />
                        <span className="font-bold text-lg">
                          {request.fullName}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex  space-x-2">
                        <button
                          onClick={() => handleAcceptRequest(request._id)}
                          className="bg-green-800 text-white px-3 py-1 rounded-md hover:bg-green-900 transition duration-300"
                        >
                          ✓ Accept
                        </button>
                        <button
                          onClick={() => handleDenyRequest(request._id)}
                          className="bg-red-800 text-white px-3 py-1 rounded-md hover:bg-red-900 transition duration-300"
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

      <div className="w-full flex flex-col justify-between">
        {/* Header */}
        <header className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-gray-800">
          {authUser ? (
            <div className="flex flex-shrink-0 items-center space-x-4 text-white">
              <div className="flex flex-col items-end">
                <div className="text-md font-bold">{authUser.fullName}</div>
              </div>

              <div className="h-10 w-10 rounded-full bg-gray-200 border-2 border-blue-400">
                <img
                  src={authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="rounded-full object-cover "
                />
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center mx-4 p-3 px-5 text-white text-lg font-bold
               bg-slate-600 rounded-xl hover:text-gray-800 hover:bg-white
               hover:duration-300 hover:ease-linear focus:bg-white"
            >
              Login
            </Link>
          )}
        </header>
      </div>
    </div>
  );
};

export default Navbar;
