# e-Scolarité - SaaS Design System

## 1. Design Philosophy
"Frictionless, Airy, and Data-Centric" The interface should feel like a modern productivity tool (think Linear, Vercel, or Stripe).

- **Minimalism**: content over chrome. Borders are subtle; shadows are soft.
- **Visual Hierarchy**: Use spacing (whitespace) rather than heavy lines to separate content.
- **Focus**: The user's data (applications, status) is the hero.

## 2. Color Palette (SaaS Theme)

### Primary (Tech Trust)
We use a vibrant Indigo-Blue to signal a modern digital platform.
- **Primary**: `hsl(226 100% 60%)` (Indigo 600) - Vibrant, high-energy.
- **Primary Hover**: `hsl(226 100% 55%)`.
- **Primary Foreground**: `white`.

### Functional Status (Pastel/Soft)
Use "Pill" styles: Soft background with strong text.
- **Success**: Bg `emerald-50`, Text `emerald-700` (Registered).
- **Warning**: Bg `amber-50`, Text `amber-700` (Pending Action).
- **Error**: Bg `rose-50`, Text `rose-700` (Rejected).
- **Neutral**: Bg `slate-100`, Text `slate-600` (Draft).

### Neutrals (The "Clean" Look)
- **Background**: `hsl(0 0% 100%)` (Pure White) or very faint `hsl(210 40% 98%)`.
- **Surface**: White with subtle border.
- **Text Main**: `slate-900` (Soft Black).
- **Text Muted**: `slate-500`.
- **Border**: `slate-200` (Very light gray).

## 3. Typography
- **Font Family**: Inter or Plus Jakarta Sans (Geometric, clean).
- **Headings**: Low contrast weights (`font-medium` or `font-semibold`), dark slate color.
- **Body**: High legibility, strict line-heights (`leading-relaxed`).
- **Numbers**: Use `tabular-nums` for all data tables.

## 4. UI Components & Patterns

### 1. The "SaaS" Layout (Sidebar)
- **Sidebar**: Fixed left, width 240px.
- **Color**: Very light gray (`bg-slate-50`) OR Dark Indigo (`bg-slate-900`) for contrast.
- **Active Item**: Subtle background tint (`bg-indigo-50` `text-indigo-600`).
- **Header**: Minimalist, white, sticky top, bottom border 1px.

### 2. Cards & Containers
- **Style**: Flat style with 1px border.
- `bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow`
- **Spacing**: generous padding (`p-6`).

### 3. Buttons (Modern)
- **Primary**: `rounded-lg`, `bg-indigo-600` `text-white`. No heavy gradients.
- **Secondary**: White background, `border border-slate-200`, `text-slate-700`, hover `bg-slate-50`.
- **Ghost**: Transparent background, `text-slate-600`, hover `bg-slate-100` (Used for "Cancel" or icons).

### 4. Forms (Clean Inputs)
- **Input Field**:
  - `h-10 rounded-md border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10`
  - Note: The focus ring should be a subtle glow, not a hard line.
- **Labels**: Small, `text-slate-500`, uppercase `tracking-wide` OR standard sentence case `text-sm font-medium`.

### 5. Micro-Interactions
- **Buttons**: Scale down slightly on click (`active:scale-95`).
- **Tables**: Row highlight on hover (`hover:bg-slate-50`).
- **Modals**: Backdrop blur (`backdrop-blur-sm bg-white/30`).
