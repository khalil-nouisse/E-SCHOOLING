import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { GraduationCap, ArrowRight, Zap, Shield, BarChart3, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';

const LandingPage = () => {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            {/* Navigation */}
            <header className="fixed top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
                <div className="flex h-16 items-center justify-between px-6 lg:px-12">
                    <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                            <GraduationCap className="h-5 w-5" />
                        </div>
                        <span>e-Scolarité</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
                        <a href="#testimonials" className="hover:text-indigo-600 transition-colors">Testimonials</a>
                        <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link to="/login">
                            <Button variant="ghost" className="hidden sm:inline-flex">Log in</Button>
                        </Link>
                        <Link to="/register">
                            <Button>Get Started</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 pt-16">
                {/* Hero Section */}
                <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32">
                    <div className="container mx-auto px-6 text-center">
                        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-50/50 blur-3xl" />

                        <div className="mx-auto max-w-3xl space-y-6">
                            <div className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600">
                                <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
                                New Admissions Module Live
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                                Manage your University with
                                <span className="text-indigo-600 block mt-2">Speed and Precision</span>
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                The all-in-one platform for modern education management. Streamline applications, admissions, and student data in one frictionless interface.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                                <Link to="/register">
                                    <Button size="lg" className="h-12 px-8 text-base">
                                        Start Free Trial
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <Button variant="secondary" size="lg" className="h-12 px-8 text-base">
                                    Book Demo
                                </Button>
                            </div>
                        </div>

                        {/* Hero Image / Dashboard Preview */}
                        <div className="mt-16 relative mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 aspect-[16/9] flex items-center justify-center text-slate-400">
                                {/* Abstract representation of dashboard */}
                                <div className="space-y-4 w-full h-full max-w-3xl">
                                    <div className="flex gap-4">
                                        <div className="h-32 w-1/3 rounded-lg bg-white shadow-sm animate-pulse"></div>
                                        <div className="h-32 w-1/3 rounded-lg bg-white shadow-sm animate-pulse"></div>
                                        <div className="h-32 w-1/3 rounded-lg bg-white shadow-sm animate-pulse"></div>
                                    </div>
                                    <div className="h-64 rounded-lg bg-white shadow-sm animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="py-24 bg-slate-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Everything you need to run a modern campus</h2>
                            <p className="mt-4 text-slate-600">Powerful features wrapped in a simple, intuitive design.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Zap,
                                    title: "Lightning Fast",
                                    description: "Built for speed. Zero lag, instant page loads, and real-time updates for all your data."
                                },
                                {
                                    icon: Shield,
                                    title: "Bank-grade Security",
                                    description: "Your student data is encrypted and protected with enterprise-level security standards."
                                },
                                {
                                    icon: BarChart3,
                                    title: "Actionable Insights",
                                    description: "Visualize trends in admissions and performance with beautiful, automatic dashboards."
                                }
                            ].map((feature, i) => (
                                <Card key={i} className="border-none shadow-md">
                                    <CardContent className="pt-6">
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                            <feature.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                                        <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Social Proof */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-12">Trusted by leading institutions</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
                            {/* Placeholders for logos */}
                            <div className="flex items-center justify-center font-bold text-xl text-slate-400">MIT University</div>
                            <div className="flex items-center justify-center font-bold text-xl text-slate-400">Stanford Tech</div>
                            <div className="flex items-center justify-center font-bold text-xl text-slate-400">Oxford College</div>
                            <div className="flex items-center justify-center font-bold text-xl text-slate-400">Cambridge Edu</div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 bg-indigo-600">
                    <div className="container mx-auto px-6 text-center">
                        <div className="max-w-3xl mx-auto space-y-8">
                            <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to transform your administration?</h2>
                            <p className="text-indigo-100 text-lg">Join thousands of administrators who have switched to a better way of working.</p>
                            <Link to="/register">
                                <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-semibold text-indigo-700">
                                    Get Started for Free
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <p className="text-sm text-indigo-200 mt-4 flex items-center justify-center gap-2">
                                <CheckCircle2 className="h-4 w-4" /> No credit card required
                                <CheckCircle2 className="h-4 w-4" /> 14-day free trial
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-slate-50 border-t border-slate-200 py-12">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600 text-white">
                            <GraduationCap className="h-3 w-3" />
                        </div>
                        <span>e-Scolarité</span>
                    </div>
                    <p className="text-sm text-slate-500">
                        © 2025 e-Scolarité Inc. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
