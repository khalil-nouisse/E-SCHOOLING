import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

const Header = () => {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-6">
            <div className="flex flex-1 items-center gap-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search..."
                        className="pl-9 bg-slate-50 border-transparent focus:bg-white transition-colors"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-slate-500">
                    <Bell className="h-5 w-5" />
                </Button>
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium text-sm">
                    JD
                </div>
            </div>
        </header>
    );
};

export default Header;
