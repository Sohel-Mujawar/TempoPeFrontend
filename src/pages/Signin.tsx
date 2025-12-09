import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useAuthContext} from '@/context/AuthContext';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import {FiEye, FiMail} from 'react-icons/fi';
import {LuEyeOff} from 'react-icons/lu';
import SyncLoader from 'react-spinners/SyncLoader';
import {signInSchema} from '@/lib/validation/signInSchema';
import {useCustomerLogin} from '@/lib/react-query/Auth/auth';

type SignInFormValues = z.infer<typeof signInSchema>;
interface DecodedToken extends JwtPayload {
  user: {
    role: string;
  };
}

const SignIn: React.FC = () => {
  const {mutateAsync: signIn, isError, isPending} = useCustomerLogin();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const {setUser, setIsAuthenticated, setToken, user} = useAuthContext();
  console.log(user?.role);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values: SignInFormValues) => {
    try {
      const res = await signIn({
        email: values.identifier,
        password: values.password,
      });
      setUser(jwtDecode(res.data.token.accessToken || ''));
      setToken(res.data?.token);
      setIsAuthenticated(true);

      const role = user?.role;
      console.log(role);
      if (role === 'ADMIN') window.location.href = '/';
      if (role === 'CUSTOMER') window.location.href = '/customer/dashboard';
      if (role === 'MARKETER') window.location.href = '/marketer/dashboard';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <h2 className="mb-6 text-center text-xl font-bold text-black dark:text-white sm:text-2xl md:text-3xl lg:mb-9">
        Sign In to Your Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
            Email or Username
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your email or username"
              {...register('identifier')}
              className={`w-full rounded-lg border text-sm sm:text-base ${
                errors.identifier
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-stroke focus:border-primary'
              } bg-transparent py-3 pl-6 pr-12 text-black outline-none transition-colors dark:border-form-strokedark dark:bg-form-input dark:text-white`}
            />
            <span className="text-gray-400 absolute right-4 top-1/2 -translate-y-1/2">
              <FiMail size={20} />
            </span>
          </div>
          <div className="mt-1.5 h-5">
            {errors.identifier && (
              <p className="animate-fadeIn flex items-center gap-1 text-xs text-red-500">
                <span>⚠️</span>
                {errors.identifier.message}
              </p>
            )}
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password')}
              className={`w-full rounded-lg border text-sm sm:text-base ${
                errors.password
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-stroke focus:border-primary'
              } bg-transparent py-3 pl-6 pr-12 text-black outline-none transition-colors dark:border-form-strokedark dark:bg-form-input dark:text-white`}
            />
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 absolute right-4 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <LuEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          <div className="mt-1.5 h-5">
            {errors.password && (
              <p className="animate-fadeIn flex items-center gap-1 text-xs text-red-500">
                <span>⚠️</span>
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        {/* API Error */}
        <div
          className="overflow-hidden transition-all duration-300"
          style={{
            maxHeight: isError ? '60px' : '0px',
            opacity: isError ? 1 : 0,
          }}
        >
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
            <p className="flex items-center justify-center gap-2 text-center text-sm text-red-600 dark:text-red-400">
              <span>❌</span> Invalid email or password
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="bg-l-red-600 w-full rounded-lg border border-x-black bg-slate-800 py-3 text-sm font-medium text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <SyncLoader color="#ffffff" size={8} />
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </div>

        {/* Links */}
        <div className="pt-2 text-center">
          <a href="#" className="text-sm text-primary hover:underline">
            Forgot your password?
          </a>
        </div>
      </form>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
      `}</style>
    </div>
  );
};

export default SignIn;
