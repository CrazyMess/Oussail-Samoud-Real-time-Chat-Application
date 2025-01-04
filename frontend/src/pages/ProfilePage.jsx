import { Camera, Mail, User } from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/actions/authActions";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile } = useSelector((state) => state.auth);
  const [selectedImg, setSelectedImg] = useState(null);
  const [formData, setFormData] = useState({
    fullName: authUser.fullName || "",
    profilePic: authUser.profilePic || "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log("file size: ", file.size);

    const maxSize = 1024 * 1024 * 2; // 2MB
    // check file size
    if (file.size > maxSize) {
      toast.error("Image size must be less than 2MB");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file); // convert image to base64 string

    reader.onloadend = () => {
      const base64Img = reader.result;
      setSelectedImg(base64Img);
      setFormData({
        ...formData,
        profilePic: base64Img,
      });
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      fullName: formData.fullName || authUser.fullName,
      profilePic: formData.profilePic || authUser.profilePic,
    };
   
    dispatch(updateProfile(updatedData));
    
  };

 

  return (
    <div className="h-screen pt-20">
    <div className="max-w-2xl mx-auto p-4 py-8">
      <div className="bg-base-300 rounded-2xl p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="mt-2">Your profile information</p>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Profile Form */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <label
                htmlFor="fullName"
                className="text-sm text-zinc-400 flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="px-4 py-2.5 bg-base-200 rounded-lg border w-full"
              />
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-3 bg-base-200 rounded-lg border">
                {authUser.email}
              </p>
            </div>
          </div>

          <button
            type="submit"
            className={`${
              isUpdatingProfile
                ? "bg-gray-300 text-gray-800 cursor-not-allowed"
                : "bg-green-700 text-white hover:text-green-700 hover:duration-500 "
            } mt-6 mb-0 p-3 rounded-lg w-full text-center font-medium`}
          >
            {isUpdatingProfile ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {/* Account Information */}
        <div className="my-6 bg-base-300 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">Account Information</h2>
          <div className="flex items-center justify-between py-2 border-b border-zinc-700">
            <span>Member Since</span>
            <span>{authUser.createdAt?.split("T")[0]}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span>Account Status</span>
            <span className="text-green-500">Active</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ProfilePage;
