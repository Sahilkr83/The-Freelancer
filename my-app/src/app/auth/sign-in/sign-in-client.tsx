"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";
import { signInSchema } from "@/schemas/signInSchema";


import { signIn } from "next-auth/react";


export default function SignInPage() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema), mode: 'onChange',
    defaultValues: {
      identifier: "",
      password: "",
    }});

  const { register, handleSubmit, watch, formState: { errors} } = form;
  const passwordValue = watch('password',''); 
  const router = useRouter()
  const [showPassword,setShowpassword] = useState(false)
  const [loading , setLoading] = useState(false)
//   const rememberMe = watch("rememberMe");

  const onSubmit = async (data: z.infer<typeof signInSchema> ) => {
    setLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    })
    // console.log(result, "result");
    if (result?.error) {
      toast.error(result.error);
    }
    if (result?.url) {
      toast.success("Login successful");
      router.replace("/profile");
    }
    setLoading(false);
  };

  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <div className="text-white pt-7 relative px-4 sm:px-6 lg:px-8 z-20 mx-auto max-w-[1460px] w-full font-['Rajdhani',_sans-serif]">
      <section className="py-20 sm:py-24 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="text-center mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-widest uppercase drop-shadow-lg"
            >
              Welcome Back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              viewport={{ once: true }}
              className="text-sm sm:text-base text-gray-400 mt-4 tracking-wide font-semibold uppercase"
            >
              Login to your account below
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div
            className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-md p-4 sm:p-6 md:p-10 bg-[rgba(30,30,40,0.7)] backdrop-blur-md rounded-3xl border border-gray-700 shadow-lg shadow-indigo-900/50"
            style={{
              boxShadow:
                '0 0 15px 2px rgba(65, 105, 225, 0.6), inset 0 0 10px 2px rgba(65, 105, 225, 0.4)',
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-7">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <input
                  type="text"
                  className="w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl bg-black bg-opacity-20 text-white placeholder-gray-400 tracking-wide font-semibold border border-transparent transition focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_15px_#4266ff] caret-indigo-400"
                  placeholder="Email / Username"
                  {...register('identifier', { required: 'Email / Username is required' })}
                />
                {errors.identifier && <p className="text-red-500 text-sm mt-2 font-semibold">{errors.identifier.message}</p>}
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl bg-black bg-opacity-20 text-white placeholder-gray-400 tracking-wide font-semibold border border-transparent transition focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_15px_#4266ff] caret-indigo-400"
                  placeholder="Password"
                  {...register('password', { required: 'Password is required' })}
                />
                <span
                  className="absolute right-4 sm:right-5 top-3.5 sm:top-4 text-indigo-400 cursor-pointer select-none hover:text-indigo-600 transition"
                  onClick={() => setShowpassword((prev) => !prev)}
                >
                  {showPassword ? <IoEye /> : <IoEyeOff />}
                </span>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2 font-semibold">{errors.password.message}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400 font-semibold"
              >
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-blue-600"
                    // {...register("rememberMe")}
                    // checked={rememberMe}
                  />
                  <span>Remember Me</span>
                </label>

                <button
                  type="button"
                  onClick={() => router.push("/forget-password")}
                  className="text-blue-400 hover:underline"
                >
                  Forgot Password?
                </button>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={passwordValue.length < 6}
                viewport={{ once: true }}
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #5159ff, #424eed, #3244da, #1f3ac9, #0030b7)',
                }}
                className={`w-full py-3 sm:py-4 rounded-xl font-extrabold tracking-widest text-white text-sm sm:text-base md:text-lg uppercase shadow-lg transition duration-300 ${
                  passwordValue.length < 6
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:brightness-125 hover:shadow-[0_0_20px_#4266ff]'
                }`}
              >
                {loading ? 'Please wait...' : 'Login'}
              </motion.button>
            </form>
              <button
                  type="button"
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  className="w-full py-3 mt-8 mb-3 sm:py-4 rounded-xl font-extrabold tracking-widest text-white text-sm sm:text-base md:text-lg uppercase shadow-lg transition duration-300  hover:brightness-125 flex items-center justify-center gap-3 bg-black"
                >
                  <FcGoogle className="text-2xl" />
                  <span className="hidden sm:inline">Sign in with Google</span>
                  {/* Sign in with Google */}
              </button>
              

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.95, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center text-sm text-gray-400 tracking-wide font-semibold uppercase mb-8"
              >
                &mdash; Or Sign Up &mdash;
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                viewport={{ once: true }}
                type="button"
                onClick={() => router.push("//auth/sign-up")}
                style={{
                  backgroundImage: 'linear-gradient(to right, #1e227e, #253098, #293eb3, #2b4dce, #2a5deb)',
                }}
                className="w-full py-3 sm:py-4 rounded-xl font-extrabold tracking-widest text-white text-sm sm:text-base md:text-lg uppercase shadow-lg transition duration-300 hover:brightness-125 hover:shadow-[0_0_20px_#1e227e]"
              >
                Sign Up
              </motion.button>

          </div>
        </motion.div>
      </section>
    </div>
  </motion.div>
  );
};

// export default signInPage;