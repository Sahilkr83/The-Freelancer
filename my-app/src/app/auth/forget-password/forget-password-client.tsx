'use client';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ApiResponse } from '@/types/ApiResponse';

interface ForgetPasswordFormInputs {
  identifier: string;
}

const ForgetPassword = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ForgetPasswordFormInputs>({ mode: 'onChange' });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [otpField, setOtpField] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);


  const forgetPassword: SubmitHandler<ForgetPasswordFormInputs> = async (formData) => {
    console.log("Form Data:", formData);
    try {

      const res = await axios.post<ApiResponse>(`/api/forget-password`, formData)
      const data = res.data;
      toast.success(<div className='truncate'>{data.message}</div>,{ className: "custom-toast"});

      if (res.status === 200) {
        setOtpField(true);
        toast.success(<div className='truncate'>{data.message}</div>,{ className: "custom-toast"});
      }
    }catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message || "An error occurred during Sign Up";
      toast.error(errorMessage); // ✅ Now it's a string (Message)
      setOtpField(false);
    } finally {
        setLoading(false);
    }
    };


  useEffect(() => {
    if (!otpField || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [otpField, timeLeft]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
      <div className="text-white pt-12 relative px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 z-20 mx-auto max-w-[1460px] w-full font-['Rajdhani',_sans-serif]">
        <section className="py-20 sm:py-24 md:py-28 lg:py-32">
          <div className="flex justify-center">
            <div className="text-center mb-12 max-w-xl px-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-widest uppercase drop-shadow-lg text-white">
                Change Your Password
              </h1>
            </div>
          </div>

          <div className="flex justify-center px-2 sm:px-0">
            <div className="w-full max-w-md p-6 sm:p-10 bg-[rgba(30,30,40,0.7)] backdrop-blur-md rounded-3xl border border-gray-700 shadow-lg shadow-indigo-900/50">
              <form onSubmit={handleSubmit(forgetPassword)} className="space-y-8">
                <div>
                  <label className="block text-lg font-semibold text-white pb-4 pl-1">
                     Enter your registered email / username <sup className="text-red-500">*</sup>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your email / username"
                    className="w-full px-6 py-4 rounded-xl bg-black bg-opacity-20 text-white placeholder-gray-400 tracking-wide font-semibold border border-transparent transition focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_15px_#4266ff] caret-indigo-400"
                    {...register('identifier', { required: 'Registered Email is required' })}
                  />
                  {errors.identifier && (
                    <p className="text-red-500 text-sm mt-2 font-semibold">{errors.identifier.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!isValid || loading}
                  className="w-full py-4 rounded-xl font-extrabold tracking-widest text-white text-lg uppercase shadow-lg transition duration-300 hover:brightness-125 hover:shadow-[0_0_20px_#4266ff]"
                  style={{ backgroundImage: 'linear-gradient(to right, #5159ff, #424eed, #3244da, #1f3ac9, #0030b7)' }}
                >
                  {loading ? 'Loading...' : 'Forget Password'}
                </button>

                <div className="text-center text-sm text-gray-400 tracking-wide font-semibold uppercase">
                  &mdash; Or Sign In &mdash;
                </div>

                <button
                  type="button"
                  onClick={() => router.push('/auth/sign-in')}
                  className="w-full py-4 rounded-xl font-extrabold tracking-widest text-white text-lg uppercase shadow-lg transition duration-300 hover:brightness-125 hover:shadow-[0_0_20px_#1e227e]"
                  style={{ backgroundImage: 'linear-gradient(to right, #1e227e, #253098, #293eb3, #2b4dce, #2a5deb)' }}
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default ForgetPassword;
