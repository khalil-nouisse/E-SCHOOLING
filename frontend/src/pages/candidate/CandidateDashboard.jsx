import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CheckCircle, Clock, FileText, User, Download, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { StudentService, AuthService } from '../../lib/api';

const CandidateDashboard = () => {
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get user from local storage
                const userData = JSON.parse(localStorage.getItem('user') || '{}');
                setUser(userData);

                // Fetch applications
                const apps = await StudentService.getMyApplications();
                if (apps && apps.length > 0) {
                    // For now, take the most recent app
                    setApplication(apps[0]);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    if (loading) return <div className="p-10 text-center">Loading dashboard...</div>;

    if (!application) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <Card className="max-w-md w-full text-center p-6">
                    <CardHeader>
                        <CardTitle>No Active Applications</CardTitle>
                        <CardDescription>You haven't submitted any applications yet.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => navigate('/candidate/onboarding')} className="w-full">
                            Start New Application
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Map backend status to UI status
    const getStatusVariant = (status) => {
        switch (status) {
            case 'VALIDATED': return 'success';
            case 'REJECTED': return 'destructive';
            default: return 'warning'; // PENDING
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'VALIDATED': return 'Accepted';
            case 'REJECTED': return 'Rejected';
            default: return 'Under Review';
        }
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
                            {user.first_name ? user.first_name[0] : 'U'}
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            Sign Out
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user.first_name || 'Student'}!</h1>
                    <p className="text-slate-500">Here is the current status of your application.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Main Status Card */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Application Status</CardTitle>
                                    <CardDescription>ID: #{application.id}</CardDescription>
                                </div>
                                <Badge variant={getStatusVariant(application.status)} className="px-3 py-1 text-sm">
                                    {getStatusLabel(application.status)}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-lg border border-amber-100 text-amber-800">
                                    <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Application {getStatusLabel(application.status)}</h4>
                                        <p className="text-sm mt-1">
                                            Your application for <strong>{application.major?.name || 'Program'}</strong> is currently <strong>{application.status}</strong>.
                                            {application.status === 'PENDING' && " It is being reviewed by the admissions committee."}
                                            {application.status === 'VALIDATED' && " Congratulations! You have been accepted."}
                                            {application.status === 'REJECTED' && " Unfortunately, your application was not successful."}
                                        </p>
                                    </div>
                                </div>

                                {/* Timeline Mock - Can be made dynamic if we have history */}
                                <div className="relative pl-4 border-l-2 border-slate-200 space-y-8 my-6">
                                    <div className="relative">
                                        <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-indigo-500 ring-4 ring-white" />
                                        <p className="text-sm font-medium text-slate-900">Application Submitted</p>
                                        <p className="text-xs text-slate-500">{new Date(application.submissionDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="relative">
                                        <div className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full ring-4 ring-white ${application.status === 'PENDING' ? 'bg-amber-500 animate-pulse' : 'bg-indigo-500'}`} />
                                        <p className="text-sm font-medium text-slate-900">In Review</p>
                                        <p className="text-xs text-slate-500">
                                            {application.status === 'PENDING' ? 'Current Stage' : 'Completed'}
                                        </p>
                                    </div>
                                    <div className={`relative ${application.status === 'PENDING' ? 'opacity-50' : ''}`}>
                                        <div className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full ring-4 ring-white ${application.status === 'VALIDATED' ? 'bg-green-500' :
                                            application.status === 'REJECTED' ? 'bg-red-500' : 'bg-slate-300'
                                            }`} />
                                        <p className="text-sm font-medium text-slate-900">Decision</p>
                                        <p className="text-xs text-slate-500">
                                            {application.status === 'PENDING' ? 'Pending' : getStatusLabel(application.status)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        {/* Download Certificate Card - Only if Accepted */}
                        {application.status === 'VALIDATED' && (
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
                                    <Button variant="secondary" className="w-full text-indigo-700 font-semibold bg-white hover:bg-slate-50 border-none" onClick={async () => {
                                        try {
                                            const blob = await StudentService.downloadCertificate();
                                            const url = window.URL.createObjectURL(blob);
                                            const a = document.createElement('a');
                                            a.href = url;
                                            a.download = 'Admission_Certificate.pdf';
                                            document.body.appendChild(a);
                                            a.click();
                                            window.URL.revokeObjectURL(url);
                                            document.body.removeChild(a);
                                        } catch (e) {
                                            console.error("Download failed", e);
                                            alert("Failed to download certificate.");
                                        }
                                    }}>
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
                                    <p className="font-medium text-slate-900">{application.major?.name || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-slate-500">Submitted On</p>
                                    <p className="font-medium text-slate-900">{new Date(application.submissionDate).toLocaleDateString()}</p>
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
