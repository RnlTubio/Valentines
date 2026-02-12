import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Valentine's Day Love Letter",
    description: "Create personalized love letters with beautiful animations for your special someone",
    keywords: ["valentine", "love letter", "romantic", "valentine's day", "personalized message"],
    openGraph: {
        title: "Valentine's Day Love Letter 💌",
        description: "Create and share beautiful personalized love letters with romantic animations",
        type: "website",
        locale: "en_US",
        siteName: "Valentine's Love Letter",
    },
    twitter: {
        card: "summary_large_image",
        title: "Valentine's Day Love Letter 💌",
        description: "Create and share beautiful personalized love letters with romantic animations",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
