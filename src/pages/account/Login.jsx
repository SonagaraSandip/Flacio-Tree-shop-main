import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import Footer from "../Footer";
import ScrollToTop from "../ScrollToTop";

const Login = () => {
  const navigate = useNavigate();
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

    toast.success("Your account has been created successfully!");

    setEmail("");
    setPassword("");
  };
  return (
    <div className="container mx-auto mt-[150px]">
      <div className="flex flex-col gap-4 h-full items-center mb-28 max-w-5xl mx-auto ">
        <h1 className="text-6xl font-librebaskerville my-12">Account</h1>
        <div className="flex justify-between items-center w-full gap-12">
          <div className="flex flex-col w-full items-center justify-center mx-4 gap-6">
            <h2 className="text-xl font-librebaskerville mt-12 items-start self-start text-black">
              SIGN IN
            </h2>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="text-black w-full "
            >
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
              <button className="text-xs font-poppins mt-4 text-zinc-700 hover:text-zinc-950 cursor-pointer border-b border-zinc-500">
                Lost your password?
              </button>
              <button className="w-full bg-zinc-800 text-white text-sm font-poppins py-2 mt-6 mb-6 hover:bg-green-950">
                SIGN IN
              </button>
            </form>
          </div>

          {/* right side */}
          <div className="flex flex-col w-full self-center gap-8">
            <h1 className="text-2xl text-black  font-librebaskerville">
              New customer?
            </h1>
            <p className="font-poppins text-md text-gray-500 ">
              Sign up for early Sale access plus tailored new arrivals, trends
              and promotions. To opt out, click unsubscribe in our emails.
            </p>
            <button
              onClick={() => navigate("/account/register")}
              className=" bg-zinc-800 self-start px-8 text-white text-sm font-poppins py-2 hover:bg-green-950"
            >
              REGISTER
            </button>
          </div>
        </div>
      </div>

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Login;
