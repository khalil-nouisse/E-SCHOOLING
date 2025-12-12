import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, Filter, MoreHorizontal, Download } from 'lucide-react';

const Applications = () => {
    // Mock data based on design system logic
    const applications = Array.from({ length: 8 }).map((_, i) => ({
        id: i + 1,
        name: ['Alice Wong', 'James Carter', 'Elena Rodriguez', 'Marcus Johnson', 'Sarah Chen', 'David Kim', 'Emma Wilson', 'Ryan Lee'][i],
        email: `student${i + 1}@example.com`,
        program: ['Computer Science', 'Business Admin', 'Engineering', 'Architecture', 'Data Science', 'Psychology', 'Law', 'Medicine'][i],
        status: ['success', 'warning', 'error', 'neutral', 'success', 'warning', 'success', 'neutral'][i],
        date: '2023-10-12',
    }));

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Applications</h1>
                    <p className="text-sm text-slate-500">Manage specific student applications and admissions.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                    <Button>
                        + New Application
                    </Button>
                </div>
            </div>

            <Card>
                <div className="flex items-center gap-4 p-4 border-b border-slate-100">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Filter applications..."
                            className="pl-9"
                        />
                    </div>
                    <Button variant="secondary" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                    </Button>
                </div>
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b [&_tr]:border-slate-100">
                            <tr className="border-b transition-colors hover:bg-slate-50/50 data-[state=selected]:bg-slate-50">
                                <th className="h-12 px-4 align-middle font-medium text-slate-500">ID</th>
                                <th className="h-12 px-4 align-middle font-medium text-slate-500">Student</th>
                                <th className="h-12 px-4 align-middle font-medium text-slate-500">Program</th>
                                <th className="h-12 px-4 align-middle font-medium text-slate-500">Date</th>
                                <th className="h-12 px-4 align-middle font-medium text-slate-500">Status</th>
                                <th className="h-12 px-4 align-middle font-medium text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {applications.map((app) => (
                                <tr key={app.id} className="border-b transition-colors hover:bg-slate-50 data-[state=selected]:bg-slate-50">
                                    <td className="p-4 align-middle font-medium text-slate-600">#{app.id.toString().padStart(4, '0')}</td>
                                    <td className="p-4 align-middle">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-900">{app.name}</span>
                                            <span className="text-xs text-slate-500">{app.email}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle text-slate-600">{app.program}</td>
                                    <td className="p-4 align-middle text-slate-600 tabular-nums">{app.date}</td>
                                    <td className="p-4 align-middle">
                                        <Badge variant={app.status}>
                                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                        </Badge>
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between p-4 border-t border-slate-100">
                    <span className="text-sm text-slate-500">Showing 1-8 of 100 applications</span>
                    <div className="flex items-center gap-2">
                        <Button variant="secondary" size="sm" disabled>Previous</Button>
                        <Button variant="secondary" size="sm">Next</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Applications;
