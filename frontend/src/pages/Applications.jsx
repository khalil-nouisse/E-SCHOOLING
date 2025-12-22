import React, { useEffect } from 'react';
import { AdminService } from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, Filter, MoreHorizontal, Download, FileText } from 'lucide-react';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/Dialog';

const Applications = () => {
    // Mock data based on design system logic - Replaced with API
    const [applications, setApplications] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState("ALL"); // ALL, success, warning, error

    useEffect(() => {
        fetchInscriptions();
    }, []);

    const fetchInscriptions = async () => {
        try {
            const data = await AdminService.getAllInscriptions();
            // Transform data to match UI expectations if necessary
            const transformedData = data.map(app => ({
                id: app.id,
                userId: `USR-${app.userId}`,
                name: app.user ? `${app.user.first_name} ${app.user.last_name}` : 'Unknown',
                email: app.user ? app.user.email : 'N/A',
                program: app.major ? app.major.name : 'Unknown',
                status: app.status === 'VALIDATED' ? 'success' : app.status === 'REJECTED' ? 'error' : 'warning',
                date: new Date(app.submissionDate).toLocaleDateString(),
                gpa: "N/A",
                birthDate: "N/A",
                bacYear: app.baccalaureateYear,
                bacType: app.baccalaureateType,
                documents: [],
                notes: app.rejectionComment || "No notes available."
            }));
            setApplications(transformedData);
        } catch (error) {
            console.error("Failed to fetch applications", error);
        }
    };

    const filteredApplications = applications.filter(app => {
        const matchesSearch =
            app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.id.toString().includes(searchQuery);

        const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const [selectedApplication, setSelectedApplication] = React.useState(null);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const handleRowClick = (app) => {
        setSelectedApplication(app);
        setIsDialogOpen(true);
    };

    // State for rejection dialog
    const [isRejectDialogOpen, setIsRejectDialogOpen] = React.useState(false);
    const [rejectionNote, setRejectionNote] = React.useState("");
    const [isRejectionOptional, setIsRejectionOptional] = React.useState(true); // Can toggle if needed, user said optional

    const openRejectDialog = () => {
        setIsRejectDialogOpen(true);
        setRejectionNote("");
    };

    const confirmRejection = () => {
        handleStatusUpdate('error', rejectionNote);
        setIsRejectDialogOpen(false);
    };

    const handleStatusUpdate = async (status, note = null) => {
        if (!selectedApplication) return;

        try {
            // Map UI status to Backend ENUM
            const backendStatus = status === 'success' ? 'VALIDATED' : status === 'error' ? 'REJECTED' : 'PENDING';

            let comment = null;
            if (status === 'error') {
                comment = note || "Rejected by Admin"; // Fallback or empty if allowed
            }

            await AdminService.updateInscriptionStatus(selectedApplication.id, {
                status: backendStatus,
                rejectionComment: comment
            });

            fetchInscriptions();
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Failed to update application status");
        }
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
                <div className="flex items-center gap-4 p-4 border-b border-slate-100 flex-wrap sm:flex-nowrap">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Filter by name, email, or ID..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 pointer-events-none" />
                            <select
                                className="h-10 w-[180px] rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="ALL">All Status</option>
                                <option value="success">Admitted</option>
                                <option value="warning">Pending</option>
                                <option value="error">Rejected</option>
                            </select>
                        </div>
                    </div>
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
                            {filteredApplications.length > 0 ? (
                                filteredApplications.map((app) => (
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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">
                                        No applications found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between p-4 border-t border-slate-100">
                    <span className="text-sm text-slate-500">
                        Showing {filteredApplications.length > 0 ? 1 : 0}-{filteredApplications.length} of {applications.length} applications
                    </span>
                    <div className="flex items-center gap-2">
                        <Button variant="secondary" size="sm" disabled>Previous</Button>
                        <Button variant="secondary" size="sm">Next</Button>
                    </div>
                </div>
            </Card>

            {/* Application Detail Dialog */}
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
                            onClick={openRejectDialog}
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

            {/* Rejection Note Dialog - Nested or Separate */}
            <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
                <DialogHeader>
                    <DialogTitle>Reject Application</DialogTitle>
                    <DialogDescription>Are you sure you want to reject this application? You can optionally provide a reason.</DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">Rejection Note (Optional)</label>
                    <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="e.g. Missing required documents, insufficient GPA..."
                        value={rejectionNote}
                        onChange={(e) => setRejectionNote(e.target.value)}
                    />
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>Cancel</Button>
                    <Button
                        variant="destructive"
                        onClick={confirmRejection}
                        className="bg-rose-600 hover:bg-rose-700"
                    >
                        Confirm Rejection
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default Applications;
