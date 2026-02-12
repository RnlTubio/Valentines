'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import LoveCard from '@/components/LoveCard';
import { decodeData } from '@/utils/share';
import { generateLoveLetter } from '@/utils/loveLetterGenerator';
import { LoveLetter, UserData } from '@/types';

// Component to handle the search params logic
function LetterContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [letter, setLetter] = useState<LoveLetter | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const encodedData = searchParams.get('data');
        if (encodedData) {
            const userData = decodeData(encodedData);
            if (userData) {
                // Regenerate the letter from user data
                const generatedLetter = generateLoveLetter(userData);
                setLetter(generatedLetter);
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
                flex: 1,
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

    if (!letter) return null;

    return (
        <main style={{
            flex: 1,
            background: 'linear-gradient(135deg, #fff5f5 0%, #ffe3e3 100%)',
            padding: 'clamp(0.5rem, 3vw, 2rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <LoveCard
                letter={letter}
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
                flex: 1,
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
