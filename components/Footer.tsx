'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    const isLetterPage = pathname?.startsWith('/letter');

    if (isLetterPage) return null;

    return (
        <footer style={{
            padding: '1rem',
            textAlign: 'center',
            background: 'transparent',
            color: 'var(--rose-red)',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.9rem',
            width: '100%',
            flexShrink: 0,
        }}>
            <p style={{
                textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)',
                pointerEvents: 'auto' // Re-enable clicks for text if we add links later
            }}>
                Developed by: <strong>Ronel Tubio</strong> 💖
            </p>
        </footer>
    );
}
