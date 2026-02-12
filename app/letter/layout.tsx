import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "💌 Someone sent you a love letter!",
    description: "Open this special love letter created just for you with beautiful romantic animations",
    openGraph: {
        title: "💌 You received a love letter!",
        description: "Someone special created a personalized love letter just for you. Click to open and read your romantic message!",
        type: "website",
        locale: "en_US",
        siteName: "Valentine's Love Letter",
    },
    twitter: {
        card: "summary_large_image",
        title: "💌 You received a love letter!",
        description: "Someone special created a personalized love letter just for you. Click to open!",
    },
};

export default function LetterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
