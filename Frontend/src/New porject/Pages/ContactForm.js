import React, { useState , useRef } from 'react'

import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';

const ContactForm = () => {
    const [formData , setFormData] = useState({
        name:"", email: "", number:"" , subject:"" , help:""
    })
    const {register,handleSubmit} = useForm()

    function changeHandler(event){
        setFormData(prevData => ({
            ...prevData,
            [event.target.name] : event.target.value
        }))
    }


    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();

      setFormData({
        name:"", email: "", number:"" , subject:"" , help:""
    })

      emailjs
        .sendForm('service_1wkykx4', 'template_5zil37u', form.current, {
          publicKey: 'xAMcVpwEtgkUjpzOb',
        })
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    };

  return (
    <div className='w-11/12 max-w-[1350px]  mx-auto pt-[100px] pb-[140px] px-[10px] text-white relative z-20 '>
        <div>
            <p className='text-[20px] text-[#a8e3f5]'>Get In Touch _____</p>
            <h1 className='md:text-[51px] text-[39px] font-semibold'>Send Us a Message So We Can Work Together &  Make Something Happen</h1>
            <div className='ma-w-[780px] pt-5'>
            <p className='text-base'>Whether you need a promotional video, YouTube content, or a cinematic masterpiece, we’re here to bring your ideas to life with professional video editing. Get in touch today, and let’s start crafting something extraordinary!</p>
            </div>
        </div>

        <div className='pt-24 flex w-full md:flex-row flex-col'>

            <div className='max-w-[405px] w-11/12 pr-[2.5rem] font-semibold '>

                <h1 className='text-[2rem]'>Drop Us Line</h1>
                <div className='w-full h-[2.5rem]'></div>

                <h1 className='text-[1.5rem]'>Email Address</h1>
                <a className='text-base' href='mailto:thefreelancers27@gmail.com'>thefreelancers27@gmail.com</a>

                <div className='w-full h-[2.5rem]'></div>

                <h1 className='text-[1.5rem]'>Call/Whatsapp</h1>
                <a className='text-base' href='tel:+917004505998' >(+91) 70045 05998</a>

                <div className='w-full h-[2.5rem]'></div>

                {/* <h1 className='text-[1.5rem]'>Office</h1>
                <p className='text-base'>Jl. Sunset Road No.819, Kuta, Kec. Kuta, Kab. Badung, Bali – Indonesia 80361
                </p> */}

                <div className='w-full h-[2.5rem]'></div>

            </div>

           <div className='md:pl-[60px]  pt-2 w-11/12 '>
           <form  ref={form} onSubmit={sendEmail} className='w-full flex flex-col gap-4 '>

               <div className='w-full flex gap-6  md:flex-row flex-col'>
                <input
                {...register("name")}
                    className='input'
                    name='name'
                    type='text'
                    value={formData.name}
                    placeholder='Your Name'
                    onChange={changeHandler}/>
                <input
                 {...register("email")}
                    className='input'
                    name='email'
                    type='email'
                    value={formData.email}
                    placeholder='Your Email'
                    onChange={changeHandler}/>
               </div>


               <div className='w-full flex gap-6 md:flex-row flex-col'>
                <input
                 {...register("number")}
                    className='input'
                    name='number'
                    type='tel'
                    value={formData.number}
                    placeholder='Your Number'
                    onChange={changeHandler}/>
                <input
                 {...register("subject")}
                    className='input'
                    name='subject'
                    type='text'
                    value={formData.subject}
                    placeholder='Subject'
                    onChange={changeHandler}/>
               </div>

               <textarea
                {...register("help")}
                    className='textarea  max-w-[865px]'
                     rows="10" cols="30"
                    name='help'
                    type='text'
                    value={formData.help}
                    placeholder='How can we help you ?'
                    onChange={changeHandler}>

               </textarea>

               <button className='py-5 px-[45px] text-[15px] md:w-fit bg-[#a8e3f5] text-black rounded-[35px] font-semibold '>
                Send Message
               </button>
            </form>
           </div>
        </div>
        
    </div>
  )
}

export default ContactForm