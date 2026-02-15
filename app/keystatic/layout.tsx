import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Keystatic Admin',
    description: 'Prothom Alo Clone Admin',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <head />
            <body>{children}</body>
        </html>
    );
}
