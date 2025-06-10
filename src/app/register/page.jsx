'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/utils/validationSchemas'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { auth } from '@/lib/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import useStore from '@/lib/zustandStore'

export default function RegisterPage() {
  const router = useRouter()
  const setUser = useStore((state) => state.setUser)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      await updateProfile(userCredential.user, {
        displayName: data.fullName,
      })

      setUser({
        uid: userCredential.user.uid,
        email: data.email,
        name: data.fullName,
      })

      router.push('/')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-3 bg-gray-950 text-white">
      <div className="w-full sm:max-w-md bg-white text-black p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-3 text-center">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <Input
              placeholder="Full Name"
              className="h-9 text-sm"
              {...register('fullName')}
            />
            <p className="text-xs text-red-500 mt-1">{errors.fullName?.message}</p>
          </div>

          <div>
            <Input
              type="email"
              placeholder="Email"
              className="h-9 text-sm"
              {...register('email')}
            />
            <p className="text-xs text-red-500 mt-1">{errors.email?.message}</p>
          </div>

          <div>
            <Input
              placeholder="Age"
              className="h-9 text-sm"
              {...register('age')}
            />
            <p className="text-xs text-red-500 mt-1">{errors.age?.message}</p>
          </div>

          <div>
            <Input
              placeholder="Mobile Number"
              className="h-9 text-sm"
              {...register('mobile')}
            />
            <p className="text-xs text-red-500 mt-1">{errors.mobile?.message}</p>
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              className="h-9 text-sm"
              {...register('password')}
            />
            <p className="text-xs text-red-500 mt-1">{errors.password?.message}</p>
          </div>

          <Button type="submit" className="w-full h-9 text-sm">
            Sign Up
          </Button>
        </form>

        <p className="text-xs mt-4 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
