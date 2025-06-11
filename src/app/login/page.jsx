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
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-gray-900 text-white">
      <div className="w-full sm:max-w-md backdrop-blur-md bg-white/10 border border-white/10 p-6 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-300">Welcome Back</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Input
              placeholder="Email"
              className="h-10 text-sm bg-white/20 text-white placeholder:text-white/70"
              {...register('identifier')}
            />
            {errors.identifier && (
              <p className="text-xs text-red-400 mt-1">{errors.identifier.message}</p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              className="h-10 text-sm bg-white/20 text-white placeholder:text-white/70"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-10 text-sm bg-indigo-600 hover:bg-indigo-700 transition-all text-white rounded-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-xs mt-5 text-center text-white/60">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-indigo-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
