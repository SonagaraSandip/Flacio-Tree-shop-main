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
    const res = login(email , password);
    if(res.error) {
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
    <div className="container mx-auto pt-[150px]">
      <div className="flex flex-col gap-4 h-full items-center mb-28 max-w-5xl mx-auto ">
        <h1 className="text-6xl font-librebaskerville my-12">Account</h1>
        <div className="flex justify-between items-center w-full gap-12">
          <div className="flex flex-col w-full items-center justify-center mx-4 gap-6">
            <h2 className="text-xl font-librebaskerville mt-12 items-start self-start text-black">
              {resetPassword ? "Reset your Password" : "SIGN IN"}
            </h2>

            {resetPassword ? (
              <div className="flex flex-col self-start gap-2">
                {submitEmail && (
                  <p className="bg-cyan-50 text-green-700 font-poppins text-sm self-start px-4 py-4">
                    We've sent you an email with a link to update your password.
                  </p>
                )}

                <p className="text-gray-500 font-poppins text-sm">
                  We will send you an email to reset your password
                </p>

                <form
                  onSubmit={handleResetPassword}
                  noValidate
                  className="text-black flex flex-col mt-2"
                >
                  <input
                    type="email"
                    alt="email"
                    placeholder="Email*"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="border border-gray-400 font-poppins text-sm w-full pl-4 p-2"
                    style={{ outline: "none" }}
                  />

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      onClick={handleResetPassword}
                      className="self-start w-1/2 bg-zinc-900 text-white text-sm font-poppins mt-4 py-3 hover:bg-green-950"
                    >
                      SUBMIT
                    </button>
                    <button
                      onClick={() => {
                        setResetPassword(false);
                        setResetEmail("");
                      }}
                      className="self-start w-1/2 border border-gray-400 text-black text-sm font-poppins mt-4 py-3 "
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
                <button
                  onClick={(e) => {
                    setResetPassword(true);
                    e.preventDefault();
                  }}
                  className="text-xs font-poppins mt-4 text-zinc-700 hover:text-zinc-950 cursor-pointer border-b border-zinc-500"
                >
                  Lost your password?
                </button>
                <button className="w-full bg-zinc-800 text-white text-sm font-poppins py-2 mt-6 mb-6 hover:bg-green-950">
                  SIGN IN
                </button>
              </form>
            )}
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
