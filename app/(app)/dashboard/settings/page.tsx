import { SettingsView } from '@/components/dashboard/SettingsView';
import { getSettings } from '@/app/actions/update-settings';

export default async function SettingsPage() {
    const settings = await getSettings();

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Settings</h2>
                <p className="text-slate-500">
                    Manage your site configuration and preferences.
                </p>
            </div>

            <SettingsView initialSettings={settings} />
        </div>
    );
}
