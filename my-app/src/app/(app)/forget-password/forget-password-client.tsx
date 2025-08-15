'use client';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface ForgetPasswordFormInputs {
  email: string;
}

const ForgetPassword = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ForgetPasswordFormInputs>({ mode: 'onChange' });
  const router = useRouter();

  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpField, setOtpField] = useState(false);
  const [resending, setResending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [otpToken, setOtpToken] = useState<string | null>(null);
  const [otpValues, setOtpValues] = useState(new Array(4).fill(''));
  const [otp, setOtp] = useState<string >('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const updated = otpValues.map((item, i) => (i === index ? value : item));
    setOtpValues(updated);

    if (value && index < otpValues.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (otpValues[index]) {
        const newOtp = [...otpValues];
        newOtp[index] = '';
        setOtpValues(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'Enter') {
      if (otpValues.every(val => val !== '')) {
        const fullOtp = otpValues.join('');
        setOtp(fullOtp);
        verifyEmail(fullOtp);
      } else {
        toast.error('Please enter the complete OTP.');
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('text').slice(0, otpValues.length);
    if (/^\d+$/.test(paste)) {
      const newOtp = paste.split('');
      setOtpValues(newOtp);
      inputRefs.current[paste.length - 1]?.focus();
    }
    e.preventDefault();
  };

  const maskEmail = (email: string) => {
    if (!email) return '';
    const [name, domain] = email.split('@');
    if (!name || !domain) return email;
    const visible = name.slice(0, 2);
    const masked = '*'.repeat(Math.max(2, name.length - 2));
    return `${visible}${masked}@${domain}`;
  };

  const resendOtp = async () => {
    setResending(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/resend-otp`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${otpToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('OTP sent again');
        setOtpToken(data.otpToken);
        setTimeLeft(120);
      } else {
        toast.error(data.message || 'Failed to resend OTP');
      }
    } catch {
      toast.error('Could not resend OTP. Try again.');
    } finally {
      setResending(false);
    }
  };

  const forgetPassword: SubmitHandler<ForgetPasswordFormInputs> = async (formData) => {
    setLoading(true);
    try {

        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/forget-password`, formData, { withCredentials: true });
        const data = res.data;

        if (res.status === 200) {
            setOtpField(true);
            toast.success(<div className='truncate'>{data.message}</div>,{ className: "custom-toast"});
            setUserEmail(formData.email);
            setOtpToken(data.otpToken);
        }
    }  catch (error) {
        const err = error as AxiosError<{ message: string }>;
        if (err.response?.data?.message) {
            toast.error(<div className='truncate'>{err.response.data.message}</div>,{ className: "custom-toast"});
        } else {
         toast.error('Verification error');
        }
        setOtpField(false);
    } finally {
        setLoading(false);
    }
    };

  const verifyEmail = async (enteredOtp: string) => {
    enteredOtp = otp;
    if (!enteredOtp || enteredOtp.trim().length !== otpValues.length) {
      toast.error('Invalid or incomplete OTP.');
      return;
    }

    setVerifying(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/otp-verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ otp: enteredOtp, token: otpToken }),
      });

      const res = await response.json();

      if (response.ok) {
        setOtpField(false);
        toast.success(res.message);
        router.push('/new-password');
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
                    Registered Email <sup className="text-red-500">*</sup>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 rounded-xl bg-black bg-opacity-20 text-white placeholder-gray-400 tracking-wide font-semibold border border-transparent transition focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_15px_#4266ff] caret-indigo-400"
                    {...register('email', { required: 'Registered Email is required' })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 font-semibold">{errors.email.message}</p>
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

        {/* {otpField && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50">
            <div
              className="bg-[rgba(20,20,30,0.9)] text-white rounded-3xl shadow-2xl p-10 w-full max-w-md animate-fadeIn"
              style={{
                boxShadow:
                  '0 0 20px 4px rgba(65, 105, 225, 0.7), inset 0 0 15px 3px rgba(65, 105, 225, 0.5)',
              }}
            >
              <h2 className="text-3xl font-extrabold text-center mb-8 tracking-wider uppercase drop-shadow-lg">
                OTP Verification
              </h2>
              <p className="text-sm text-center font-semibold text-gray-400 mb-8 tracking-wide">
                Enter the OTP sent to <span className="text-blue-500">{maskEmail(userEmail)}</span>
              </p>

              <div className="flex justify-center gap-4 mb-8 text-white">
                {otpValues.map((value, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputRefs.current[i] = el;
                    }}
                    className="w-[55px] h-16 text-center border border-indigo-600 rounded-2xl text-3xl font-extrabold outline-none focus:ring-6 focus:ring-indigo-500 transition-all shadow-[0_0_15px_#4266ff]"
                    value={value}
                    onPaste={handlePaste}
                    onChange={(e) => handleChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    maxLength={1}
                    inputMode="numeric"
                    type="text"
                  />
                ))}
              </div>

              <div className="flex justify-between items-center text-gray-400 mb-6 text-sm tracking-wide font-semibold">
                <span className="flex gap-3">
                  Didn't receive the code?
                  <button
                    disabled={timeLeft > 0 || resending}
                    onClick={resendOtp}
                    className={`hover:underline ${
                      timeLeft > 0 ? 'text-gray-600 cursor-not-allowed' : 'text-blue-500 hover:text-blue-700'
                    }`}
                  >
                    {resending ? 'Sending...' : 'Resend OTP'}
                  </button>
                </span>
                <strong>({formatTime(timeLeft)})</strong>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (otpValues.every(val => val !== '')) {
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
              >
                {verifying ? 'Verifying...' : 'Verify Account'}
              </button>

              <button
                onClick={() => setOtpField(false)}
                className="w-full border border-gray-600 hover:bg-gray-900 text-white py-3 rounded-xl font-semibold transition duration-200 shadow-md"
              >
                Go Back
              </button>
            </div>
          </div>
        )} */}
        {otpField && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="bg-[rgba(20,20,30,0.9)] text-white rounded-3xl shadow-2xl p-10 w-full max-w-md"
              style={{
                boxShadow:
                  '0 0 20px 4px rgba(65, 105, 225, 0.7), inset 0 0 15px 3px rgba(65, 105, 225, 0.5)',
              }}
            >
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-3xl font-extrabold text-center mb-8 tracking-wider uppercase drop-shadow-lg"
              >
                OTP Verification
              </motion.h2>

              <p className="text-sm text-center font-semibold text-gray-400 mb-8 tracking-wide">
                Enter the OTP sent to <span className="text-blue-500">{maskEmail(userEmail)}</span>
              </p>

              <div className="flex justify-center gap-4 mb-8 text-white">
                {otpValues.map((value, i) => (
                  <motion.input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el }}
                    className="w-[55px] h-16 text-center border border-indigo-600 rounded-2xl text-3xl font-extrabold outline-none focus:ring-6 focus:ring-indigo-500 transition-all shadow-[0_0_15px_#4266ff]"
                    value={value}
                    onPaste={handlePaste}
                    onChange={(e) => handleChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    maxLength={1}
                    inputMode="numeric"
                    type="text"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                  />
                ))}
              </div>

              <div className="flex justify-between items-center text-gray-400 mb-6 text-sm tracking-wide font-semibold">
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
              </div>

              <motion.button
                type="button"
                viewport={{ once: true }}
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
                whileHover={{ scale: 1.02 }}
              >
                {verifying ? 'Verifying...' : 'Verify Account'}
              </motion.button>

              <motion.button
                onClick={() => setOtpField(false)}
                viewport={{ once: true }}
                className="w-full border border-gray-600 hover:bg-gray-900 text-white py-3 rounded-xl font-semibold transition duration-200 shadow-md"
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

export default ForgetPassword;
