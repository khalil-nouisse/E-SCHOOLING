import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { CheckCircle, Circle, ArrowRight, ArrowLeft, Upload, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';
import { StudentService } from '../../lib/api';

const steps = [
    { id: 1, name: 'Personal Info' },
    { id: 2, name: 'Education' },
    { id: 3, name: 'Program Selection' },
    { id: 4, name: 'Review' }
];

const OnboardingWizard = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [majors, setMajors] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        sex: '',
        cin: '',
        phone: '',
        address: '',
        bacYear: '',
        bacGrade: '',
        bacType: '',
        majorId: '',
        program: ''
    });
    // Documents State
    const [documents, setDocuments] = useState({
        bac: null,
        transcript: null,
        cin: null
    });

    useEffect(() => {
        const fetchMajors = async () => {
            try {
                const data = await StudentService.getMajors();
                setMajors(data);
            } catch (error) {
                console.error("Failed to fetch majors", error);
            }
        };
        fetchMajors();
    }, []);

    const handleFileChange = (type, file) => {
        setDocuments(prev => ({ ...prev, [type]: file }));
    };

    const handleNext = async () => {
        if (currentStep < steps.length) {
            // Validation Logic
            if (currentStep === 1) {
                if (!formData.firstName || !formData.lastName || !formData.phone || !formData.sex || !formData.cin) {
                    alert("Please fill in all mandatory fields.");
                    return;
                }
            }
            if (currentStep === 2) { // Education
                if (!formData.bacYear || !formData.bacType || !formData.bacGrade) {
                    alert("Please fill in all education fields.");
                    return;
                }
            }
            if (currentStep === 3) { // Documents (Moved to 3)
                if (!documents.bac || !documents.transcript || !documents.cin) {
                    alert("Please upload all 3 required documents.");
                    return;
                }
            }
            // Step 4 is Program Selection now? Or order changed?
            // Let's reorder: 1.Info, 2.Education, 3.Documents, 4.Program, 5.Review

            // Current steps definition needs update. 
            // Warning: logic below depends on `steps` array

            setCurrentStep(currentStep + 1);
        } else {
            // Submit
            try {
                // 1. Create Inscription
                const response = await StudentService.apply({
                    majorId: parseInt(formData.majorId),
                    baccalaureateType: formData.bacType,
                    baccalaureateYear: parseInt(formData.bacYear),
                    bacGrade: parseFloat(formData.bacGrade),
                    sex: formData.sex,
                    cin: formData.cin,
                    phoneNumber: formData.phone
                });

                console.log("Apply Response:", response);
                const inscriptionId = response.inscription?.id;

                if (!inscriptionId) {
                    throw new Error("Application submitted but inscription ID missing in response.");
                }

                // 2. Upload Documents Sequentially
                if (documents.bac) await StudentService.uploadDocument(inscriptionId, documents.bac, 'BAC_CERTIFICATE');
                if (documents.transcript) await StudentService.uploadDocument(inscriptionId, documents.transcript, 'TRANSCRIPT');
                if (documents.cin) await StudentService.uploadDocument(inscriptionId, documents.cin, 'CIN_CARD');

                navigate('/student/dashboard');
            } catch (error) {
                console.error("Application failed", error);
                if (error.response) {
                    console.error("Server Error Response:", error.response.data);
                }
                const serverError = error.response?.data?.error || error.response?.data?.message || error.message;
                alert("Application failed: " + serverError);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4">
            {/* Steps Indicator - Kept same as before */}
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
                    {/* Step 1: Personal Info */}
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
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="sex">Sex</Label>
                                    <select
                                        id="sex"
                                        className="flex h-10 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/10 focus-visible:border-indigo-500"
                                        value={formData.sex}
                                        onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                                    >
                                        <option value="">Select Sex</option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cin">CIN (National ID)</Label>
                                    <Input id="cin" placeholder="e.g. AB123456" value={formData.cin} onChange={(e) => setFormData({ ...formData, cin: e.target.value })} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" placeholder="+212 6..." value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" placeholder="123 University Ave" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Education */}
                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bacYear">Baccalaureat Year</Label>
                                    <Input id="bacYear" type="number" placeholder="2023" value={formData.bacYear} onChange={(e) => setFormData({ ...formData, bacYear: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bacGrade">Bac Grade (/20)</Label>
                                    <Input id="bacGrade" type="number" step="0.01" min="0" max="20" placeholder="15.5" value={formData.bacGrade} onChange={(e) => setFormData({ ...formData, bacGrade: e.target.value })} />
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

                        </div>
                    )}

                    {/* Step 3: Documents */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            {/* Baccalaureate */}
                            <div className="space-y-2">
                                <Label>1. Baccalaureate Certificate <span className="text-rose-500">*</span></Label>
                                <div
                                    className={cn("border-2 border-dashed rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition", documents.bac ? "border-indigo-500 bg-indigo-50" : "border-slate-200")}
                                    onClick={() => document.getElementById('file-bac').click()}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", documents.bac ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-400")}>
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{documents.bac ? documents.bac.name : "Click to upload"}</p>
                                            <p className="text-xs text-slate-500">PDF or Image (Max 5MB)</p>
                                        </div>
                                    </div>
                                    {documents.bac && <CheckCircle className="h-5 w-5 text-indigo-600" />}
                                    <input id="file-bac" type="file" className="hidden" accept=".pdf,image/*" onChange={(e) => handleFileChange('bac', e.target.files[0])} />
                                </div>
                            </div>

                            {/* Transcript */}
                            <div className="space-y-2">
                                <Label>2. High School Transcript <span className="text-rose-500">*</span></Label>
                                <div
                                    className={cn("border-2 border-dashed rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition", documents.transcript ? "border-indigo-500 bg-indigo-50" : "border-slate-200")}
                                    onClick={() => document.getElementById('file-transcript').click()}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", documents.transcript ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-400")}>
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{documents.transcript ? documents.transcript.name : "Click to upload"}</p>
                                            <p className="text-xs text-slate-500">PDF or Image (Max 5MB)</p>
                                        </div>
                                    </div>
                                    {documents.transcript && <CheckCircle className="h-5 w-5 text-indigo-600" />}
                                    <input id="file-transcript" type="file" className="hidden" accept=".pdf,image/*" onChange={(e) => handleFileChange('transcript', e.target.files[0])} />
                                </div>
                            </div>

                            {/* CIN */}
                            <div className="space-y-2">
                                <Label>3. National ID Card (CIN) <span className="text-rose-500">*</span></Label>
                                <div
                                    className={cn("border-2 border-dashed rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition", documents.cin ? "border-indigo-500 bg-indigo-50" : "border-slate-200")}
                                    onClick={() => document.getElementById('file-cin').click()}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", documents.cin ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-400")}>
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{documents.cin ? documents.cin.name : "Click to upload"}</p>
                                            <p className="text-xs text-slate-500">Front & Back in one file if possible</p>
                                        </div>
                                    </div>
                                    {documents.cin && <CheckCircle className="h-5 w-5 text-indigo-600" />}
                                    <input id="file-cin" type="file" className="hidden" accept=".pdf,image/*" onChange={(e) => handleFileChange('cin', e.target.files[0])} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Program Selection */}
                    {currentStep === 4 && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Select Desired Program</Label>
                                {majors.length === 0 ? (
                                    <p className="text-sm text-slate-500">Loading programs...</p>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {majors.map((major) => (
                                            <div
                                                key={major.id}
                                                onClick={() => setFormData({ ...formData, majorId: major.id, program: major.name })}
                                                className={cn(
                                                    "p-4 rounded-lg border-2 cursor-pointer transition-all",
                                                    formData.majorId === major.id ? "border-indigo-600 bg-indigo-50" : "border-slate-200 hover:border-slate-300"
                                                )}
                                            >
                                                <p className="font-medium text-slate-900">{major.name}</p>
                                                <p className="text-xs text-slate-500 mt-1">{major.department}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 5: Review */}
                    {currentStep === 5 && (
                        <div className="space-y-6">
                            <div className="rounded-lg bg-indigo-50 p-4 border border-indigo-100">
                                <h3 className="font-semibold text-indigo-900 mb-2">Confirm Your Details</h3>
                                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                    <div>
                                        <dt className="text-xs font-medium text-indigo-600/70 uppercase">Name</dt>
                                        <dd className="text-sm font-medium text-indigo-900">{formData.firstName} {formData.lastName}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-medium text-indigo-600/70 uppercase">CIN & Sex</dt>
                                        <dd className="text-sm font-medium text-indigo-900">{formData.cin} | {formData.sex}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-medium text-indigo-600/70 uppercase">Education</dt>
                                        <dd className="text-sm font-medium text-indigo-900">{formData.bacType} ({formData.bacYear}) - Grade: {formData.bacGrade}/20</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs font-medium text-indigo-600/70 uppercase">Program</dt>
                                        <dd className="text-sm font-medium text-indigo-900">{formData.program}</dd>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <dt className="text-xs font-medium text-indigo-600/70 uppercase">Documents</dt>
                                        <dd className="text-sm font-medium text-indigo-900 flex gap-2 mt-1">
                                            <Badge variant="outline" className="bg-white">{documents.bac?.name}</Badge>
                                            <Badge variant="outline" className="bg-white">{documents.transcript?.name}</Badge>
                                            <Badge variant="outline" className="bg-white">{documents.cin?.name}</Badge>
                                        </dd>
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
