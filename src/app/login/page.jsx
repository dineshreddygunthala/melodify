'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/utils/validationSchemas'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import useStore from '@/lib/zustandStore'

export default function LoginPage() {
  const router = useRouter()
  const setUser = useStore((state) => state.setUser)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    try {
      const identifier = data.identifier.trim()

      if (!identifier.includes('@')) {
        alert('Login with mobile number is not supported in Firebase Email/Password login.')
        return
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        identifier,
        data.password
      )

      const user = userCredential.user
      setUser({
        uid: user.uid,
        email: user.email,
        name: user.displayName || '',
      })

      router.push('/')
    } catch (error) {
      alert(error.message || 'Login failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white text-black rounded-xl shadow-2xl px-6 py-8 space-y-6">
        <h2 className="text-2xl font-extrabold text-center text-gray-800">Sign in to your account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input
              placeholder="you@example.com"
              className="h-10 text-sm text-black"
              {...register('identifier')}
            />
            {errors.identifier && (
              <p className="text-xs text-red-600 mt-1">{errors.identifier.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              className="h-10 text-sm text-black"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-10 text-sm bg-indigo-600 hover:bg-indigo-700 transition-colors text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
