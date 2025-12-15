import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, Filter, MoreHorizontal, Download, FileText } from 'lucide-react';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/Dialog';

const Applications = () => {
    // Mock data based on design system logic
    const [applications, setApplications] = React.useState(Array.from({ length: 8 }).map((_, i) => ({
        id: i + 1,
        userId: `STU-${2024000 + i + 1}`,
        name: ['Alice Wong', 'James Carter', 'Elena Rodriguez', 'Marcus Johnson', 'Sarah Chen', 'David Kim', 'Emma Wilson', 'Ryan Lee'][i],
        email: `student${i + 1}@example.com`,
        program: ['Computer Science', 'Business Admin', 'Engineering', 'Architecture', 'Data Science', 'Psychology', 'Law', 'Medicine'][i],
        status: ['success', 'warning', 'error', 'neutral', 'success', 'warning', 'success', 'neutral'][i],
        date: '2023-10-12',
        gpa: (3.0 + Math.random() * 1.0).toFixed(2),
        birthDate: ['1998-05-15', '1999-11-20', '2000-02-10', '1999-07-04', '2000-09-30'][i % 5],
        bacYear: [2022, 2021, 2023][i % 3],
        bacType: ['Scientific', 'Economics', 'Literature'][i % 3],
        documents: [
            { name: 'Baccalaureat_Certificate.pdf', size: '2.4 MB' },
            { name: 'National_ID.jpg', size: '1.1 MB' },
            { name: 'High_School_Transcript.pdf', size: '3.5 MB' }
        ],
        notes: "Student shows strong potential in mathematics and logic."
    })));

    const [selectedApplication, setSelectedApplication] = React.useState(null);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const handleRowClick = (app) => {
        setSelectedApplication(app);
        setIsDialogOpen(true);
    };

    const handleStatusUpdate = (status) => {
        if (!selectedApplication) return;

        setApplications(apps => apps.map(app =>
            app.id === selectedApplication.id
                ? { ...app, status: status }
                : app
        ));
        setIsDialogOpen(false);
    };

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
                                <tr
                                    key={app.id}
                                    onClick={() => handleRowClick(app)}
                                    className="border-b transition-colors hover:bg-slate-50 data-[state=selected]:bg-slate-50 cursor-pointer"
                                >
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
                                            {app.status === 'success' ? 'Admitted' :
                                                app.status === 'warning' ? 'Pending' :
                                                    app.status === 'error' ? 'Rejected' : 'Under Review'}
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

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogHeader>
                    <DialogTitle>Application Details</DialogTitle>
                    <DialogDescription>Review student application information.</DialogDescription>
                </DialogHeader>

                {selectedApplication && (
                    <div className="space-y-6 my-4">
                        {/* Header Info */}
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-xl font-semibold text-slate-600">
                                {selectedApplication.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-slate-900">{selectedApplication.name}</h3>
                                <p className="text-sm text-slate-500">{selectedApplication.email}</p>
                                <p className="text-xs text-slate-400 font-mono mt-1">ID: {selectedApplication.userId}</p>
                            </div>
                            <div className="ml-auto">
                                <Badge variant={selectedApplication.status} className="text-sm px-3 py-1">
                                    {selectedApplication.status === 'success' ? 'Admitted' :
                                        selectedApplication.status === 'warning' ? 'Pending' :
                                            selectedApplication.status === 'error' ? 'Rejected' : 'Review'}
                                </Badge>
                            </div>
                        </div>

                        {/* Personal & Academic Details */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Birth Date</p>
                                <p className="font-medium text-slate-900">{selectedApplication.birthDate}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Bac Year</p>
                                <p className="font-medium text-slate-900">{selectedApplication.bacYear}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Bac Type</p>
                                <p className="font-medium text-slate-900">{selectedApplication.bacType}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Program</p>
                                <p className="font-medium text-slate-900">{selectedApplication.program}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">GPA</p>
                                <p className="font-medium text-slate-900">{selectedApplication.gpa}</p>
                            </div>
                        </div>

                        {/* Documents Section */}
                        <div>
                            <p className="text-sm font-medium text-slate-700 mb-2">Attached Documents</p>
                            <div className="grid gap-2">
                                {selectedApplication.documents.map((doc, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                <FileText className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-700">{doc.name}</p>
                                                <p className="text-xs text-slate-500">{doc.size}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <p className="text-sm font-medium text-slate-700 mb-2">Application Notes</p>
                            <div className="p-4 rounded-lg border border-slate-200 text-sm text-slate-600 bg-white">
                                {selectedApplication.notes}
                            </div>
                        </div>
                    </div>
                )}

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" className="flex-1 sm:flex-none" onClick={() => setIsDialogOpen(false)}>Close</Button>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Button
                            variant="destructive"
                            className="flex-1 sm:flex-none bg-rose-600 hover:bg-rose-700 text-white"
                            onClick={() => handleStatusUpdate('error')}
                        >
                            Reject Application
                        </Button>
                        <Button
                            className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white"
                            onClick={() => handleStatusUpdate('success')}
                        >
                            Accept Application
                        </Button>
                    </div>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default Applications;
