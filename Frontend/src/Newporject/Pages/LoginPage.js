import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AppContext } from '../../Context/AppContext.js';
import { useNavigate } from 'react-router-dom';
import "./login.css"
import { IoEye, IoEyeOff } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const LoginPage = () => {
  const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isValid },
    } = useForm({
      defaultValues: {
        rememberMe: false,
      },
    });

  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [showPassword,setShowpassword] = useState(false)
  const [loading , setLoading] = useState(false)
  const rememberMe = watch("rememberMe");
 

  const onSubmit = async (loginData) => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...loginData,
          rememberMe: loginData.rememberMe || false
        }),
      });

      const res = await response.json();
      if (response.ok) {
        setUser(res.user);
        navigate('/');
        toast.success(res.message)
      } else {
        // alert(res.message || 'Login failed');
        toast.error(res.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error);

    } finally {
      setLoading(false); 
    }
    
  };

  return (
    <div className='text-white pt-7 relative lg:px-7 z-20 mx-auto max-w-[1460px] w-11/12 '>

      <Helmet>
        <title>Login to Your Freelancer Account – Secure Access</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

       <section className="ftco-section img js-fullheight" style={{ backgroundImage: 'url(images/bg.jpg)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <h1 className="heading-section">Welcome Back</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="login-wrap p-0">
              <h3 className="mb-4 text-center">Have an account?</h3>

              <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    required
                    {...register('email',{required: "Email is required"})}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="form-group relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    required
                    {...register('password',{required:"Password is required"})}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                  <span
                    className="right-4 text-xl top-[15px] absolute cursor-pointer"
                    onClick={ () => setShowpassword((prev) => !prev)}>
                      {showPassword ? <IoEye /> : <IoEyeOff />}
                  </span>
                </div>

                <div className="form-group ">
                  <button 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSubmit(onSubmit)();
                    }
                  }}  
                  style={{
                     backgroundImage:'linear-gradient(to right, #5159ff, #424eed, #3244da, #1f3ac9, #0030b7)',
                  }} 
                  type="submit" disabled={!isValid || loading} className="form-control btn px-3 ">
                    {loading ? 'Please wait...' : 'Login'}
                  </button>
                </div>
                
                <div className="form-group flex items-center justify-between forget-pass">
                  <div className=" ">
                    <label className="relative flex items-center cursor-pointer group space-x-1">
                      Remember Me
                      <input
                      className='peer sr-only'
                        type="checkbox"
                        {...register("rememberMe")}
                        checked={rememberMe}
                      />
                        <div
                          className="w-6 h-6 rounded-lg bg-white border-2 border-slate-950 transition-all duration-300 ease-in-out peer-checked:bg-gradient-to-br from-slate-950 to-pink-500 peer-checked:border-0 peer-checked:rotate-12 after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-5 after:h-5 after:opacity-0 after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=')] after:bg-contain after:bg-no-repeat peer-checked:after:opacity-100 after:transition-opacity after:duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                        ></div>

                    </label>
                  </div>
                   <button onClick={(() => navigate("/forget-password"))} className="text-md-right mb-[8px]">
                      Forgot Password ?
                  </button> 
                </div>

              </form>

              <p className="w-100 text-center pb-3" >&mdash; Or Sign Up &mdash;</p>

              <div className="form-group ">
                  <button onClick={()=> navigate("/signup")} className="form-control btn px-3"
                     style={{
                     backgroundImage: 'linear-gradient(to right, #1e227e, #253098, #293eb3, #2b4dce, #2a5deb)',
                  }} 
                  >
                    Sign Up
                  </button>
                </div>
              {/* <div className="social d-flex text-center">
                <a href="#" className="px-2 py-2 mr-md-1 rounded">
                  <span className="ion-logo-facebook mr-2"></span> Facebook
                </a>
                <a href="#" className="px-2 py-2 ml-md-1 rounded">
                  <span className="ion-logo-twitter mr-2"></span> Twitter
                </a>
              </div> */}


            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
   
  );
};

export default LoginPage;
