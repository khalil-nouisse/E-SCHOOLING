import React from 'react';
import { cn } from '../../lib/utils';

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
    const variants = {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Custom Status variants from Design System
        success: "border-transparent bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
        warning: "border-transparent bg-amber-50 text-amber-700 hover:bg-amber-100",
        error: "border-transparent bg-rose-50 text-rose-700 hover:bg-rose-100",
        neutral: "border-transparent bg-slate-100 text-slate-600 hover:bg-slate-200",
    };

    return (
        <div
            ref={ref}
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                variants[variant],
                className
            )}
            {...props}
        />
    );
});

Badge.displayName = "Badge";

export { Badge };
