import { CreatePostForm } from '@/components/dashboard/CreatePostForm';

export default function CreatePostPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Create New Post</h2>
                <p className="text-slate-500">
                    Write high-quality content for your audience. Use the editor below to craft your story.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
                <CreatePostForm />
            </div>
        </div>
    );
}
