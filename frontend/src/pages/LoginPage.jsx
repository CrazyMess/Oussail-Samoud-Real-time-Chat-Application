import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authActions";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLoggingIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(formData));
  };

  return (
    <div
      className="bg-gray-700 min-h-screen flex items-center justify-center px-4 relative 
                 bg-[url('/topography.svg')] bg-cover bg-center bg-repeat"
    >
      {/* Overlay to dim the background */}
      <div className="absolute inset-0 bg-gray-700/80"></div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-screen-sm bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg">
        <div className="text-center space-y-4">
          {/* Heading */}
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold">
            Welcome Back
          </h1>
          <p className="text-base-content/60 text-sm sm:text-base">
            Sign in to your account
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-300 font-medium">Email</span>
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

          {/* Password Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-300 font-medium">Password</span>
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

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="animate-spin size-5" />
                Loading...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Link to Sign-Up */}
        <div className="text-center mt-4">
          <p className="text-base-content/60 text-sm sm:text-base">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage