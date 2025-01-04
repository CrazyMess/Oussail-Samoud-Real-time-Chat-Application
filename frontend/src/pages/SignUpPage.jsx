import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/actions/authActions";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isSigningUp } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Email is invalid");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters long");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    if (!success)  dispatch(signup(formData));
  };

  return (
    <div className="bg-gray-700 relative">
    <div className="absolute inset-0 bg-[url('/topography.svg')] bg-cover bg-center opacity-20"></div>
    
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="relative z-10 w-full max-w-lg sm:max-w-xl bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col items-center space-y-6 text-gray-300">
          <h1 className="text-white text-3xl sm:text-4xl">Create Account</h1>
          <p className="text-base-content/60 text-lg text-center">
            Get started with your free account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 text-white"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 text-white"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 text-white"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full"
              disabled={isSigningUp}>
              {isSigningUp 
                ? (
                  <>
                    <Loader2 className="animate-spin size-5" />
                    Loading...
                  </>
                ) : (
                  "Create Account"
                )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary cursor-pointer">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SignUpPage;


