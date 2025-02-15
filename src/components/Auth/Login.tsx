import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { loginUser } from "../../api/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      username,
      password,
    };
    try {
      loginUser(formData);
      navigate("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 w-full">
      <div className="w-full max-w-1/3 rounded-xl shadow-lg p-8 space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center uppercase">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="loginUsername"
              className="block text-sm font-semibold  "
            >
              Username
            </label>
            <input
              type="text"
              id="loginUsername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#1f1c2c]  transition-all duration-200 outline-none  "
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label
                htmlFor="loginPassword"
                className="block text-sm font-semibold  "
              >
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-[#1f1c2c] focus:outline-none focus:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="loginPassword"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-[#1f1c2c]  transition-all duration-200 outline-none   pr-12"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1f1c2c] transition-colors"
                onClick={togglePassword}
              >
                {showPassword ? (
                  <EyeOffIcon size={20} />
                ) : (
                  <EyeIcon size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1f1c2c] uppercase text-white font-semibold px-4 py-3 rounded-lg  transition-all duration-200"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600">
            New to todo?{" "}
            <Link
              to="/register"
              className="font-semibold  focus:outline-none focus:underline"
            >
              Register Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
