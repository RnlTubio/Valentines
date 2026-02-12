import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = "Valentine's Day Love Letter";
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
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
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
                {/* Decorative hearts */}
                <div style={{ position: 'absolute', top: 50, left: 100, fontSize: 60, opacity: 0.3 }}>
                    💕
                </div>
                <div style={{ position: 'absolute', top: 100, right: 150, fontSize: 80, opacity: 0.3 }}>
                    ❤️
                </div>
                <div style={{ position: 'absolute', bottom: 80, left: 150, fontSize: 70, opacity: 0.3 }}>
                    💖
                </div>
                <div style={{ position: 'absolute', bottom: 120, right: 100, fontSize: 60, opacity: 0.3 }}>
                    💝
                </div>

                {/* Main content */}
                <div
                    style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: 40,
                        padding: '60px 80px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                        border: '4px solid rgba(255, 255, 255, 0.5)',
                    }}
                >
                    <div style={{ fontSize: 120, marginBottom: 20 }}>
                        💌
                    </div>
                    <div
                        style={{
                            fontSize: 64,
                            fontWeight: 'bold',
                            color: '#C41E3A',
                            marginBottom: 20,
                            textAlign: 'center',
                        }}
                    >
                        Love Letter
                    </div>
                    <div
                        style={{
                            fontSize: 32,
                            color: '#666',
                            textAlign: 'center',
                            maxWidth: 700,
                        }}
                    >
                        Create & share beautiful personalized love letters
                    </div>
                </div>

                {/* Bottom decoration */}
                <div style={{ position: 'absolute', bottom: 30, fontSize: 40 }}>
                    🌹 💕 🌹
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
