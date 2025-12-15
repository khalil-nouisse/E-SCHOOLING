import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CheckCircle, Clock, FileText, User, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const CandidateDashboard = () => {
    // Mock application status
    const application = {
        id: 'APP-2024-892',
        program: 'Computer Science',
        status: 'success', // success = Accepted
        submittedDate: 'Oct 12, 2023',
        lastUpdate: '2 hours ago'
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header / Nav */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-semibold text-lg text-slate-900">
                        <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                            <User className="h-5 w-5" />
                        </div>
                        Student Portal
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-medium text-slate-600">
                            JD
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link to="/login">Sign Out</Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Welcome back, John!</h1>
                    <p className="text-slate-500">Here is the current status of your application.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Main Status Card */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Application Status</CardTitle>
                                    <CardDescription>ID: {application.id}</CardDescription>
                                </div>
                                <Badge variant={application.status} className="px-3 py-1 text-sm">
                                    {application.status === 'success' ? 'Accepted' :
                                        application.status === 'warning' ? 'Under Review' : 'Action Required'}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-lg border border-amber-100 text-amber-800">
                                    <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Application Under Review</h4>
                                        <p className="text-sm mt-1">
                                            Your application for <strong>{application.program}</strong> has been received and is currently being reviewed by the admissions committee.
                                            You will be notified via email once a decision has been made.
                                        </p>
                                    </div>
                                </div>

                                {/* Timeline Mock */}
                                <div className="relative pl-4 border-l-2 border-slate-200 space-y-8 my-6">
                                    <div className="relative">
                                        <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-indigo-500 ring-4 ring-white" />
                                        <p className="text-sm font-medium text-slate-900">Application Submitted</p>
                                        <p className="text-xs text-slate-500">{application.submittedDate}</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-amber-500 ring-4 ring-white animate-pulse" />
                                        <p className="text-sm font-medium text-slate-900">In Review</p>
                                        <p className="text-xs text-slate-500">Current Stage</p>
                                    </div>
                                    <div className="relative opacity-50">
                                        <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-slate-300 ring-4 ring-white" />
                                        <p className="text-sm font-medium text-slate-900">Decision</p>
                                        <p className="text-xs text-slate-500">Pending</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        {/* Download Certificate Card - Only if Accepted */}
                        {application.status === 'success' && (
                            <Card className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-none shadow-lg">
                                <CardHeader>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-2 bg-white/10 rounded-lg">
                                            <Download className="h-5 w-5 text-white" />
                                        </div>
                                    </div>
                                    <CardTitle className="text-white text-lg">Admission Certificate</CardTitle>
                                    <CardDescription className="text-indigo-100">
                                        Your official certificate of admission is ready for download.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="secondary" className="w-full text-indigo-700 font-semibold bg-white hover:bg-slate-50 border-none">
                                        Download PDF
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Quick Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div>
                                    <p className="text-slate-500">Program</p>
                                    <p className="font-medium text-slate-900">{application.program}</p>
                                </div>
                                <div>
                                    <p className="text-slate-500">Submitted On</p>
                                    <p className="font-medium text-slate-900">{application.submittedDate}</p>
                                </div>
                                <div>
                                    <p className="text-slate-500">Documents</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <FileText className="h-4 w-4 text-indigo-500" />
                                        <span className="text-slate-700">Baccalaureat.pdf</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CandidateDashboard;
