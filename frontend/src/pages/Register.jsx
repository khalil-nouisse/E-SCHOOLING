import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { GraduationCap } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">

            {/* Right Side - Button to Login (Mobile only usually, but good for nav) */}
            <div className="absolute right-4 top-4 md:right-8 md:top-8">
                <Link to="/login">
                    <Button variant="ghost">Login</Button>
                </Link>
            </div>

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
                            &ldquo;Joining e-Scolarité was the best decision for our campus. The onboarding was seamless and the features are top-notch.&rdquo;
                        </p>
                        <footer className="text-sm">Alex Johnson, IT Administrator</footer>
                    </blockquote>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-8 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                        <p className="text-sm text-slate-500">
                            Enter your details below to create your account
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        type="text"
                                        autoCapitalize="words"
                                        autoComplete="name"
                                        disabled={isLoading}
                                    />
                                </div>
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
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        placeholder="••••••••"
                                        type="password"
                                        autoComplete="new-password"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="confirm-password">Confirm Password</Label>
                                    <Input
                                        id="confirm-password"
                                        placeholder="••••••••"
                                        type="password"
                                        autoComplete="new-password"
                                        disabled={isLoading}
                                    />
                                </div>
                                <Button disabled={isLoading} className="w-full">
                                    {isLoading ? 'Creating Account...' : 'Create Account'}
                                </Button>
                            </div>
                        </form>
                    </div>

                    <p className="px-8 text-center text-sm text-slate-500">
                        By clicking continue, you agree to our{" "}
                        <a href="#" className="underline underline-offset-4 hover:text-indigo-600">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="underline underline-offset-4 hover:text-indigo-600">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
