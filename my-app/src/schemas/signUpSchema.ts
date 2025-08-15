import {z} from 'zod'

export const usernameValidation = z
    .string()
    .min(2,"Username must be atleast 2 charaters")
    .max(15,"Username must be no more than 15 charaters")
    .regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special characters")


export const signUpSchema = z.object({
    username:usernameValidation,
    name:z.string({message:"Please enter the name"}),
    email:z.email({message:'Invalid email address'}),
    password:z.string().min(6,{message:'password must be least 6 characters'})
    .max(20,{message:'password must be no more than 20 characters'}),
    confirmPassword:z.string().min(6,{message:'confirm password must be least 6 characters'})
    .max(20,{message:'confirm password must be no more than 20 characters'})
    
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
     // This will attach the error to confirmPassword
  });