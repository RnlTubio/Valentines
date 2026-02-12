'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import LoveCard from '@/components/LoveCard';
import { decodeData } from '@/utils/share';
import { LoveLetter, UserData } from '@/types';

// Component to handle the search params logic
function LetterContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [data, setData] = useState<{ userData: UserData; letter: LoveLetter } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const encodedData = searchParams.get('data');
        if (encodedData) {
            const decoded = decodeData(encodedData);
            if (decoded) {
                setData(decoded);
            } else {
                // Invalid data, redirect to home
                router.push('/');
            }
        } else {
            // No data, redirect to home
            router.push('/');
        }
        setLoading(false);
    }, [searchParams, router]);

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #fff5f5 0%, #ffe3e3 100%)',
                fontSize: '2rem'
            }}>
                💌 Loading your letter...
            </div>
        );
    }

    if (!data) return null;

    return (
        <main style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #fff5f5 0%, #ffe3e3 100%)',
            padding: '2rem',
        }}>
            <LoveCard
                letter={data.letter}
                mode="recipient"
            />
        </main>
    );
}

// Main page component with Suspense boundary
export default function LetterPage() {
    return (
        <Suspense fallback={
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #fff5f5 0%, #ffe3e3 100%)',
                fontSize: '2rem'
            }}>
                💌 Loading...
            </div>
        }>
            <LetterContent />
        </Suspense>
    );
}
