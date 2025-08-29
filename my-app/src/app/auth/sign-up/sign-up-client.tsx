"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from 'react-hook-form';
import React, { useEffect, useRef, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import axios , {AxiosError} from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { signUpSchema } from "@/schemas/signUpSchema";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),  mode: 'onChange',
      defaultValues: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
  }});

  const { register, handleSubmit, watch, formState: { errors,isValid }, } = form
  const passwordValue = watch('password',''); 
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [otpField, setOtpField] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [passwordo, setPassword] = useState('');
  const [otp , setOtp] = useState<string>("")

  const [otpValues, setOtpValues] = useState(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [loadingGoogle , setLoadingGoogle] = useState(false)
  const usernameValue = watch('username');
  const { status } = useSession();
  useEffect(() => {
    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(async () => {
      if (!usernameValue) {
        setUsernameMessage('');
        setIsCheckingUsername(false);
        return;
      }

      if (usernameValue.length < 2) {
        setUsernameMessage('Username must be at least 2 characters');
        setIsCheckingUsername(false);
        return;
      }

      if (!/^[a-zA-Z0-9_]+$/.test(usernameValue)) {
        setUsernameMessage('Username can only contain letters, numbers, and underscores');
        setIsCheckingUsername(false);
        return;
      }

      setIsCheckingUsername(true);
      try {
        const response = await axios.get<ApiResponse>(
            `/api/check-username-unique?username=${usernameValue}`
        );
        setUsernameMessage(`${response.data.message}`);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setUsernameMessage(
            axiosError.response?.data.message || 'Error checking username'
        );
      } finally {
        setIsCheckingUsername(false);
      }
  }, 1000); // 500ms after the user stops typing

  setTypingTimeout(timeout);

  return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [usernameValue]);

  useEffect(() => {
    if (status === "authenticated" && loadingGoogle) {
      toast.success("Signed in successfully!");
      setLoadingGoogle(false);
    }
  }, [status, loadingGoogle]);

  const handleGoogleLogin = async () => {
    if (loadingGoogle) return; // prevent double clicks
    setLoadingGoogle(true);

    const result = await signIn("google", {
      redirect: false,
      callbackUrl: "/",
    });

    if (result?.error) {
      toast.error(result.error || "Failed to sign in with Google");
      setLoadingGoogle(false);
    } else  {
      localStorage.setItem("login_success", "true"); // mark login success
  // redirect
    }
  };


// Signup logic
  const onSubmit = async (data: z.infer<typeof signUpSchema> ) => {
    setLoading(true);
    if (usernameMessage.includes("Username is already taken")) {
      toast.error("Please choose a different username.");
      return;
    }
  
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up',data);
      if (response.data.success) {
        setOtpField(true)
        setUserEmail(data.email);
        setUsername(data.username);
        setPassword(data.password);   
        toast.success(response.data.message || "Login successful");
      } else {
        setOtpField(false)
        toast.error(response.data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Sign Up error:', error);
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message || "An error occurred during Sign Up";
      toast.error(errorMessage);
    } finally {
      setLoading(false)
    }
    
  };
  
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
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

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
  const paste = e.clipboardData.getData('text').slice(0, otpValues.length);
    if (/^\d+$/.test(paste)) {
      const newOtp = paste.split('');
      setOtpValues(newOtp);
      inputRefs.current[paste.length - 1]?.focus();
    }
    e.preventDefault();
  };

  const maskEmail = (email: string): string => {
    if (!email) return '';

    const [name, domain] = email.split('@');
    if (!name || !domain) return email;

    // If the name is too short, just show first letter and mask the rest
    if (name.length <= 5) {
      const visibleStart = name.slice(0, 1);
      const masked = '*'.repeat(name.length - 1);
      return `${visibleStart}${masked}@${domain}`;
    }

    const visibleStart = name.slice(0, 3); // first 3 letters
    const visibleEnd = name.slice(-2);    // last 2 letters
    const maskedMiddle = '*'.repeat(name.length - 5); // middle part masked

    return `${visibleStart}${maskedMiddle}${visibleEnd}@${domain}`;
  };

  // Verify OTP
  const verifyEmail = async (enteredOtp: string) => {
    enteredOtp = otp
    if (!enteredOtp || enteredOtp.trim().length !== otpValues.length) {
      toast.error('Invalid or incomplete OTP.');
      return;
    }
    setVerifying(true);
    try {
      const response = await fetch("/api/verify-code", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ code: enteredOtp,username:username  }),
      });
      const res = await response.json();

      if (response.ok) {
        await signIn('credentials', {
          redirect: false,
          identifier: username,
          password: passwordo,
        })
        setOtpField(false);
        toast.success(res.message);
        router.push('/');
      } else {
        toast.error(res.message || 'Verification failed');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Verification error');
      }
    }
    setVerifying(false);
};
  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <div className=" pt-12 relative px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 z-20 mx-auto max-w-[1460px] w-full font-['Rajdhani',_sans-serif]">
      <section className="py-20 sm:py-24 md:py-28 lg:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="text-center mb-12 max-w-xl px-2">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-widest uppercase drop-shadow-lg">
                Welcome To The Freelancer
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              viewport={{ once: true }}
              className="text-sm sm:text-base text-gray-400 mt-4 tracking-wide font-semibold uppercase"
            >
              Create a new account
            </motion.p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center px-2 sm:px-0">
          <div
            className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-md 
               p-4 sm:p-6 md:p-10 
               rounded-3xl border shadow-lg backdrop-blur-md
               bg-[color:var(--color-background)] 
               border-[color:var(--color-border)] 
               text-[color:var(--color-foreground)]"
            style={{
              boxShadow:
                "0 0 15px 2px rgba(65, 105, 225, 0.4), inset 0 0 10px 2px rgba(65, 105, 225, 0.2)",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
              {/* Username */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <input
                  className="w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl 
                     bg-[color:var(--color-background)] 
                     text-[color:var(--color-foreground)] 
                     placeholder-gray-400 tracking-wide font-semibold 
                     border border-[color:var(--color-border)] 
                     transition focus:outline-none focus:border-indigo-500 
                     focus:shadow-[0_0_15px_#4266ff] caret-indigo-400"
                  type="text"
                  placeholder="User Name"
                  {...register('username', { required: 'Userame is required' })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2 font-semibold">{errors.name.message}</p>
                )}
                <div className="mt-2 ml-2 text-sm font-semibold">
                    {isCheckingUsername ? (
                        <span className="text-gray-400">Checking...</span>
                    ) : usernameMessage ? (
                        <span className={usernameMessage === "Username is unique" ? "text-green-500" : "text-red-500"}>
                        {usernameMessage}
                        </span>
                    ) : null}
                </div>
              </motion.div>
              {/* Full Name */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <input
                  className="w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl 
                     bg-[color:var(--color-background)] 
                     text-[color:var(--color-foreground)] 
                     placeholder-gray-400 tracking-wide font-semibold 
                     border border-[color:var(--color-border)] 
                     transition focus:outline-none focus:border-indigo-500 
                     focus:shadow-[0_0_15px_#4266ff] caret-indigo-400"
                  type="text"
                  placeholder="Full Name"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2 font-semibold">{errors.name.message}</p>
                )}
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <input
                  className="w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl 
                     bg-[color:var(--color-background)] 
                     text-[color:var(--color-foreground)] 
                     placeholder-gray-400 tracking-wide font-semibold 
                     border border-[color:var(--color-border)] 
                     transition focus:outline-none focus:border-indigo-500 
                     focus:shadow-[0_0_15px_#4266ff] caret-indigo-400"                  type="email"
                  placeholder="Email"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2 font-semibold">{errors.email.message}</p>
                )}
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative">
                <input
                  className="w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl 
                     bg-[color:var(--color-background)] 
                     text-[color:var(--color-foreground)] 
                     placeholder-gray-400 tracking-wide font-semibold 
                     border border-[color:var(--color-border)] 
                     transition focus:outline-none focus:border-indigo-500 
                     focus:shadow-[0_0_15px_#4266ff] caret-indigo-400"                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  {...register('password', { required: 'Password is required' })}
                />
                <span
                  className="absolute right-5 top-4 text-indigo-400 cursor-pointer select-none hover:text-indigo-600 transition"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <IoEye /> : <IoEyeOff />}
                </span>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2 font-semibold">{errors.password.message}</p>
                )}
              </motion.div>

              {/* Confirm Password */}
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
                >
                <input
                  className="w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl 
                     bg-[color:var(--color-background)] 
                     text-[color:var(--color-foreground)] 
                     placeholder-gray-400 tracking-wide font-semibold 
                     border border-[color:var(--color-border)] 
                     transition focus:outline-none focus:border-indigo-500 
                     focus:shadow-[0_0_15px_#4266ff] caret-indigo-400"                  
                  type={showPassword2 ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  {...register('confirmPassword', {
                    validate: (value) => value === passwordValue || 'Passwords do not match',
                  })}
                />
                <span
                  className="absolute right-5 top-4 text-indigo-400 cursor-pointer select-none hover:text-indigo-600 transition"
                  onClick={() => setShowPassword2((prev) => !prev)}
                  aria-label={showPassword2 ? 'Hide password' : 'Show password'}
                >
                  {showPassword2 ? <IoEye /> : <IoEyeOff />}
                </span>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-2 font-semibold">{errors.confirmPassword.message}</p>
                )}
              </motion.div>
              {/* Sign-in Button*/}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={!isValid || loading}
                className={`w-full py-3 sm:py-4 rounded-xl font-extrabold tracking-widest text-white text-sm sm:text-base md:text-lg uppercase shadow-lg transition duration-300 ${
                  !isValid || loading
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:brightness-125 hover:shadow-[0_0_20px_#4266ff]'
                  }`}
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #5159ff, #424eed, #3244da, #1f3ac9, #0030b7)',
                }}
              >
                {loading ? 'Creating...' : 'Create Account'}
              </motion.button>
              </form>
              {/* Google Login */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loadingGoogle}
                className={`w-full py-3 mt-8 mb-3 sm:py-4 rounded-xl font-extrabold 
                  tracking-widest text-sm sm:text-base md:text-lg 
                  uppercase shadow-lg transition duration-300 flex items-center 
                  justify-center gap-3 bg-[color:var(--color-background)] 
                  border border-[color:var(--color-border)] text-[color:var(--color-foreground)]
                  ${loadingGoogle ? "opacity-50 cursor-not-allowed" : "hover:brightness-125"}`}
              >
                <FcGoogle className="text-2xl" />
                <span className="hidden sm:inline">
                  {loadingGoogle ? "Signing in..." : "Sign in with Google"}
                </span>
              </button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.95, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center text-sm mt-8 tracking-wide font-semibold uppercase my-8">
                &mdash; Or Sign In &mdash;
              </motion.div>
              {/* Sign up page button*/}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                viewport={{ once: true }}
                type="button"
                onClick={() => router.push('/auth/sign-in')}
                className="w-full py-4 rounded-xl font-extrabold tracking-widest text-white text-lg uppercase shadow-lg transition duration-300 hover:brightness-125 hover:shadow-[0_0_20px_#1e227e]"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #1e227e, #253098, #293eb3, #2b4dce, #2a5deb)',
                }}
              >
                Sign In
              </motion.button>

          </div>
        </motion.div>
      </section>
      {/* OTP Modal */}
      {otpField && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="otp-field-box rounded-3xl shadow-2xl p-10 w-full max-w-max "
            style={{
              boxShadow:
                '0 0 20px 4px rgba(65, 105, 225, 0.7), inset 0 0 15px 3px rgba(65, 105, 225, 0.5)',
            }}
          >
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-extrabold text-center mb-8 tracking-wider uppercase drop-shadow-lg"
            >
              OTP Verification
            </motion.h2>

            <p className="text-sm text-center font-semibold text-gray-400 mb-8 tracking-wide">
              Enter the OTP sent to <span className="text-blue-500">{maskEmail(userEmail)}</span>
            </p>

            <div className="flex justify-center gap-4 mb-8  w-full">
              {otpValues.map((value, i) => (
                <motion.input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el }}
                  className="w-[55px] h-16 text-center border border-indigo-600 rounded-2xl text-3xl font-extrabold outline-none focus:ring-6 focus:ring-indigo-500 transition-all shadow-[0_0_15px_#4266ff]"
                  value={value}
                  onPaste={handlePaste}
                  onChange={(e) => changeHandler(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  maxLength={1}
                  inputMode="numeric"
                  type="text"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                />
              ))}
            </div>
            <motion.button
              type="button"
              onClick={() => {
                const isOtpComplete = otpValues.every((val) => val !== '');
                if (isOtpComplete) {
                  const fullOtp = otpValues.join('');
                  setOtp(fullOtp);
                  verifyEmail(fullOtp);
                } else {
                  toast.error('Please enter the complete OTP.');
                }
              }}
              disabled={verifying}
              className="w-full mb-4 text-white py-3 rounded-xl font-extrabold uppercase tracking-widest shadow-lg transition duration-300 hover:brightness-125 hover:shadow-[0_0_25px_#4266ff]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #1e227e, #253098, #293eb3, #2b4dce, #2a5deb)',
              }}
              whileTap={{ scale: 0.97 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {verifying ? 'Verifying...' : 'Verify Account'}
            </motion.button>

            <motion.button
              onClick={() => setOtpField(false)}
              viewport={{ once: true }}
              className="w-full border border-gray-600 hover:bg-gray-900  py-3 rounded-xl font-semibold transition duration-200 shadow-md"
              whileTap={{ scale: 0.97 }}
            >
              Go Back
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  </motion.div>
  );
};

export default SignupPage;








  // // Resend OTP
  // const resendOtp = async () => {
  //   setResending(true);
  //    try {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/resend-otp`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include',
  //       body: JSON.stringify({ token: otpToken }),
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       toast.success('OTP sent again');
  //       setOtpToken(data.otpToken)
  //       setTimeLeft(120)
  //     } else {   
  //       toast.error(data.message || 'Failed to resend OTP');
  //     }
  //   } catch {
  //     toast.error('Could not resend OTP. Try again.');
  //   } finally{
  //     setResending(false);
  //   }
  // }
  // // Format timer
  // const formatTime = (seconds: number): string => {
  //     const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  //     const s = (seconds % 60).toString().padStart(2, '0');
  //     return `${m}:${s}`;
  // };
  // // OTP Countdown Timer
  // useEffect(() => {
  //   if ( !otpField || timeLeft <= 0) return;

  //   const timer = setInterval(() => {
  //       setTimeLeft(prev => prev - 1);
  //     }, 1000);

  //   return () => clearInterval(timer);
  // }, [timeLeft ,otpField]);



              {/* <div className="flex justify-between items-center text-gray-400 mb-6 text-sm tracking-wide font-semibold">
              <span className="flex gap-3">
                Didn&apos;t receive the code?
                <button
                  disabled={timeLeft > 0 || resending}
                  onClick={resendOtp}
                  className={`hover:underline ${
                    timeLeft > 0
                      ? 'text-gray-600 cursor-not-allowed'
                      : 'text-blue-500 hover:text-blue-700'
                  }`}
                >
                  {resending ? 'Sending...' : 'Resend OTP'}
                </button>
              </span>
              <strong>({formatTime(timeLeft)})</strong>
            </div> */}