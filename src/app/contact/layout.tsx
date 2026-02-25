import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | OddsMaster Intelligence',
    description: 'Connect with our institutional desk for support, inquiries, or strategic partnerships.',
    openGraph: {
        title: 'Contact OddsMaster Intelligence',
        description: 'Connect with our institutional desk for support, inquiries, or strategic partnerships.',
        url: 'https://oddsmaster.vip/contact',
        images: [
            {
                url: 'https://oddsmaster.vip/FINALBG.png',
                width: 1200,
                height: 630,
                alt: 'Contact OddsMaster',
            },
        ],
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
