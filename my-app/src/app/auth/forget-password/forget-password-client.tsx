'use client';
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
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

  const forgetPassword: SubmitHandler<ForgetPasswordFormInputs> = async (formData) => {
    console.log("Form Data:", formData);
    setLoading(true)
    try {

      const res = await axios.post<ApiResponse>(`/api/forget-password`, formData)
      const data = res.data;
      toast.success(data.message);
      router.push('/auth/sign-in')

    }catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message || "An error occurred during Sign Up";
      toast.error(errorMessage); // ✅ Now it's a string (Message)
    } finally {
        setLoading(false);
    }
    };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
      <div className="pt-12 relative px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 z-20 mx-auto max-w-[1460px] w-full font-['Rajdhani',_sans-serif]">
        <section className="py-20 sm:py-24 md:py-28 lg:py-32">
          <div className="flex justify-center">
            <div className="text-center mb-12 max-w-xl px-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-widest uppercase drop-shadow-lg ">
                Change Your Password
              </h1>
            </div>
          </div>

          <div className="flex justify-center px-2 sm:px-0">
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
              <form onSubmit={handleSubmit(forgetPassword)} className="space-y-8">
                <div>
                  <label className="block text-lg font-semibold  pb-4 pl-1">
                     Enter your registered email / username <sup className="text-red-500">*</sup>
                  </label>
                  <input
                    type="text"
                    placeholder="Email / Username"
                    className="w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl 
                     bg-[color:var(--color-background)] 
                     text-[color:var(--color-foreground)] 
                     placeholder-gray-400 tracking-wide font-semibold 
                     border border-[color:var(--color-border)] 
                     transition focus:outline-none focus:border-indigo-500 
                     focus:shadow-[0_0_15px_#4266ff] caret-indigo-400"                    
                     {...register('identifier', { required: 'Registered Email is required' })}
                  />
                  {errors.identifier && (
                    <p className="text-red-500 text-sm mt-2 font-semibold">{errors.identifier.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!isValid || loading}
                  style={{
                  backgroundImage:
                    "linear-gradient(to right, #5159ff, #3244da, #0030b7)",
                  }}
                  className={`w-full py-3 sm:py-4 rounded-xl font-extrabold 
                              tracking-widest text-white text-sm sm:text-base md:text-lg 
                              uppercase shadow-lg transition duration-300 ${
                                loading || !isValid
                                  ? "opacity-50 cursor-not-allowed"
                                  : "hover:brightness-125 hover:shadow-[0_0_20px_#4266ff]"
                              }`}
                
                  >
                  {loading ? 'Loading...' : 'Forget Password'}
                </button>

                <div className="text-center text-sm tracking-wide font-semibold uppercase">
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
