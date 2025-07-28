import React, {  useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const NewPassword = () => {
    
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const passwordUpdate = async (formData) => {

    try{
        const response = await toast.promise(
        axios.post(`${process.env.REACT_APP_BASE_URL}/new-password`, formData, {
            withCredentials: true,
        }),
        {
            loading: 'Updating password...',
            success: 'Password updated successfully!',
            error: (err) => err?.response?.data?.message || 'Password update failed.',
        }
        );
        const data = response.data;
        if(data){
          navigate('/login');
        }
        } catch (error) {
            toast.error("Password updated Failed");
        }
        

  }
  const password = watch('password');
  return (
     <div className="text-white pt-7 lg:px-7 z-20 mx-auto max-w-[1460px] w-11/12">
           <section
             className="ftco-section img js-fullheight"
             style={{ backgroundImage: 'url(images/bg.jpg)' }}
           >
             <div className="container">
               <div className="row justify-content-center">
                 <div className="col-md-6 text-center mb-5">
                   <h1 className="heading-section">Change Your Password</h1>
                 </div>
               </div>
     
               <div className="row justify-content-center">
                 <div className="col-md-6 col-lg-5">
                   <div className="login-wrap p-0">
     
                     <form onSubmit={handleSubmit(passwordUpdate)}  className="signin-form">

                       {/* Passwords */}
                       <div className="flex justify-between gap-x-4 mt-4 password-div">
                         {/* Password */}
                         <label className="relative flex flex-col w-full">
                           <p className="pb-2 pl-3">
                             New Password <sup className="text-red-500">*</sup>
                           </p>
                           <div className="form-group">
                             <input
                               className="form-control"
                               type={showPassword ? 'text' : 'password'}
                               placeholder="Enter New Password"
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
                               {...register('newPassword', {
                                 validate: (value) =>
                                   value === password || 'Passwords do not match',
                               })}
                             />
                           </div>
                           {errors.newPassword && (
                             <p className="text-red-500 text-sm mt-1">
                               {errors.newPassword.message}
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
                           style={{
                            backgroundImage:'linear-gradient(to right, #5159ff, #424eed, #3244da, #1f3ac9, #0030b7)',
                          }} 
                           type="submit"
                           className="form-control btn px-3"
                           disabled={!isValid}
                         >
                           Change Password
                         </button>
                       </div>
                     </form>
     
                     <p className="w-100 text-center pb-3">&mdash; Or Sign In &mdash;</p>
     
                     <div className="form-group">
                       <button
                         style={{
                          backgroundImage: 'linear-gradient(to right, #1e227e, #253098, #293eb3, #2b4dce, #2a5deb)',
                          }} 
                         onClick={() => navigate('/login')}
                         className="form-control btn px-3"
                       >
                         Sign In
                       </button>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </section>
         </div>
  )
}

export default NewPassword