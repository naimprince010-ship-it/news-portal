'use client';

import { useState } from 'react';
import { updateSettings } from '@/app/actions/update-settings';
import { Loader2, Save, User, Lock, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

type SettingsProps = {
    initialSettings: {
        siteName?: string;
        siteDescription?: string;
        supportEmail?: string;
        userName?: string;
        userEmail?: string;
        userBio?: string;
    }
};

export function SettingsView({ initialSettings }: SettingsProps) {
    const [activeTab, setActiveTab] = useState<'general' | 'profile' | 'security'>('general');

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 space-y-2">
                <TabButton
                    active={activeTab === 'general'}
                    onClick={() => setActiveTab('general')}
                    icon={<Globe size={18} />}
                    label="General"
                />
                <TabButton
                    active={activeTab === 'profile'}
                    onClick={() => setActiveTab('profile')}
                    icon={<User size={18} />}
                    label="Profile"
                />
                <TabButton
                    active={activeTab === 'security'}
                    onClick={() => setActiveTab('security')}
                    icon={<Lock size={18} />}
                    label="Security"
                />
            </aside>

            {/* Content Area */}
            <div className="flex-1 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8">
                {activeTab === 'general' && <GeneralSettings initialData={initialSettings} />}
                {activeTab === 'profile' && <ProfileSettings initialData={initialSettings} />}
                {activeTab === 'security' && <SecuritySettings />}
            </div>
        </div>
    );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active
                    ? 'bg-red-50 text-red-600 dark:bg-red-900/10 dark:text-red-400'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900'
                }`}
        >
            {icon}
            {label}
        </button>
    );
}

function GeneralSettings({ initialData }: { initialData: any }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        try {
            await updateSettings(formData);
            router.refresh();
            // Optional: Show toast
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">General Settings</h3>
                <p className="text-sm text-slate-500">Manage your site's public information.</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="siteName" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Site Name</label>
                    <input
                        name="siteName"
                        defaultValue={initialData.siteName || 'News Portal'}
                        className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-red-900"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="siteDescription" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Site Description</label>
                    <textarea
                        name="siteDescription"
                        defaultValue={initialData.siteDescription}
                        rows={3}
                        className="flex w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-red-900 resize-none"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="supportEmail" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Support Email</label>
                    <input
                        type="email"
                        name="supportEmail"
                        defaultValue={initialData.supportEmail}
                        className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-red-900"
                    />
                </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <button type="submit" disabled={isLoading} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50">
                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Save Changes
                </button>
            </div>
        </form>
    );
}

function ProfileSettings({ initialData }: { initialData: any }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        try {
            await updateSettings(formData);
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">Profile Settings</h3>
                <p className="text-sm text-slate-500">Update your personal information.</p>
            </div>
            <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="userName" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Display Name</label>
                        <input
                            name="userName"
                            defaultValue={initialData.userName || 'Admin User'}
                            className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-red-900"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="userEmail" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email</label>
                        <input
                            name="userEmail"
                            type="email"
                            defaultValue={initialData.userEmail || 'admin@example.com'}
                            className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-red-900"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label htmlFor="userBio" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Bio</label>
                    <textarea
                        name="userBio"
                        defaultValue={initialData.userBio}
                        rows={3}
                        className="flex w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-red-900 resize-none"
                    />
                </div>
            </div>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <button type="submit" disabled={isLoading} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50">
                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Update Profile
                </button>
            </div>
        </form>
    );
}

function SecuritySettings() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">Security</h3>
                <p className="text-sm text-slate-500">Manage your password and security preferences.</p>
            </div>

            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-900/50 dark:text-yellow-200 text-sm">
                Password management is handled by your authentication provider. Please contact your system administrator to reset your password.
            </div>
            <button disabled className="flex items-center gap-2 bg-slate-200 text-slate-500 px-4 py-2 rounded-lg font-medium cursor-not-allowed">
                <Lock size={18} />
                Change Password
            </button>
        </div>
    );
}
