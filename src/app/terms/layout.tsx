import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | OddsMaster Intelligence',
    description: 'Guidelines and strategic integrity protocols for the OddsMaster Intelligence platform.',
    robots: {
        index: false,
        follow: true,
    },
};

export default function TermsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
