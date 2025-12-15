import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { CheckCircle, Circle, ArrowRight, ArrowLeft, Upload } from 'lucide-react';
import { cn } from '../../lib/utils';

const steps = [
    { id: 1, name: 'Personal Info' },
    { id: 2, name: 'Education' },
    { id: 3, name: 'Program Selection' },
    { id: 4, name: 'Review' }
];

const OnboardingWizard = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        bacYear: '',
        bacType: '',
        program: ''
    });

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        } else {
            // Submit
            navigate('/candidate/dashboard');
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4">

            {/* Steps Indicator */}
            <div className="w-full max-w-3xl mb-8">
                <nav aria-label="Progress">
                    <ol role="list" className="flex items-center">
                        {steps.map((step, stepIdx) => (
                            <li key={step.name} className={cn(stepIdx !== steps.length - 1 ? '' : '', 'relative flex-1')}>
                                {stepIdx !== steps.length - 1 && (
                                    <div className="absolute top-4 left-1/2 w-full h-0.5 bg-slate-200" aria-hidden="true" />
                                )}
                                <div className="relative flex flex-col items-center group">
                                    <span className="h-8 flex items-center">
                                        {step.id < currentStep ? (
                                            <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800 transition">
                                                <CheckCircle className="w-5 h-5 text-white" />
                                            </span>
                                        ) : step.id === currentStep ? (
                                            <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-indigo-600 rounded-full">
                                                <span className="h-2.5 w-2.5 bg-indigo-600 rounded-full" />
                                            </span>
                                        ) : (
                                            <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-slate-300 rounded-full group-hover:border-slate-400 transition">
                                                <Circle className="w-5 h-5 text-transparent" />
                                            </span>
                                        )}
                                    </span>
                                    <span className="mt-2 text-xs font-medium text-slate-500 uppercase tracking-wide">{step.name}</span>
                                </div>
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>

            {/* Form Card */}
            <Card className="w-full max-w-3xl">
                <CardHeader>
                    <CardTitle>{steps[currentStep - 1].name}</CardTitle>
                    <CardDescription>
                        Step {currentStep} of {steps.length}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" placeholder="John" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Doe" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" placeholder="+1 234 567 890" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" placeholder="123 University Ave" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bacYear">Baccalaureat Year</Label>
                                    <Input id="bacYear" placeholder="2023" value={formData.bacYear} onChange={(e) => setFormData({ ...formData, bacYear: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bacType">Baccalaureat Type</Label>
                                    <select
                                        id="bacType"
                                        className="flex h-10 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/10 focus-visible:border-indigo-500"
                                        value={formData.bacType}
                                        onChange={(e) => setFormData({ ...formData, bacType: e.target.value })}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Scientific">Scientific</option>
                                        <option value="Economics">Economics</option>
                                        <option value="Literature">Literature</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Upload Documents</Label>
                                <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition cursor-pointer">
                                    <Upload className="h-8 w-8 text-slate-400 mb-2" />
                                    <p className="text-sm font-medium text-slate-700">Click to upload Baccalaureat Certificate</p>
                                    <p className="text-xs text-slate-500 mt-1">PDF or JPG up to 5MB</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Select Desired Program</Label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {['Computer Science', 'Business Administration', 'Engineering', 'Psychology'].map((prog) => (
                                        <div
                                            key={prog}
                                            onClick={() => setFormData({ ...formData, program: prog })}
                                            className={cn(
                                                "p-4 rounded-lg border-2 cursor-pointer transition-all",
                                                formData.program === prog ? "border-indigo-600 bg-indigo-50" : "border-slate-200 hover:border-slate-300"
                                            )}
                                        >
                                            <p className="font-medium text-slate-900">{prog}</p>
                                            <p className="text-xs text-slate-500 mt-1">Bachelor's Degree</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <div className="rounded-lg bg-indigo-50 p-4 border border-indigo-100">
                                <h3 className="font-semibold text-indigo-900 mb-2">Confirm Your Details</h3>
                                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                    <div>
                                        <dt className="text-xs font-medium text-indigo-600/70 uppercase">Name</dt>
                                        <dd className="text-sm font-medium text-indigo-900">{formData.firstName} {formData.lastName}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-medium text-indigo-600/70 uppercase">Program</dt>
                                        <dd className="text-sm font-medium text-indigo-900">{formData.program}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-medium text-indigo-600/70 uppercase">Bac Year</dt>
                                        <dd className="text-sm font-medium text-indigo-900">{formData.bacYear}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-medium text-indigo-600/70 uppercase">Documents</dt>
                                        <dd className="text-sm font-medium text-indigo-900">1 File Uploaded</dd>
                                    </div>
                                </dl>
                            </div>
                            <p className="text-sm text-slate-500 text-center">
                                By submitting this application, you confirm that all information provided is accurate and true.
                            </p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <Button onClick={handleNext}>
                        {currentStep === steps.length ? 'Submit Application' : 'Next Step'}
                        {currentStep !== steps.length && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default OnboardingWizard;
