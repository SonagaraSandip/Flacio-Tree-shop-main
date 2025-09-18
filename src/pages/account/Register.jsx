import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import Footer from "../Footer";
import ScrollToTop from "../ScrollToTop";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    // A simple regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName.trim()) {
      toast.error("Please enter your first name");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      toast.warn("Please enter a valid email address");
      return;
    }

    if (!password.trim()) {
      toast.error("Please enter your password");
      return;
    }

    // validation login
    const res = register(firstName, lastName, email, password);
    if(res.error) {
      toast.error(res.error);
      return;
    }

    toast.success("Your account has been created successfully!");
    navigate("/account/login");

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="container mx-auto mt-[150px]">
      <div className="flex flex-col gap-4 h-full items-center mb-28 max-w-lg mx-auto">
        <h1 className="text-6xl font-librebaskerville my-12">Create Account</h1>
        <form onSubmit={handleSubmit} noValidate className="text-black w-full">
          <input
            type="text"
            alt="first name"
            placeholder="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-gray-400 font-poppins mb-4 text-sm w-full pl-4 p-2"
            style={{ outline: "none" }}
          />
          <input
            type="text"
            alt="last name"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-400 font-poppins mb-4 text-sm w-full pl-4 p-2"
            style={{ outline: "none" }}
          />
          <input
            type="email"
            alt="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 font-poppins text-sm w-full pl-4 p-2"
            style={{ outline: "none" }}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              alt="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-400 font-poppins text-sm w-full pl-4 p-2 mt-4"
              style={{ outline: "none" }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="flex items-center justify-center "
            >
              {showPassword ? (
                <Eye className="absolute right-3 top-7 w-5 h-5 text-gray-400 cursor-pointer hover:text-black" />
              ) : (
                <EyeOff className="absolute right-3 top-7 w-5 h-5 text-gray-400 cursor-pointer hover:text-black" />
              )}
            </span>
          </div>
          <p className="text-gray-500  font-poppins text-sm text-center my-4">
            Sign up for early Sale access plus tailored new arrivals, trends and
            promotions. To opt out, click unsubscribe in our emails.
          </p>

          <button className="w-full bg-zinc-800 text-white text-sm font-poppins py-2 mt-2 mb-6 hover:bg-green-950">
            REGISTER
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/account/login");
            }}
            className="w-full border border-zinc-700 text-sm font-poppins py-2 hover:bg-green-950 hover:text-white"
          >
            SIGN IN
          </button>
        </form>
      </div>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Register;
