'use client';

import React, {  useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ApiResponse } from '@/types/ApiResponse';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordSchema } from '@/schemas/resetPasswordSchema';

interface Props {
  token: string;
}


const ResetPassword = ({ token }: Props) => {

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),  mode: 'onChange',
    defaultValues: {
      password: "",
      confirmPassword: "",
  }});

    const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = form

  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading,setLoading] = useState(false)

  const passwordUpdate = async (data: z.infer<typeof ResetPasswordSchema> ) => {
    setLoading(true)
    const formDataWithToken = {
        ...data,   // existing form fields like password, newPassword
        token: token   // add the token here
    };
    try{
      const response = await axios.post(`/api/reset-password`, formDataWithToken)

      const data = response.data;

      if(data){
        router.push('/auth/sign-in');
        toast.success(data.message)  
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message || "An error occurred during Sign Up";
      toast.error(errorMessage); // ✅ Now it's a string (Message)
    }
    setLoading(false)
        

  }
  const password = watch('password');
  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="text-white pt-12 relative px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 z-20 mx-auto max-w-[1460px] w-full font-['Rajdhani',_sans-serif]">

      <section className="py-20 sm:py-24 md:py-28 lg:py-32">
        <div className="flex justify-center">
          <div className="text-center mb-12 max-w-xl px-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-widest uppercase drop-shadow-lg">
              Update Your Password
            </h1>
            <p className="text-sm sm:text-base text-gray-400 mt-4 tracking-wide font-semibold uppercase">
              Secure your account
            </p>
          </div>
        </div>

        <div className="flex justify-center px-2 sm:px-0">
          <div
            className="w-full max-w-md p-6 sm:p-10 bg-[rgba(30,30,40,0.7)] backdrop-blur-md rounded-3xl border border-gray-700 shadow-lg shadow-indigo-900/50"
            style={{
              boxShadow:
                '0 0 15px 2px rgba(65, 105, 225, 0.6), inset 0 0 10px 2px rgba(65, 105, 225, 0.4)',
            }}
          >
            <form onSubmit={handleSubmit(passwordUpdate)} className="space-y-7">
              {/* New Password */}
              <div className="relative">
                <input
                  className="w-full px-6 py-4 rounded-xl bg-black bg-opacity-20 text-white placeholder-gray-400 tracking-wide font-semibold border border-transparent transition focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_15px_#4266ff] caret-indigo-400"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  {...register('password', { required: 'Password is required' })}
                />
                <span
                  className="absolute right-5 top-4 text-indigo-400 cursor-pointer select-none hover:text-indigo-600 transition"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <IoEye /> : <IoEyeOff />}
                </span>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2 font-semibold">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  className="w-full px-6 py-4 rounded-xl bg-black bg-opacity-20 text-white placeholder-gray-400 tracking-wide font-semibold border border-transparent transition focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_15px_#4266ff] caret-indigo-400"
                  type={showPassword2 ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  {...register('confirmPassword', {
                    validate: (value) => value === password || 'Passwords do not match',
                  })}
                />
                <span
                  className="absolute right-5 top-4 text-indigo-400 cursor-pointer select-none hover:text-indigo-600 transition"
                  onClick={() => setShowPassword2((prev) => !prev)}
                >
                  {showPassword2 ? <IoEye /> : <IoEyeOff />}
                </span>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-2 font-semibold">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`w-full py-3 sm:py-4 rounded-xl font-extrabold tracking-widest text-white text-sm sm:text-base md:text-lg uppercase shadow-lg transition duration-300 ${
                    !isValid || !loading
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:brightness-125 hover:shadow-[0_0_20px_#4266ff]'
                  }`}
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #5159ff, #424eed, #3244da, #1f3ac9, #0030b7)',
                }}
                disabled={!isValid || loading}
              >
                Change Password
              </button>

              {/* Or Sign In */}
              <div className="text-center text-sm text-gray-400 tracking-wide font-semibold uppercase">
                &mdash; Or Sign In &mdash;
              </div>

              <button
                type="button"
                onClick={() => router.push('/auth/sign-in')}
                className="w-full py-4 rounded-xl font-extrabold tracking-widest text-white text-lg uppercase shadow-lg transition duration-300 hover:brightness-125 hover:shadow-[0_0_20px_#1e227e]"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #1e227e, #253098, #293eb3, #2b4dce, #2a5deb)',
                }}
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  </motion.div>

  )
}

export default ResetPassword