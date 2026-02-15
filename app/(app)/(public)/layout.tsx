import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { auth } from "@/auth";

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <div className="flex flex-col min-h-screen">
            <Header user={session?.user} />
            <main className="flex-grow container mx-auto px-4 py-6">
                {children}
            </main>
            <Footer />
        </div>
    );
}
