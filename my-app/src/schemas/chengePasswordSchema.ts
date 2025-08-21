import {z} from 'zod'


export const changePasswordSchema = z.object({
    currentPassword:z.string().min(6,{message:'confirm password must be least 6 characters'})
    .max(20,{message:'confirm password must be no more than 20 characters'}),
    password:z.string().min(6,{message:'password must be least 6 characters'})
    .max(20,{message:'password must be no more than 20 characters'}),
    confirmPassword:z.string().min(6,{message:'confirm password must be least 6 characters'})
    .max(20,{message:'confirm password must be no more than 20 characters'})
    
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
     // This will attach the error to confirmPassword
  });