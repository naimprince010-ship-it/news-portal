import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardSearch } from "@/components/dashboard/DashboardSearch";
import { auth } from "@/auth";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const user = session?.user;

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900/50">
            <Sidebar />
            <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shadow-sm z-10">
                    <div className="flex items-center gap-8">
                        <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Dashboard</h1>
                        <DashboardSearch />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{user?.name || "Admin User"}</span>
                            <span className="text-xs text-slate-500">{user?.email || "admin@prothomalo.com"}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
                            {user?.name?.[0] || "A"}
                        </div>
                    </div>
                </header>

                {/* Main Content Scrollable Area */}
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
