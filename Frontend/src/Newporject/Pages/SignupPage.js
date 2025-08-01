import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext.js';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [otpField, setOtpField] = useState(false)
  const [otpToken , setOtpToken] = useState(null)
  // signUp
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes (in seconds)
  const password = watch('password');
  const [otp , setOtp] = useState(null)

  const [otpValues, setOtpValues] = useState(new Array(4).fill(""));
  const inputRefs = useRef([]);
  
  const changeHandler = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const updated = otpValues.map((item, i) => (i === index ? value : item));
    setOtpValues(updated);

    if (index === otpValues.length - 1 && value) {

      const isOtpComplete = updated.every(val => val !== "");
      if (isOtpComplete) {
        setOtp(updated.join("")); 
      }
    }

    if (value && index < otpValues.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otpValues[index]) {
        const newOtp = [...otpValues];
        newOtp[index] = "";
        setOtpValues(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "Enter"){
        const isOtpComplete = otpValues.every((val) => val !== "");

        if(isOtpComplete){
          const finalOtp = otpValues.join("");
          setOtp(finalOtp);
          verifyEmail(finalOtp);
        } else {
          toast.error("Please enter the complete OTP.");
        }
    }
  }

  const handlePaste = (e) => {
  const paste = e.clipboardData.getData('text').slice(0, otpValues.length);
    if (/^\d+$/.test(paste)) {
      const newOtp = paste.split('');
      setOtpValues(newOtp);
      inputRefs.current[paste.length - 1]?.focus();
    }
    e.preventDefault();
  };

  const maskEmail = (email) => {
  if (!email) return '';

  const [name, domain] = email.split('@');
  if (!name || !domain) return email;

  let visible = name.slice(0, 2);
  let masked = '*'.repeat(Math.max(2, name.length - 2));
  return `${visible}${masked}@${domain}`;
};


  // Signup logic
  const signup = async (formData) => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const res = await response.json();

      if (response.ok) {
        setOtpToken(res.otpToken)
        setOtpField(true)
        setUserEmail(formData.email);
        toast.success(res.message)
      } else {
        setOtpField(false)
        toast.error(res.message || 'Signup failed');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
      setOtpField(false)

    } finally{

      setLoading(false)
    }
  };

  // Verify OTP
  const verifyEmail = async (passedOtp = otp) => {

    if (!passedOtp || passedOtp.trim().length !== otpValues.length) {
      toast.error("Invalid or incomplete OTP.");
      return;
    }

    setVerifying(true);
    try {
       const fullData = {
      otp: passedOtp,
      token: otpToken,
    };
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(fullData),
      });

      const res = await response.json();
      if (response.ok) {

        setUser(res.user);
        setOtpField(false)
        toast.success(res.message)
        navigate('/');

      } else {
        setOtpField(true)        
        toast.error(res.message || 'Verification failed');
      }
    } catch {
      toast.error('Verification failed. Please try again.');
    } finally{
      setVerifying(false);
    }
  };
  // Resend OTP
  const resendOtp = async () => {
    setResending(true);
     try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ token: otpToken }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('OTP sent again');
        setOtpToken(data.otpToken)
        setTimeLeft(120)
      } else {   
        toast.error(data.message || 'Failed to resend OTP');
      }
    } catch {
      toast.error('Could not resend OTP. Try again.');
    } finally{
      setResending(false);
    }
  }
  // Delete 
const deleteAccount = async (email) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/delete-account`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setOtpField(false);
    } else {
      toast.error('Something went worng');
    }
  } catch (err) {
    toast.error('Something went wrong while deleting account');
    console.error(err);
  }
};
  // Format timer
  const formatTime = (seconds) => {
      const m = Math.floor(seconds / 60).toString().padStart(2, '0');
      const s = (seconds % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
  };
  // OTP Countdown Timer
  useEffect(() => {
    if ( !otpField || timeLeft <= 0) return;

    const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft ,otpField]);

  return (
     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
          <div className="text-white relative pt-7 lg:px-7 z-20 mx-auto max-w-[1460px] w-11/12">
      <Helmet>
        <title>Create an Account – The Freelancer Shop</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* SignUp Form */}
      <section className="ftco-section img js-fullheight " style={{ backgroundImage: 'url(images/bg.jpg)' }}>
        <div className="container">
          <div className="flex justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h1 className="heading-section">Welcome To The Freelancer</h1>
            </div>
          </div>

          <div className="flex justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-wrap p-0">
                <h3 className="mb-4 text-center">Create a new account</h3>

                <form onSubmit={handleSubmit(signup)} className="signin-form">
                  {/* Name */}
                  <label className="flex flex-col">
                    <p className="pb-2 pl-3">
                      Full Name <sup className="text-red-500">*</sup>
                    </p>
                    <div className="form-group flex">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Full Name"
                        {...register('name', { required: 'Name is required' })}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                  </label>

                  {/* Email */}
                  <label className="flex flex-col mt-4">
                    <p className="pb-2 pl-3">
                      Email Address <sup className="text-red-500">*</sup>
                    </p>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="email"
                        placeholder="Enter Email ID"
                        {...register('email', { required: 'Email is required' })}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  </label>

                  {/* Passwords */}
                  <div className="flex justify-between gap-x-4 mt-4 password-div">
                    {/* Password */}
                    <label className="relative flex flex-col w-full">
                      <p className="pb-2 pl-3">
                        Create Password <sup className="text-red-500">*</sup>
                      </p>
                      <div className="form-group">
                        <input
                          className="form-control"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter Password"
                          {...register('password', { required: 'Password is required' })}
                        />
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                      )}
                      <span
                        className="right-3 text-xl top-[46px] absolute cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <IoEye /> : <IoEyeOff />}
                      </span>
                    </label>

                    {/* Confirm Password */}
                    <label className="relative flex flex-col w-full">
                      <p className="pb-2 pl-3">
                        Confirm Password <sup className="text-red-500">*</sup>
                      </p>
                      <div className="form-group">
                        <input
                          className="form-control"
                          type={showPassword2 ? 'text' : 'password'}
                          placeholder="Confirm Password"
                          {...register('confirmPassword', {
                            validate: (value) =>
                              value === password || 'Passwords do not match',
                          })}
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                      <span
                        className="right-3 text-xl top-[46px] absolute cursor-pointer"
                        onClick={() => setShowPassword2((prev) => !prev)}
                      >
                        {showPassword2 ? <IoEye /> : <IoEyeOff />}
                      </span>
                    </label>
                  </div>

                  {/* Submit */}
                  <div className="form-group mt-6">
                    <button
                      onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSubmit(signup)();
                          }
                        }} 
                      style={{
                      backgroundImage:'linear-gradient(to right, #5159ff, #424eed, #3244da, #1f3ac9, #0030b7)',}}
                      type="submit"
                      className="form-control btn px-3"
                      disabled={!isValid || loading}
                    >
                      {loading ? "Creating..." : "Create Account"}
                    </button>
                  </div>
                </form>

                <p className="w-100 text-center pb-3">&mdash; Or Sign In &mdash;</p>

                  <button
                    style={{
                      backgroundImage: ' linear-gradient(to right, #1e227e, #253098, #293eb3, #2b4dce, #2a5deb)',}}
                    onClick={() => navigate('/login')}
                    className="form-control btn px-3"
                  >
                    Sign In
                  </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OTP Modal */}  
      {otpField && (
  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50">
    <div className="bg-slate-950 text-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fadeIn">
      <h2 className="text-3xl font-bold text-center mb-6">OTP Verification</h2>
      <p className="text-sm text-center font-semibold text-gray-400 mb-6">
        Enter the OTP you received at <span className="text-blue-500">{maskEmail(userEmail)}</span>
      </p>

      {/* OTP Digits Input */}
      <div className="flex justify-center gap-3 mb-5 text-black">
        <div className="flex gap-3">
          {otpValues.map((value, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              className="w-[50px] h-14 text-center border rounded-[12px] text-2xl font-bold outline-none focus:ring-4 focus:ring-blue-500 transition-all"
              value={value}
              onPaste={handlePaste}
              onChange={(e) => changeHandler(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              maxLength={1}
              inputMode="numeric"
              type="text"
            />
          ))}
        </div>
      </div>

      {/* Countdown and Resend */}
      <div className="flex justify-between items-center text-gray-500 mb-5">
        <span className="text-sm flex gap-2 font-medium">
          Didn't receive the code?
          <button
            disabled={timeLeft > 0 || resending}
            onClick={resendOtp}
            className={`hover:underline ${
              timeLeft > 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-400 hover:text-blue-600'
            }`}
          >
            {resending ? 'Sending...' : 'Resend OTP'}
          </button>
        </span>
        <strong>({formatTime(timeLeft)})</strong>
      </div>

      {/* Verify Button */}
      <button
        type="button"
        onClick={() => {
          const isOtpComplete = otpValues.every((val) => val !== "");
          if (isOtpComplete) {
            const fullOtp = otpValues.join("");
            setOtp(fullOtp);
            verifyEmail(fullOtp);
          } else {
            toast.error("Please enter the complete OTP.");
          }
        }}
        disabled={verifying}
        className="w-full mb-3 hover:bg-blue-700 text-white outline-none border-none py-2 rounded-md transition-colors duration-200"
        style={{
          backgroundImage:
            'linear-gradient(to right, #1e227e, #253098, #293eb3, #2b4dce, #2a5deb)',
        }}
      >
        {verifying ? 'Verifying...' : 'Verify Account'}
      </button>

      {/* Go Back Button */}
      <button
        onClick={() => deleteAccount(userEmail)}
        className="w-full border border-gray-500 hover:bg-gray-800 text-white py-2 rounded-md transition duration-200"
      >
        Go Back
      </button>
    </div>
  </div>
)}
    </div>
    </motion.div>
  );
};

export default SignupPage;
