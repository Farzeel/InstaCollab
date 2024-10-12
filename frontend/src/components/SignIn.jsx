import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {Link, useNavigate } from "react-router-dom"
import { login } from "../../APIs/users/user";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../../store/authSlice";

const SignInPage = () => {
  const {user} = useSelector(store=>store.auth)
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch  = useDispatch()
  const navigate  =useNavigate()


  const { isAuthenticated } = useSelector((store) => store.auth);

  useEffect(() => {
console.log("useefect sign in")
    if (isAuthenticated) {
         console.log("navigate")
        navigate("/");
      }
  }, [navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
    
        setIsLoading(true);
        // Simulating API call
        const data = await login({email,password})
        if(data.success){
          dispatch(setAuthUser({user:data.userInfo, isAuthenticated:data.isLoggedIn}))
          navigate("/")
        }  
    } catch (error) {
      console.log(error);
    } finally{
      setIsLoading(false)
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={`mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out`}
              placeholder="Enter your email"

            />
            {/* {errors.email && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {errors.email}
              </p>
            )} */}
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={`mt-1 block w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out`}
              placeholder="Enter your password"
    
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-400" /> : <FaEye className="h-5 w-5 text-gray-400" />}
            </button>
        
          </div>
          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
              disabled={( isLoading || !email || !password )}
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3" />
              ) : null}
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to={"/signup"} className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
