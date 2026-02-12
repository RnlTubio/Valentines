'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FlowerAnimation() {
    const [flowers, setFlowers] = useState<number[]>([]);

    useEffect(() => {
        // Generate flowers
        const flowerArray = Array.from({ length: 30 }, (_, i) => i);
        setFlowers(flowerArray);
    }, []);

    const flowerEmojis = ['🌹', '🌺', '🌸', '💐', '🌷', '💖', '💕', '💗', '💝', '❤️'];

    return (
        <div className="flower-animation-container" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 100,
            overflow: 'hidden'
        }}>
            <AnimatePresence>
                {flowers.map((flower) => {
                    const randomFlower = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
                    const randomDelay = Math.random() * 2;
                    const randomDuration = 3 + Math.random() * 2;
                    const randomX = Math.random() * 100;
                    const randomRotation = Math.random() * 360;

                    return (
                        <motion.div
                            key={flower}
                            initial={{
                                x: `${randomX}vw`,
                                y: '-10vh',
                                opacity: 0,
                                rotate: 0,
                                scale: 0.5
                            }}
                            animate={{
                                y: '110vh',
                                opacity: [0, 1, 1, 0],
                                rotate: randomRotation,
                                scale: [0.5, 1, 1, 0.5]
                            }}
                            transition={{
                                duration: randomDuration,
                                delay: randomDelay,
                                repeat: Infinity,
                                ease: 'linear'
                            }}
                            style={{
                                position: 'absolute',
                                fontSize: '2rem',
                                left: 0,
                                top: 0
                            }}
                        >
                            {randomFlower}
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
