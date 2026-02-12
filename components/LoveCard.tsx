'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { LoveLetter } from '@/types';
import FlowerAnimation from './FlowerAnimation';
import html2canvas from 'html2canvas';
import Link from 'next/link';
import { generateSafeFilename } from '@/utils/sanitization';

interface LoveCardProps {
    letter: LoveLetter;
    mode?: 'preview' | 'recipient';
    onShare?: () => void;
    onClose?: () => void;
}

export default function LoveCard({ letter, mode = 'preview', onShare, onClose }: LoveCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [showFlowers, setShowFlowers] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const letterRef = useRef<HTMLDivElement>(null);

    const handleOpen = () => {
        setIsOpen(true);
        setTimeout(() => setShowFlowers(true), 800);
    };

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            setShowFlowers(false);
            if (onClose) onClose();
        }, 500);
    };

    const handleDownload = async () => {
        if (!letterRef.current || isDownloading) return;

        try {
            setIsDownloading(true);

            // Capture the letter card as an image
            const canvas = await html2canvas(letterRef.current, {
                backgroundColor: '#fff5f5',
                scale: 2, // Higher quality
                logging: false,
                useCORS: true,
            } as any);

            // Convert canvas to data URL
            const dataUrl = canvas.toDataURL('image/png');

            // Generate safe filename
            const safeFilename = generateSafeFilename(
                letter.greeting.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 20) || 'recipient',
                letter.closing.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 20) || 'sender'
            );

            // Create download link
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = safeFilename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading letter:', error);
            alert('Failed to download the letter. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <>
            {showFlowers && <FlowerAnimation />}

            <div className="card-container fade-in" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh',
                padding: 'clamp(1rem, 3vw, 2rem)'
            }}>
                {!isOpen ? (
                    <motion.div
                        className="envelope-card"
                        onClick={handleOpen}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            width: 'min(400px, 90vw)',
                            height: 'min(300px, 60vh)',
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            borderRadius: 'var(--radius-xl)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: 'var(--shadow-strong)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                            style={{
                                fontSize: 'clamp(3rem, 10vw, 5rem)',
                                marginBottom: '1rem'
                            }}
                        >
                            💌
                        </motion.div>
                        <h2 className="script-font" style={{
                            color: 'white',
                            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                            textAlign: 'center',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                            padding: '0 1rem'
                        }}>
                            {mode === 'recipient' ? "Someone sent you a letter!" : "Open Your Love Letter"}
                        </h2>
                        <p style={{
                            color: 'rgba(255,255,255,0.9)',
                            marginTop: '0.5rem',
                            fontSize: '1rem'
                        }}>
                            Click to reveal ✨
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="card"
                        style={{
                            maxWidth: '600px',
                            width: 'min(600px, 95vw)',
                            background: 'linear-gradient(to bottom, #ffffff, #fff5f5)',
                            border: '3px solid var(--rose-gold)',
                            position: 'relative',
                            margin: '0 auto',
                            padding: 'clamp(1rem, 4vw, 2rem)'
                        }}
                    >
                        <div ref={letterRef} style={{ padding: 'clamp(0.5rem, 2vw, 1rem)' }}>
                            <div style={{
                                textAlign: 'center',
                                marginBottom: 'clamp(1rem, 3vw, 2rem)'
                            }}>
                                <div style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)', marginBottom: 'clamp(0.5rem, 2vw, 1rem)' }}>
                                    🌹💕🌹
                                </div>
                                <h2 className="script-font" style={{
                                    fontSize: 'clamp(1.25rem, 4.5vw, 2.5rem)',
                                    color: 'var(--rose-red)',
                                    marginBottom: 'clamp(0.75rem, 2vw, 1.5rem)',
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word',
                                    hyphens: 'auto',
                                    padding: '0 0.5rem'
                                }}>
                                    {letter.greeting}
                                </h2>
                            </div>

                            <div style={{
                                fontSize: 'clamp(0.9rem, 2.5vw, 1.15rem)',
                                lineHeight: '1.7',
                                color: '#333',
                                marginBottom: 'clamp(1rem, 3vw, 2rem)',
                                fontFamily: "'Playfair Display', serif",
                                textAlign: 'left',
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                hyphens: 'auto',
                                padding: '0 0.25rem'
                            }}>
                                {letter.body}
                            </div>

                            <div className="script-font" style={{
                                fontSize: 'clamp(1.1rem, 3.5vw, 1.8rem)',
                                color: 'var(--rose-red)',
                                textAlign: 'right',
                                marginTop: 'clamp(1rem, 3vw, 2rem)',
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                hyphens: 'auto',
                                padding: '0 0.5rem'
                            }}>
                                {letter.closing}
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: 'clamp(0.5rem, 2vw, 1rem)',
                            marginTop: '1rem',
                            justifyContent: 'center',
                            borderTop: '1px solid #eee',
                            paddingTop: '2rem',
                            flexWrap: 'wrap'
                        }}>
                            <button
                                onClick={handleDownload}
                                disabled={isDownloading}
                                className="btn btn-primary"
                                style={{ opacity: isDownloading ? 0.7 : 1 }}
                            >
                                {isDownloading ? 'Downloading... ⏳' : 'Download 💾'}
                            </button>

                            {mode === 'preview' && onShare && (
                                <button
                                    onClick={onShare}
                                    className="btn"
                                    style={{
                                        background: 'var(--lavender)',
                                        color: 'var(--rose-red)',
                                        border: 'none',
                                        boxShadow: 'var(--shadow-soft)'
                                    }}
                                >
                                    Share Link 🔗
                                </button>
                            )}

                            {mode === 'recipient' && (
                                <Link href="/" className="btn" style={{
                                    background: 'white',
                                    color: 'var(--rose-red)',
                                    border: '2px solid var(--rose-red)',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    Create Your Own 💝
                                </Link>
                            )}

                            <button
                                onClick={handleClose}
                                className="btn"
                                style={{
                                    background: 'white',
                                    color: 'var(--rose-red)',
                                    border: '2px solid var(--rose-red)'
                                }}
                            >
                                {mode === 'preview' ? 'Edit Message ✏️' : 'Close'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </div >
        </>
    );
}
