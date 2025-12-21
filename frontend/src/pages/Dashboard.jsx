import React, { useState, useEffect } from 'react';
import { AdminService } from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/Dialog';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Users, FileText, CheckCircle, Clock, ArrowRight, Trash2, Edit2 } from 'lucide-react';

const Dashboard = () => {
    // Modal State
    const [isManageUsersOpen, setIsManageUsersOpen] = useState(false);
    const [manageUsersView, setManageUsersView] = useState('list'); // 'list', 'add', 'edit'
    const [editingUser, setEditingUser] = useState(null);
    const [newUserData, setNewUserData] = useState({ name: '', email: '', role: 'Student' });

    // Mock Data for Users - Replaced with API call
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState([
        { label: 'Total Applications', value: '0', change: '0%', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Pending Review', value: '0', change: '0%', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Accepted', value: '0', change: '0%', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Total Students', value: '0', change: '0%', icon: Users, color: 'text-slate-600', bg: 'bg-slate-50' },
    ]);
    const [recentApplications, setRecentApplications] = useState([]);

    useEffect(() => {
        fetchDashboardData();
        fetchUsers();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const statsData = await AdminService.getDashboardStats();
            const recentApps = await AdminService.getRecentApplications();

            setStats([
                { label: 'Total Applications', value: statsData.totalApplications.toString(), change: '+0%', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { label: 'Pending Review', value: statsData.pendingApplications.toString(), change: '+0%', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: 'Accepted', value: statsData.acceptedApplications.toString(), change: '+0%', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Total Students', value: statsData.totalStudents.toString(), change: '+0%', icon: Users, color: 'text-slate-600', bg: 'bg-slate-50' },
            ]);

            setRecentApplications(recentApps);
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await AdminService.getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    const handleDeleteUser = async (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                await AdminService.deleteUser(id);
                fetchUsers();
            } catch (error) {
                console.error("Failed to delete user", error);
                alert("Failed to delete user");
            }
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setNewUserData({ name: user.first_name + ' ' + user.last_name, email: user.email, role: user.role });
        setManageUsersView('edit');
    };

    const handleAddUser = () => {
        setNewUserData({ name: '', email: '', role: 'Student' });
        setManageUsersView('add');
    };

    const handleSaveUser = async (e) => {
        e.preventDefault();
        try {
            // Split name into first and last name for simple implementation
            const [firstName, ...lastNameParts] = newUserData.name.split(' ');
            const lastName = lastNameParts.join(' ') || ' ';
            const userData = {
                first_name: firstName,
                last_name: lastName,
                email: newUserData.email,
                role: newUserData.role,
                password: 'DefaultPassword123!' // Should be handled better in production
            };

            if (manageUsersView === 'add') {
                await AdminService.createUser(userData);
            } else if (manageUsersView === 'edit') {
                await AdminService.updateUser(editingUser.id, userData);
            }
            fetchUsers();
            setManageUsersView('list');
        } catch (error) {
            console.error("Failed to save user", error);
            alert("Failed to save user");
        }
    };

    // Reset view when closing dialog
    const handleOpenChange = (open) => {
        setIsManageUsersOpen(open);
        if (!open) setTimeout(() => setManageUsersView('list'), 300);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Dashboard</h1>
                    <p className="text-sm text-slate-500">Overview of your university management status.</p>
                </div>
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
                        <Button
                            onClick={() => setIsManageUsersOpen(true)}
                            variant="secondary"
                            className="w-full justify-between bg-indigo-500/10 border-indigo-500/20 border border-white text-white hover:bg-indigo-500/20"
                        >
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

            {/* Manage Users Dialog */}
            <Dialog open={isManageUsersOpen} onOpenChange={handleOpenChange}>
                <DialogHeader>
                    <DialogTitle>{manageUsersView === 'list' ? 'Manage Users' : manageUsersView === 'add' ? 'Add New User' : 'Edit User'}</DialogTitle>
                    <DialogDescription>
                        {manageUsersView === 'list'
                            ? 'View, edit, or remove users from the system.'
                            : 'Enter user details below.'}
                    </DialogDescription>
                </DialogHeader>

                {manageUsersView === 'list' && (
                    <>
                        <div className="my-6 max-h-[60vh] overflow-y-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-500 sticky top-0">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Name</th>
                                        <th className="px-4 py-3 font-medium">Role</th>
                                        <th className="px-4 py-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-50/50">
                                            <td className="px-4 py-3">
                                                <div className="font-medium text-slate-900">{user.first_name} {user.last_name}</div>
                                                <div className="text-xs text-slate-500">{user.email}</div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge variant="neutral" className="font-normal">{user.role}</Badge>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-slate-500 hover:text-indigo-600"
                                                        onClick={() => handleEditUser(user)}
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                                                        onClick={() => handleDeleteUser(user.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <DialogFooter>
                            <Button variant="secondary" onClick={() => setIsManageUsersOpen(false)}>
                                Close
                            </Button>
                            <Button onClick={handleAddUser}>
                                Add New User
                            </Button>
                        </DialogFooter>
                    </>
                )}

                {(manageUsersView === 'add' || manageUsersView === 'edit') && (
                    <form onSubmit={handleSaveUser} className="space-y-4 my-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={newUserData.name}
                                onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                                placeholder="e.g. Jane Doe"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={newUserData.email}
                                onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                                placeholder="jane@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="role">Role</Label>
                            <select
                                id="role"
                                className="flex h-10 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/10 focus-visible:border-indigo-500"
                                value={newUserData.role}
                                onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                            >
                                <option value="Student">Student</option>
                                <option value="Faculty">Faculty</option>
                                <option value="Admin">Admin</option>
                                <option value="Registrar">Registrar</option>
                            </select>
                        </div>
                        <DialogFooter className="mt-6">
                            <Button type="button" variant="secondary" onClick={() => setManageUsersView('list')}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                {manageUsersView === 'add' ? 'Create User' : 'Save Changes'}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </Dialog>
        </div>
    );
};

export default Dashboard;
