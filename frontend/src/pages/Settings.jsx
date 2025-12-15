import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { User, Bell, Shield, Save } from 'lucide-react';
import { cn } from '../lib/utils';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Settings</h1>
                <p className="text-sm text-slate-500">Manage your account settings and preferences.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 space-y-2">
                    <nav className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-1">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={cn(
                                "flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                activeTab === 'profile'
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <User className="h-4 w-4" />
                            Profile
                        </button>
                        <button
                            onClick={() => setActiveTab('account')}
                            className={cn(
                                "flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                activeTab === 'account'
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <Shield className="h-4 w-4" />
                            Account
                        </button>
                        <button
                            onClick={() => setActiveTab('notifications')}
                            className={cn(
                                "flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                activeTab === 'notifications'
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <Bell className="h-4 w-4" />
                            Notifications
                        </button>
                    </nav>
                </aside>

                {/* Content Area */}
                <div className="flex-1">
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Information</CardTitle>
                                    <CardDescription>Update your public profile details.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center text-3xl font-semibold text-slate-600">
                                            JD
                                        </div>
                                        <div>
                                            <Button variant="outline" size="sm">Change Avatar</Button>
                                            <p className="text-xs text-slate-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="fullName">Full Name</Label>
                                        <Input id="fullName" placeholder="John Doe" defaultValue="John Doe" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <textarea
                                            id="bio"
                                            className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/10 focus-visible:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Tell us a little about yourself"
                                            defaultValue="Administrator for E-Schooling platform."
                                        />
                                    </div>
                                </CardContent>
                                <div className="border-t border-slate-100 p-4 bg-slate-50/50 rounded-b-xl flex justify-end">
                                    <Button>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'account' && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Account Settings</CardTitle>
                                    <CardDescription>Manage your account credentials and preferences.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" defaultValue="admin@eschooling.com" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="currentPassword">Current Password</Label>
                                        <Input id="currentPassword" type="password" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <Input id="newPassword" type="password" />
                                    </div>
                                </CardContent>
                                <div className="border-t border-slate-100 p-4 bg-slate-50/50 rounded-b-xl flex justify-end">
                                    <Button>
                                        <Save className="mr-2 h-4 w-4" />
                                        Update Account
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Notifications</CardTitle>
                                    <CardDescription>Choose what you want to be notified about.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between space-x-2">
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-sm font-medium leading-none">New Applications</span>
                                            <span className="text-sm text-muted-foreground text-slate-500">
                                                Receive emails when new students apply.
                                            </span>
                                        </div>
                                        <input type="checkbox" className="toggle-checkbox" defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between space-x-2">
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-sm font-medium leading-none">System Updates</span>
                                            <span className="text-sm text-muted-foreground text-slate-500">
                                                Receive emails about platform maintenance.
                                            </span>
                                        </div>
                                        <input type="checkbox" className="toggle-checkbox" defaultChecked />
                                    </div>
                                </CardContent>
                                <div className="border-t border-slate-100 p-4 bg-slate-50/50 rounded-b-xl flex justify-end">
                                    <Button>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Preferences
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
