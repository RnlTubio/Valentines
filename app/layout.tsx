import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Valentine's Day Love Letter",
    description: "Create personalized love letters with beautiful animations for your special someone",
    keywords: ["valentine", "love letter", "romantic", "valentine's day", "personalized message"],
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
