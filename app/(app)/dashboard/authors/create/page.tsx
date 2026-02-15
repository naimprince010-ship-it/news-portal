import { CreateAuthorForm } from '@/components/dashboard/CreateAuthorForm';

export default function CreateAuthorPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Add New Author</h2>
                <p className="text-slate-500">
                    Add a new member to your content team.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
                <CreateAuthorForm />
            </div>
        </div>
    );
}
