import { Link } from "react-router-dom";
import { House, LogOut, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";

const Navbar = () => {
  const { authUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

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
