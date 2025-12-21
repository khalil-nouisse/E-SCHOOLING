import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StudentService } from '../../lib/api';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'lucide-react'; // Using icon as placeholder if Badge ui component missing, else import proper Badge

const StudentDashboard = () => {
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApps = async () => {
            try {
                const data = await StudentService.getMyApplications();
                setApplications(data);
            } catch (error) {
                console.error("Failed to fetch applications", error);
            }
        };
        fetchApps();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'VALIDATED': return 'bg-green-100 text-green-800';
            case 'REJECTED': return 'bg-red-100 text-red-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">My Applications</h1>
                    <p className="text-slate-500 mt-1">Track the status of your university applications</p>
                </div>
                <Button onClick={() => navigate('/candidate/onboarding')}>Apply New</Button>
            </header>

            <div className="grid gap-6">
                {applications.length === 0 ? (
                    <Card>
                        <CardContent className="p-10 text-center">
                            <p className="text-slate-500 mb-4">You haven't submitted any applications yet.</p>
                            <Button variant="outline" onClick={() => navigate('/candidate/onboarding')}>Start Application</Button>
                        </CardContent>
                    </Card>
                ) : (
                    applications.map((app) => (
                        <Card key={app.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="space-y-1">
                                    <CardTitle>{app.major.name}</CardTitle>
                                    <CardDescription>Submitted on {new Date(app.submissionDate).toLocaleDateString()}</CardDescription>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                                    {app.status}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                                    <div>
                                        <p className="text-slate-500">Department</p>
                                        <p className="font-medium">{app.major.department}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500">Academic Year</p>
                                        <p className="font-medium">2024-2025</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
