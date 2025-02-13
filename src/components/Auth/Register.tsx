import React, { FormEvent, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/api";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const formData = {
      username: username,
      name: nickname,
      email: email,
      password: password,
      re_password: confirmPassword,
    };

    try {
      registerUser(formData);
      setError("");
      navigate("/login");
      console.table(formData);
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 w-full">
      <div className="w-full max-w-1/3 rounded-xl shadow-lg p-8 space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center uppercase">
          Register
        </h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="registerUsername"
              className="block text-sm font-semibold"
            >
              Username
            </label>
            <input
              type="text"
              id="registerUsername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#1f1c2c] transition-all duration-200 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="registerEmail"
              className="block text-sm font-semibold"
            >
              Email address
            </label>
            <input
              type="email"
              id="registerEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#1f1c2c] transition-all duration-200 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="registerName"
              className="block text-sm font-semibold"
            >
              Nickname
            </label>
            <input
              type="text"
              id="registerName"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#1f1c2c] transition-all duration-200 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="registerPassword"
              className="block text-sm font-semibold"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="registerPassword"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-[#1f1c2c] transition-all duration-200 outline-none pr-12"
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

          <div className="space-y-2">
            <label
              htmlFor="registerConfirmPassword"
              className="block text-sm font-semibold"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="registerConfirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-[#1f1c2c] transition-all duration-200 outline-none pr-12"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1f1c2c] transition-colors"
                onClick={toggleConfirmPassword}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon size={20} />
                ) : (
                  <EyeIcon size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1f1c2c] uppercase text-white font-semibold px-4 py-3 rounded-lg transition-all duration-200"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-600">
            Already a user?{" "}
            <Link
              to="/login"
              className="font-semibold focus:outline-none focus:underline"
            >
              Login Instead
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
