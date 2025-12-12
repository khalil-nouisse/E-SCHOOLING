import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Users, FileText, CheckCircle, Clock, ArrowRight } from 'lucide-react';

const Dashboard = () => {
    const stats = [
        { label: 'Total Applications', value: '1,234', change: '+12%', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Pending Review', value: '45', change: '-2%', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Accepted', value: '892', change: '+24%', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Total Students', value: '3,456', change: '+8%', icon: Users, color: 'text-slate-600', bg: 'bg-slate-50' },
    ];

    const recentApplications = [
        { id: 1, name: 'Alice Smith', program: 'Computer Science', status: 'success', date: '2 mins ago' },
        { id: 2, name: 'Bob Johnson', program: 'Engineering', status: 'warning', date: '1 hour ago' },
        { id: 3, name: 'Charlie Brown', program: 'Mathematics', status: 'error', date: '3 hours ago' },
        { id: 4, name: 'Diana Prince', program: 'Physics', status: 'neutral', date: '5 hours ago' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Dashboard</h1>
                    <p className="text-sm text-slate-500">Overview of your university management status.</p>
                </div>
                <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    New Application
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.label}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between space-y-0 pb-2">
                                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="h-4 w-4" />
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <h2 className="text-2xl font-bold text-slate-900">{stat.value}</h2>
                                <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {stat.change}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Recent Applications</CardTitle>
                        <CardDescription>Latest student applications needing review.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentApplications.map((app) => (
                                <div key={app.id} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-600">
                                            {app.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{app.name}</p>
                                            <p className="text-xs text-slate-500">{app.program}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge variant={app.status}>
                                            {app.status === 'success' ? 'Admitted' :
                                                app.status === 'warning' ? 'Pending' :
                                                    app.status === 'error' ? 'Rejected' : 'Draft'}
                                        </Badge>
                                        <span className="text-xs text-slate-400">{app.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-indigo-600 text-white h-full border-none">
                    <CardHeader>
                        <CardTitle className="text-white">Quick Actions</CardTitle>
                        <CardDescription className="text-indigo-100">Manage your administrative tasks efficiently.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="secondary" className="w-full justify-between">
                            Generate Reports
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" className="w-full justify-between bg-indigo-500/10 border-indigo-500/20 text-white hover:bg-indigo-500/20">
                            Manage Users
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                        <div className="mt-8 rounded-lg bg-indigo-500/20 p-4">
                            <p className="text-sm font-medium text-indigo-100 mb-1">System Status</p>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                                <span className="text-xs text-white">All systems operational</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
