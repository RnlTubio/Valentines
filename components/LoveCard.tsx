'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { LoveLetter } from '@/types';
import FlowerAnimation from './FlowerAnimation';
import html2canvas from 'html2canvas';
import Link from 'next/link';

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

            // Create download link
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `love-letter-${Date.now()}.png`;
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
                padding: '2rem'
            }}>
                {!isOpen ? (
                    <motion.div
                        className="envelope-card"
                        onClick={handleOpen}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            width: '400px',
                            height: '300px',
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
                                fontSize: '5rem',
                                marginBottom: '1rem'
                            }}
                        >
                            💌
                        </motion.div>
                        <h2 className="script-font" style={{
                            color: 'white',
                            fontSize: '2rem',
                            textAlign: 'center',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
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
                            width: '100%',
                            background: 'linear-gradient(to bottom, #ffffff, #fff5f5)',
                            border: '3px solid var(--rose-gold)',
                            position: 'relative'
                        }}
                    >
                        <div ref={letterRef} style={{ padding: '1rem' }}>
                            <div style={{
                                textAlign: 'center',
                                marginBottom: '2rem'
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                                    🌹💕🌹
                                </div>
                                <h2 className="script-font" style={{
                                    fontSize: '2.5rem',
                                    color: 'var(--rose-red)',
                                    marginBottom: '1.5rem'
                                }}>
                                    {letter.greeting}
                                </h2>
                            </div>

                            <div style={{
                                fontSize: '1.15rem',
                                lineHeight: '1.8',
                                color: '#333',
                                marginBottom: '2rem',
                                fontFamily: "'Playfair Display', serif",
                                textAlign: 'justify'
                            }}>
                                {letter.body}
                            </div>

                            <div className="script-font" style={{
                                fontSize: '1.8rem',
                                color: 'var(--rose-red)',
                                textAlign: 'right',
                                marginTop: '2rem'
                            }}>
                                {letter.closing}
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '1rem',
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
