// src/utils/validationSchemas.js
import { z } from 'zod'

export const registerSchema = z.object({
  fullName: z.string().min(3, 'Full Name must be at least 3 characters'),
  email: z.string().email('Invalid email'),
  age: z
    .string()
    .refine((val) => !isNaN(val) && +val >= 10, {
      message: 'Age must be a number above 10',
    }),
  mobile: z
    .string()
    .min(10, 'Mobile must be at least 10 digits')
    .max(15, 'Too long'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const loginSchema = z.object({
  identifier: z.string().min(5, 'Enter your email or mobile number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
