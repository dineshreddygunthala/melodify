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
    <div className="min-h-screen flex items-center justify-center px-3 bg-gray-950 text-white">
      <div className="w-full sm:max-w-md bg-white text-black p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-3 text-center">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <Input
              placeholder="Email address"
              className="h-9 text-sm"
              {...register('identifier')}
            />
            {errors.identifier && (
              <p className="text-xs text-red-500 mt-1">{errors.identifier.message}</p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              className="h-9 text-sm"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-9 text-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-xs mt-4 text-center">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
