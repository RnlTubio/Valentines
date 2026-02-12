'use client';

import { useState } from 'react';
import InputForm from '@/components/InputForm';
import LoveCard from '@/components/LoveCard';
import { UserData, LoveLetter } from '@/types';
import { generateLoveLetter } from '@/utils/loveLetterGenerator';
import { encodeData } from '@/utils/share';

export default function Home() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [currentLetter, setCurrentLetter] = useState<LoveLetter | null>(null);

    const handleFormSubmit = (data: UserData) => {
        setUserData(data);
        const letter = generateLoveLetter(data);
        setCurrentLetter(letter);
    };

    const handleShare = () => {
        if (!userData || !currentLetter) return;

        try {
            // Only encode userData - letter will be regenerated on recipient's side
            const encoded = encodeData(userData);
            const url = `${window.location.origin}/letter?data=${encoded}`;

            navigator.clipboard.writeText(url).then(() => {
                alert('Link copied to clipboard! Send it to your special someone 💌');
            }).catch((err) => {
                console.error('Could not copy text: ', err);
                prompt('Copy this link:', url);
            });
        } catch (error) {
            console.error('Error sharing letter:', error);
            alert('Failed to generate share link. Please try again.');
        }
    };

    const handleClose = () => {
        // Clear current letter to return to form, but keep user data for editing
        setCurrentLetter(null);
    };

    return (
        <main style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1rem'
        }}>
            {!currentLetter ? (
                <InputForm onSubmit={handleFormSubmit} initialData={userData} />
            ) : (
                <LoveCard
                    letter={currentLetter}
                    onShare={handleShare}
                    onClose={handleClose}
                    mode="preview"
                />
            )}
        </main>
    );
}
