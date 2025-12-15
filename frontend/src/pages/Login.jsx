import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { GraduationCap, Github } from 'lucide-react';

// Mock simple "Sign In" icon for visual flair
const GoogleIcon = (props) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
        <path
            fill="currentColor"
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.347.533 12S5.867 24 12.48 24c3.44 0 6.373-1.133 8.573-3.293 2.253-2.24 2.853-5.32 2.853-7.547 0-.747-.067-1.48-.187-2.187h-11.24z"
        />
    </svg>
);

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Get email from form
        const email = e.target.elements.email.value;

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            if (email.includes('admin')) {
                navigate('/dashboard');
            } else if (email.includes('new')) {
                navigate('/candidate/onboarding');
            } else {
                // Default to returning candidate dashboard
                navigate('/candidate/dashboard');
            }
        }, 1500);
    };

    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">

            {/* Left Side - Branding */}
            <div className="relative hidden h-full flex-col bg-slate-900 p-10 text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-indigo-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <GraduationCap className="mr-2 h-6 w-6" />
                    e-Scolarité
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;This platform has completely transformed how we manage our university admissions. It's fast, intuitive, and beautiful.&rdquo;
                        </p>
                        <footer className="text-sm">Sofia Davis, Director of Admissions</footer>
                    </blockquote>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-8 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Login to your account</h1>
                        <p className="text-sm text-slate-500">
                            Enter your email below to access your dashboard
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                    </div>
                                    <Input
                                        id="password"
                                        placeholder="••••••••"
                                        type="password"
                                        autoCapitalize="none"
                                        autoComplete="current-password"
                                        disabled={isLoading}
                                    />
                                </div>
                                <Button disabled={isLoading} className="w-full">
                                    {isLoading ? 'Signing In...' : 'Sign In with Email'}
                                </Button>
                            </div>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-slate-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="secondary" disabled={isLoading}>
                                <Github className="mr-2 h-4 w-4" /> Github
                            </Button>
                            <Button variant="secondary" disabled={isLoading}>
                                <GoogleIcon className="mr-2 h-4 w-4" /> Google
                            </Button>
                        </div>
                    </div>

                    <p className="px-8 text-center text-sm text-slate-500">
                        Don't have an account?{" "}
                        <Link to="/register" className="underline underline-offset-4 hover:text-indigo-600">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
