import React, { useEffect, useRef, useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaVenusMars, FaBirthdayCake } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../APIs/users/user";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../../store/authSlice";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    gender: "",
    birthDay: "",
    birthMonth: "",
    birthYear: ""
  });
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const backendErr = useRef()

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const { isAuthenticated } = useSelector((store) => store.auth);

  useEffect(() => {

    if (isAuthenticated) {
         
        navigate("/");
      }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };
    switch (name) {
      case "username":
        if (!value) newErrors.username = "Username is required";
        else if (value.length < 3) newErrors.username = "Username must be at least 3 characters long";
        else delete newErrors.username;
        break;
      case "email":
        if (!value) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) newErrors.email = "Email is invalid";
        else delete newErrors.email;
        break;
      case "password":
        if (!value) newErrors.password = "Password is required";
        else if (value.length < 6) newErrors.password = "Password must be at least 6 characters long";
        else delete newErrors.password;
        break;
      case "fullName":
        if (!value) newErrors.fullName = "Full name is required";
        else delete newErrors.fullName;
        break;
      case "gender":
        if (!value) newErrors.gender = "Gender is required";
        else delete newErrors.gender;
        break;
      case "birthDay":
      case "birthMonth":
      case "birthYear":
        if (!formData.birthDay || !formData.birthMonth || !formData.birthYear) {
          newErrors.birthday = "Complete birthday is required";
        } else {
          delete newErrors.birthday;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleSubmit =async (e) => {
   try {
     e.preventDefault();
    
       setIsLoading(true);
       const data = await signUp(formData)
       if(data.success){
         dispatch(setAuthUser({user:data.newUser, isAuthenticated:false}))
         navigate("/login")
       }else{
         setBackendError(data)
       }

   } catch (error) {
    console.log("catch", error)

   }finally{
    setIsLoading(false)
    clearBackendErrorAfterDelay()
   }
    
   const clearBackendErrorAfterDelay = () => {
    setTimeout(() => {
      setBackendError("");
    }, 3000);
  };

  };

  const generateOptions = (start, end) => {
    let options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r  from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        <div className="relative" >
       
        {backendError && <p className="text-red-500  text-xs mt-1 absolute bottom-0">{backendError}</p>}
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative ">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.username ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200`}
              aria-label="Username"
            />
           
             {errors.username &&<p className="text-red-500  text-xs mt-1 absolute top-9">{errors.username}</p>}
          
          </div>
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200`}
              aria-label="Email"
            />
            {errors.email && <p className="text-red-500  text-xs mt-1 absolute top-9">{errors.email}</p>}
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200`}
              aria-label="Password"
            />
            {errors.password && <p className="text-red-500  text-xs mt-1 absolute top-9">{errors.password}</p>}
          </div>
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200`}
              aria-label="Full Name"
            />
            {errors.fullName && <p className="text-red-500  text-xs mt-1 absolute top-9">{errors.fullName}</p>}
          </div>
          <div className="relative">
            <FaVenusMars className="absolute top-3 left-3 text-gray-400" />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.gender ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200 appearance-none`}
              aria-label="Gender"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p className="text-red-500  text-xs mt-1 absolute top-9">{errors.gender}</p>}
          </div>
          <div className="relative">
            <FaBirthdayCake className="absolute top-3 left-3 text-gray-400" />
            <div className="flex space-x-2">
              <select
                name="birthDay"
                value={formData.birthDay}
                onChange={handleChange}
                className={`w-1/3 pl-10 pr-3 py-2 rounded-lg border ${errors.birthday ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200 appearance-none`}
                aria-label="Birth Day"
              >
                <option value="">Day</option>
                {generateOptions(1, 31)}
              </select>
              <select
                name="birthMonth"
                value={formData.birthMonth}
                onChange={handleChange}
                className={`w-1/3 pl-3 pr-3 py-2 rounded-lg border ${errors.birthday ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200 appearance-none`}
                aria-label="Birth Month"
              >
                <option value="">Month</option>
                {months.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                name="birthYear"
                value={formData.birthYear}
                onChange={handleChange}
                className={`w-1/3 pl-3 pr-3 py-2 rounded-lg border ${errors.birthday ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200 appearance-none`}
                aria-label="Birth Year"
              >
                <option value="">Year</option>
                {generateOptions(1900, new Date().getFullYear())}
              </select>
            </div>
            {errors.birthday && <p className="text-red-500  text-xs mt-1 absolute top-9">{errors.birthday}</p>}
          </div>
          <button
            type="submit"
            className={`w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            disabled={isLoading || Object.keys(errors).length !== 0 || !formData.username || !formData.email || !formData.gender || !formData.password || !formData.fullName || !formData.birthDay || !formData.birthMonth || !formData.birthYear}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing Up...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to={"/login"} className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

