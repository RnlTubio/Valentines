import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = "You received a love letter!";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(135deg, #fff5f5 0%, #ffe3e3 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'system-ui, sans-serif',
                    position: 'relative',
                }}
            >
                {/* Floating hearts decoration */}
                <div style={{ position: 'absolute', top: 60, left: 120, fontSize: 50, opacity: 0.4 }}>
                    💕
                </div>
                <div style={{ position: 'absolute', top: 120, right: 180, fontSize: 60, opacity: 0.4 }}>
                    ❤️
                </div>
                <div style={{ position: 'absolute', bottom: 100, left: 180, fontSize: 55, opacity: 0.4 }}>
                    💖
                </div>
                <div style={{ position: 'absolute', bottom: 150, right: 120, fontSize: 50, opacity: 0.4 }}>
                    💝
                </div>
                <div style={{ position: 'absolute', top: 200, left: 80, fontSize: 45, opacity: 0.3 }}>
                    🌹
                </div>
                <div style={{ position: 'absolute', top: 180, right: 90, fontSize: 45, opacity: 0.3 }}>
                    🌹
                </div>

                {/* Envelope card */}
                <div
                    style={{
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        borderRadius: 40,
                        padding: '70px 90px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: '0 25px 70px rgba(196, 30, 58, 0.4)',
                        border: '5px solid rgba(255, 255, 255, 0.6)',
                    }}
                >
                    <div style={{ fontSize: 140, marginBottom: 30 }}>
                        💌
                    </div>
                    <div
                        style={{
                            fontSize: 56,
                            fontWeight: 'bold',
                            color: 'white',
                            marginBottom: 15,
                            textAlign: 'center',
                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        You received a love letter!
                    </div>
                    <div
                        style={{
                            fontSize: 32,
                            color: 'rgba(255, 255, 255, 0.95)',
                            textAlign: 'center',
                            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.15)',
                        }}
                    >
                        Someone special created this just for you ✨
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
