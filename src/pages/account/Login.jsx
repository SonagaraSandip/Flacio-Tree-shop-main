import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import Footer from "../Footer";
import ScrollToTop from "../ScrollToTop";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [submitEmail, setSubmitEmail] = useState(false);

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

    // validation logic
    const res = login(email, password);
    if (res.error) {
      if (res.error === "Create an Account!") {
        toast.error("Please create an account first!");
        navigate("/account/register");
        return;
      }
      toast.error(res.error);
      return;
    }
    toast.success("Logged in successfully!");
    navigate("/");

    setEmail("");
    setPassword("");
  };

  //handle reset password
  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!resetEmail.trim()) {
      toast.error("Please enter a email address");
      return;
    }
    if (!validateEmail(resetEmail)) {
      toast.warn("Please enter a valid email address");
      return;
    }

    toast.success(
      "We've sent you an email with a link to update your password."
    );
    setSubmitEmail(true);
    setTimeout(() => {
      setSubmitEmail(false);
      setResetEmail("");
    }, 3000);
  };
  return (
    <div className=" mx-auto pt-20 sm:pt-24 lg:pt-[150px] ">
      <div className="flex flex-col gap-4 h-full items-center mb-16 sm:mb-20 lg:mb-28 max-w-5xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-librebaskerville my-8 sm:my-12 text-center sm:text-left">
          Account
        </h1>
        <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-8 lg:gap-12">
          <div className="flex flex-col w-full lg:w-1/2 items-center justify-center gap-4 lg:gap-6">
            <h2 className="text-lg sm:text-xl font-librebaskerville mt-4 lg:mt-12 items-start self-start text-black w-full">
              {resetPassword ? "Reset your Password" : "SIGN IN"}
            </h2>

            {resetPassword ? (
              <div className="flex flex-col self-start gap-2 w-full">
                {submitEmail && (
                  <p className="bg-cyan-50 text-green-700 font-poppins text-xs sm:text-sm self-start px-3 sm:px-4 py-3 sm:py-4 rounded">
                    We've sent you an email with a link to update your password.
                  </p>
                )}

                <p className="text-gray-500 font-poppins text-xs sm:text-sm">
                  We will send you an email to reset your password
                </p>

                <form
                  onSubmit={handleResetPassword}
                  noValidate
                  className="text-black flex flex-col mt-2 w-full"
                >
                  <input
                    type="email"
                    alt="email"
                    placeholder="Email*"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="border border-gray-400 font-poppins text-sm w-full pl-3 sm:pl-4 p-2 sm:p-3"
                    style={{ outline: "none" }}
                  />

                  <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 mt-4">
                    <button
                      type="submit"
                      onClick={handleResetPassword}
                      className=" w-full sm:w-1/2 bg-zinc-900 text-white text-sm font-poppins py-3 hover:bg-green-950  transition-colors duration-300"
                    >
                      SUBMIT
                    </button>
                    <button
                      onClick={() => {
                        setResetPassword(false);
                        setResetEmail("");
                      }}
                      className="w-full sm:w-1/2 border border-gray-400 text-black text-sm font-poppins py-3 "
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
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
                  className="border border-gray-400 font-poppins text-sm w-full pl-3 sm:pl-4 p-2 sm:p-3 mb-3 sm:mb-4"
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
                    className="border border-gray-400 font-poppins text-sm w-full pl-3 sm:pl-4 p-2 sm:p-3"
                    style={{ outline: "none" }}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex items-center justify-center "
                  >
                    {showPassword ? (
                      <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 cursor-pointer hover:text-black" />
                    ) : (
                      <EyeOff className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 cursor-pointer hover:text-black" />
                    )}
                  </span>
                </div>
                <button
                type="button"
                  onClick={(e) => {
                    setResetPassword(true);
                    e.preventDefault();
                  }}
                  className="text-xs font-poppins mt-3 sm:mt-4 text-zinc-700 hover:text-zinc-950 cursor-pointer border-b border-zinc-500 hover:border-zinc-700 transition-colors duration-300"
                >
                  Lost your password?
                </button>
                <button type="submit" className="w-full bg-zinc-800 text-white text-sm font-poppins py-3 sm:py-4 my-4 sm:my-6 hover:bg-green-950">
                  SIGN IN
                </button>
              </form>
            )}
          </div>

          {/* right side */}
          <div className="flex flex-col w-full lg:w-1/2 self-center gap-4 sm:gap-6 lg:gap-8 p-4 lg:p-0 bg-gray-50 lg:bg-transparent rounded-lg lg:rounded-none">
            <h1 className="text-xl sm:text-2xl text-black text-center font-librebaskerville lg:text-left">
              New customer?
            </h1>
            <p className="font-poppins text-sm sm:text-md text-gray-500 text-center lg:text-left ">
              Sign up for early Sale access plus tailored new arrivals, trends
              and promotions. To opt out, click unsubscribe in our emails.
            </p>
            <button
              onClick={() => navigate("/account/register")}
              className="w-full sm:w-auto bg-zinc-800 px-6 sm:px-8 text-white text-sm font-poppins py-2 sm:py-3 hover:bg-green-950 transition-colors duration-300 self-center lg:self-start"
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
