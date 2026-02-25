import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | OddsMaster Intelligence',
    description: 'Institutional-grade data protection and privacy framework for Oddsmaster Intelligence members.',
    robots: {
        index: false,
        follow: true,
    },
};

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
